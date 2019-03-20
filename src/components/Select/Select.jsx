/* eslint-disable no-unused-expressions, react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { includes, some } from 'lodash';
import helper from 'immutability-helper';
import SearchIcon from '../Icon/Icons/Search';
import {
  Wrapper,
  SelectStyled,
  SelectItems,
  SelectItemDivider,
  SearchBarWrapper,
} from './style';
import SelectItem from './SelectItem/SelectItem';
import Button from '../Button/Button';
import { ButtonSelect } from '../Button/style';
import ChevronDown from '../Icon/Icons/ChevronDown';
import Search from '../Search/Search';

/** Select component that opens a popup menu on click and displays items that can be selected */
export default class Select extends React.Component {
  static sameItems = (itemsA, itemsB) =>
    itemsA.length === itemsB.length &&
    itemsA.every(
      (el, ix) =>
        el &&
        itemsB[ix] &&
        el.id === itemsB[ix].id &&
        el.title === itemsB[ix].title
    );

  state = {
    isOpen: this.props.isOpen,
    items: this.props.items || [],
    selectedItems: this.props.items || [],
    isFiltering: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.items &&
      !Select.sameItems(props.items, state.items) &&
      !state.isFiltering
    ) {
      return { items: props.items };
    }
    return null;
  }

  componentDidMount() {
    // When the selector is open and users click anywhere on the page,
    // the selector should close
    // Set capture to true so an open select will close when another select gets opened
    document.addEventListener('click', this.closePopover, true);

    // catch the keypress to move the selected items up or down
    this.selectNode &&
      this.selectNode.addEventListener('keydown', this.keyDownPressed);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      // focus the Select component in order to be able to catch the keyboard events
      this.props.isOpen && this.onButtonClick();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover, true);
    this.selectNode &&
      this.selectNode.removeEventListener('keydown', this.keyDownPressed);
  }

  keyDownPressed = e => {
    const { shortcutsEnabled } = this.props;
    if (!shortcutsEnabled) return;

    switch (e.which) {
      case 40: // Arrow down
        return this.handleKeyPress(e, this.onMoveDown);
      case 38: // Arrow up
        return this.handleKeyPress(e, this.onMoveUp);
      case 13: // Enter
        return this.handleKeyPress(e, this.onAddItem);
      case 27: // Esc
        return this.handleKeyPress(e, this.onClose);
      default:
        return null;
    }
  };

  handleKeyPress = (event, keyHandler) => {
    event.preventDefault();
    event.stopPropagation();
    keyHandler();
  };

  // Close the popover
  closePopover = e => {
    if (this.searchInputNode &&
      this.searchInputNode.contains(e.target)) return;
    const { isOpen } = this.state;

    if (isOpen) {
      this.setState({
        isOpen: false,
        hoveredItem: undefined,
      }, ()=> this.activeButton && this.activeButton.focus());
    }
  };

  updateItemsInState = (items, option, index) =>
    index > -1
      ? helper(items, {
          [index]: {
            selected: { $set: !option.selected },
          },
        })
      : items;

  handleSelectOption = (option, event) => {
    const { onSelectClick, multiSelect } = this.props;
    const { items } = this.state;
    onSelectClick(option, event);

    const selectedIndex = items.findIndex(x => x.selected === true);

    const deselectItems =
      !multiSelect && selectedIndex > -1
        ? helper(items, {
            [selectedIndex]: {
              selected: { $set: false },
            },
          })
        : items;

    const optionIndex = deselectItems.findIndex(
      x => this.getItemId(x) === this.getItemId(option)
    );

    this.setState({
      isOpen: multiSelect,
      items: this.updateItemsInState(deselectItems, option, optionIndex),
      // we need to copy the items to another array here in order to use that one during search
      // filtering
      selectedItems: this.updateItemsInState(
        deselectItems,
        option,
        optionIndex
      ),
    });
  };

  onClick = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  onButtonClick = () => {
    const { isOpen, items } = this.state;
    this.setState(
      {
        isOpen: !isOpen,
      },
      () => {
        !isOpen && this.selectNode.focus();
        this.scrollToItem(
          this.itemsNode,
          document.getElementById(this.getItemId(items[0]))
        );
      }
    );
  };

  onMoveUp = () => {
    const { items } = this.state;
    const { hoveredItem } = this.state;
    const itemsLength = items.length;

    for (
      let i = hoveredItem - 1;
      i < itemsLength && itemsLength > 0 && i >= 0;
      i -= 1
    ) {
      if (items[i]) {
        this.setState({ hoveredItem: i % itemsLength });
        this.scrollToItem(
          this.itemsNode,
          document.getElementById(this.getItemId(items[i]))
        );
        break;
      }
    }
  };

  onMoveDown = () => {
    const { items } = this.state;
    const { hoveredItem } = this.state;
    const itemsLength = items.length;

    if (!hoveredItem) {
      this.setState(
        {
          hoveredItem: 0,
        },
        () => this.updateHoveredItemPosition(hoveredItem, itemsLength, items)
      );
    } else {
      this.updateHoveredItemPosition(hoveredItem, itemsLength, items);
    }
  };

  onAddItem = () => {
    const { onSelectClick } = this.props;
    const { items, hoveredItem } = this.state;
    const selectedItem = items[hoveredItem];
    selectedItem && selectedItem.onItemClick
      ? selectedItem.onItemClick(selectedItem)
      : onSelectClick(items[hoveredItem]);
  };

  updateHoveredItemPosition = (hoveredItem, itemsLength, items) => {
    for (
      let i = hoveredItem + 1;
      i <= itemsLength && itemsLength > 0 && i > 0;
      i += 1
    ) {
      if (i === itemsLength) {
        this.setState({ hoveredItem: 0 });
        this.scrollToItem(
          this.itemsNode,
          document.getElementById(this.getItemId(items[i]))
        );
        break;
      }
      if (items[i]) {
        this.setState({ hoveredItem: i % itemsLength });
        this.scrollToItem(
          this.itemsNode,
          document.getElementById(this.getItemId(items[i]))
        );
        break;
      }
    }
  };

  scrollToItem = (parent, child) => {
    if (!parent || !child) return;

    // Where is the parent on page
    const parentRect = parent.getBoundingClientRect();
    // What can you see?
    const parentViewableArea = {
      height: parent.clientHeight,
      width: parent.clientWidth,
    };

    // Where is the child
    const childRect = child.getBoundingClientRect();
    // Is the child viewable?
    const isViewable =
      childRect.top >= parentRect.top &&
      childRect.top <= parentRect.top + parentViewableArea.height;

    // if you can't see the child try to scroll parent
    if (!isViewable) {
      // scroll by offset relative to parent
      parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
    }
  };

  findItemInState = item => {
    const { selectedItems } = this.state;
    return selectedItems.find(x => this.getItemId(x) === this.getItemId(item));
  };

  onSearchChange = searchValue => {
    const { items, keyMap } = this.props;
    const searchFiled = keyMap ? keyMap.title : 'title';

    // first, filter the items in the props that we get from the parent

    // the items in the props don't have the {selected: true/false} information
    // so we need to find out for each item in filteredProps if its selected or not

    // that's why we made the selectedItems array in the state, to store that information
    // and we need to check there to see, for each item, if its selected


    const filteredItems = items.reduce((filtered, item) => {
      if (
        includes(item[searchFiled].toLowerCase(), searchValue.toLowerCase())
      ) {
        filtered.push({
          ...item,
          selected:
            this.findItemInState(item) && this.findItemInState(item).selected,
        });
      }
      return filtered;
    }, []);

    this.setState({
      items: filteredItems,
      isFiltering: true,
    });
  };

  onClose = () => {
    const { onClose } = this.props;
    this.setState(
      {
        isOpen: false,
        isFiltering: false,
        hoveredItem: 0,
      },
      onClose && onClose()
    );
  };

  getItemId = item => {
    if (!item) return;
    const { keyMap } = this.props;
    return item[keyMap ? keyMap.id : 'id'];
  };

  renderSelectButton = () => {
    const {
      isSplit,
      customButton,
      type,
      size,
      disabled,
      icon,
      label,
      hasIconOnly,
    } = this.props;
    const { items } = this.state;

    if (isSplit) {
      return (
        <ButtonSelect
          type={type}
          disabled={disabled}
          onClick={!disabled ? this.onButtonClick : undefined}
          innerRef={activeButton => this.activeButton = activeButton}
        >
          <ChevronDown
            color={type === 'primary' && !disabled ? 'white' : 'grayDark'}
          />
        </ButtonSelect>
      );
    }
    if (customButton) {
      return customButton(this.onButtonClick);
    }
    if (hasIconOnly) {
      return (
        <Button
          type="text"
          icon={icon}
          hasIconOnly
          onClick={() => this.onButtonClick()}
          innerRef={activeButton => this.activeButton = activeButton}
          label="Click Me"
        />
      );
    }

    return (
      <Button
        size={size}
        items={items}
        disabled={disabled}
        type={type}
        label={label}
        icon={icon}
        innerRef={activeButton => this.activeButton = activeButton}
        onClick={this.onButtonClick}
        isSelect
      />
    );
  };

  renderSelectPopup = () => {
    const {
      position,
      hasSearch,
      keyMap,
      searchPlaceholder,
      hasIconOnly,
      marginTop,
      multiSelect,
    } = this.props;
    const { isOpen, hoveredItem, items } = this.state;

    return (
      <SelectStyled
        isOpen={isOpen}
        position={position}
        hasIconOnly={hasIconOnly}
        marginTop={marginTop}
      >
        {hasSearch && (
          <SearchBarWrapper
            id="searchInput"
            innerRef={node => (this.searchInputNode = node)}
          >
            <SearchIcon />
            <Search
              onChange={this.onSearchChange}
              placeholder={searchPlaceholder}
              isOpen={isOpen}
            />
          </SearchBarWrapper>
        )}
        <SelectItems innerRef={itemsNode => (this.itemsNode = itemsNode)}>
          {items.map((item, idx) => [
            item.hasDivider && (
              <SelectItemDivider key={`${this.getItemId(item)}--divider`} />
            ),
            <SelectItem
              hovered={hoveredItem === idx}
              key={this.getItemId(item)}
              getItemId={this.getItemId}
              item={item}
              keyMap={keyMap}
              hasSelectedItems={some(items, { selected: true })}
              onClick={event => this.handleSelectOption(item, event)}
              hasSearch={hasSearch}
              multiSelect={multiSelect}
            />,
          ])}
        </SelectItems>
      </SelectStyled>
    );
  };

  render() {
    const { isSplit, tooltip, disabled } = this.props;

    return (
      <Wrapper
        role="button"
        onClick={this.onClick}
        onKeyUp={this.onClick}
        tabIndex={0}
        isSplit={isSplit}
        innerRef={selectNode => (this.selectNode = selectNode)}
        data-tip={disabled ? '' : tooltip}
      >
        {this.renderSelectButton()}
        {this.renderSelectPopup()}
      </Wrapper>
    );
  }
}

Select.propTypes = {
  /** Is the button disabled */
  disabled: PropTypes.bool,

  /** Function to call on selected item click */
  onSelectClick: PropTypes.func,

  /** Label to display on the Select button */
  label: PropTypes.string,

  /** Items to display in the popup */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,

  /** Is the Select component part of the Split Button */
  isSplit: PropTypes.bool,

  /** Type of the select component  */
  type: PropTypes.oneOf(['primary', 'secondary']),

  /** Size of the Button */
  size: PropTypes.oneOf(['small', 'large', 'medium']),

  /** Position of the popup */
  position: PropTypes.oneOf(['top', 'bottom']),

  /** Icon to show in the Button */
  icon: PropTypes.node,

  /** Does the Select have a search bar */
  hasSearch: PropTypes.bool,

  /** Custom Button component */
  customButton: PropTypes.func,

  /** Custom keys to used in the Items array */
  keyMap: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),

  /** Can the select have multiple items selected */
  multiSelect: PropTypes.bool,

  /** If false don't enable keyboard navigation */
  shortcutsEnabled: PropTypes.bool,

  /** Search placeholder */
  searchPlaceholder: PropTypes.string,

  /** Tooltip to show on the component */
  tooltip: PropTypes.string,

  /** Should the component be opened */
  isOpen: PropTypes.bool,

  /** Callback to be called when the Select menu gets closed */
  onClose: PropTypes.func,

  /** Does the button have only an icon and no label */
  hasIconOnly: PropTypes.bool,

  /** Space between the dropdown and the button */
  marginTop: PropTypes.string,
};

Select.defaultProps = {
  label: '',
  isSplit: false,
  type: 'secondary',
  size: 'medium',
  position: 'bottom',
  disabled: undefined,
  icon: undefined,
  hasSearch: false,
  customButton: undefined,
  onSelectClick: undefined,
  keyMap: undefined,
  multiSelect: undefined,
  shortcutsEnabled: true,
  searchPlaceholder: 'Search',
  tooltip: undefined,
  isOpen: null,
  onClose: undefined,
  hasIconOnly: false,
  marginTop: undefined,
};
