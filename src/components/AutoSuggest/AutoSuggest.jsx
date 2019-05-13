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
  NoMatchesContainer,
  CustomItemContainer,
  SelectItemDividerTitle,
} from './style';
import SelectItem from '../Select/SelectItem/SelectItem';
import Search from '../Search';

/** AutoSuggest component that opens a popup menu on click and displays items that can be selected */
export default class AutoSuggest extends React.Component {
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
    searchValue: '',
    /* We've added the functionality of adding a custom item with an action so
    we're using this value to handle keyboard events on that custom item. We
    use it to determine if the custom item has focus and listen for up, down
    and enter and well as highlighting on hover */
    isCustomItemFocused: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.items &&
      !AutoSuggest.sameItems(props.items, state.items) &&
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
      // focus the AutoSuggest component in order to be able to catch the keyboard events
      this.props.isOpen && this.onButtonClick();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover, true);
    this.selectNode &&
      this.selectNode.removeEventListener('keydown', this.keyDownPressed);
  }

  keyDownPressed = e => {
    const { shortcutsEnabled, hotKeys } = this.props;
    if (!shortcutsEnabled) return;

    if (hotKeys) {
      hotKeys.forEach(item => {
        if (e.which === item.hotKey) {
          item.onKeyPress();
        }
      });
    }

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
    if (
      !this.props.customButton &&
      this.selectNode &&
      this.selectNode.contains(e.target)
    )
      return;

    const { isOpen } = this.state;

    if (isOpen) {
      this.setState(
        {
          isOpen: false,
          hoveredItem: undefined,
        },
        () => this.activeButton && this.activeButton.focus()
      );
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
        isOpen: true,
      },
      () => {
        !isOpen && this.activeButton && this.activeButton.focus();
        this.scrollToItem(
          this.itemsNode,
          document.getElementById(this.getItemId(items[0]))
        );
      }
    );
  };

  onMoveUp = () => {
    const { items, isCustomItemFocused, hoveredItem } = this.state;
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

    if (isCustomItemFocused) {
      this.setState({ isCustomItemFocused: false });
    }
  };

  onMoveDown = () => {
    const { items, hoveredItem } = this.state;
    const { hasCustomAction } = this.props;
    const itemsLength = items.length;

    if (itemsLength === 0 && hasCustomAction) {
      this.setState({ isCustomItemFocused: true });
    }
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
    const { onSelectClick, multiSelect } = this.props;
    const { items, hoveredItem, isCustomItemFocused, searchValue } = this.state;
    const selectedItem = items[hoveredItem];

    if (isCustomItemFocused) {
      this.props.onCustomItemClick(searchValue);
      this.setState({ isCustomItemFocused: false, isOpen: multiSelect });
    }

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
      searchValue,
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
    return item[keyMap && keyMap.id ? keyMap.id : 'id'];
  };

  renderSearchInput = () => {
    const {
      searchPlaceholder,
    } = this.props;
    return (
      <SearchBarWrapper
        id="searchInput"
        innerRef={node => (this.searchInputNode = node)}
      >
        <SearchIcon />
        <Search
          innerRef={activeButton => (this.activeButton = activeButton)}
          onClick={this.onButtonClick}
          onChange={this.onSearchChange}
          placeholder={searchPlaceholder}
          height="small"
          isOpen
        />
      </SearchBarWrapper>
    )
  };

  renderCustomActionItem = (length, onCustomItemClick, customItemLabel) => {
    if (length === 0) {
      return (
        <CustomItemContainer
          isCustomItemFocused={this.state.isCustomItemFocused}
          onClick={() => onCustomItemClick(this.state.searchValue)}
        >
          {`${customItemLabel} ${this.state.searchValue}`}
        </CustomItemContainer>
      );
    }
  };

  renderNoItems = (hideSearch, length) => {
    if (!hideSearch && length === 0) {
      return <NoMatchesContainer>No matches found</NoMatchesContainer>;
    }
  };

  renderSelectPopup = () => {
    const {
      xPosition,
      yPosition,
      horizontalOffset,
      hideSearch,
      keyMap,
      hasIconOnly,
      marginTop,
      multiSelect,
      hasCustomAction,
      onCustomItemClick,
      customItemLabel,
      fullWidth,
      selectPopupVisible,
    } = this.props;
    const { isOpen, hoveredItem, items } = this.state;

    return (
      <SelectStyled
        isOpen={isOpen && selectPopupVisible}
        xPosition={xPosition}
        yPosition={yPosition}
        hasIconOnly={hasIconOnly}
        marginTop={marginTop}
        fullWidth={fullWidth}
        horizontalOffset={horizontalOffset}
      >
        <SelectItems innerRef={itemsNode => (this.itemsNode = itemsNode)}>
          {hasCustomAction
            ? this.renderCustomActionItem(
                items.length,
                onCustomItemClick,
                customItemLabel
              )
            : this.renderNoItems(hideSearch, items.length)}
          {}
          {items.map((item, idx) => [
            item.hasDivider && (
              <SelectItemDivider key={`${this.getItemId(item)}--divider`}>
                {item.dividerTitle && (
                  <SelectItemDividerTitle>
                    {item.dividerTitle}
                  </SelectItemDividerTitle>
                )}
              </SelectItemDivider>
            ),
            <SelectItem
              hovered={hoveredItem === idx}
              key={this.getItemId(item) + idx}
              getItemId={this.getItemId}
              item={item}
              keyMap={keyMap}
              hasSelectedItems={some(items, { selected: true })}
              onClick={event => this.handleSelectOption(item, event)}
              hideSearch={hideSearch}
              multiSelect={multiSelect}
            />,
          ])}
        </SelectItems>
      </SelectStyled>
    );
  };

  render() {
    const { isSplit, tooltip, disabled, fullWidth } = this.props;

    return (
      <Wrapper
        role="button"
        onClick={this.onClick}
        onKeyUp={this.onClick}
        tabIndex={0}
        isSplit={isSplit}
        innerRef={selectNode => (this.selectNode = selectNode)}
        data-tip={disabled ? '' : tooltip}
        fullWidth={fullWidth}
      >
        {this.renderSearchInput()}
        {this.renderSelectPopup()}
      </Wrapper>
    );
  }
}

AutoSuggest.propTypes = {
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

  /** Position of the popup right or left */
  xPosition: PropTypes.oneOf(['right', 'left']),

  /** Position of the popup top or bottom */
  yPosition: PropTypes.oneOf(['top', 'bottom']),

  /** Offset the popup horizontally */
  horizontalOffset: PropTypes.string,

  /** Icon to show in the Button */
  icon: PropTypes.node,

  /** Does the Select have a search bar */
  hideSearch: PropTypes.bool,

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

  /** Indicated whether the select has a custom action */
  hasCustomAction: PropTypes.bool,

  /** The custom action item */
  onCustomItemClick: PropTypes.func,

  /** A custom label for a custom item */
  customItemLabel: PropTypes.string,

  /** An array of objects containing HotKeys */
  hotKeys: PropTypes.arrayOf(
    PropTypes.shape({
      hotKey: PropTypes.num,
      onKeyPress: PropTypes.func,
    })
  ),

  /** Is the select full width */
  fullWidth: PropTypes.bool,

  /** Indicates if the select popup should be visible */
  selectPopupVisible: PropTypes.bool,
};

AutoSuggest.defaultProps = {
  label: '',
  isSplit: false,
  selectPopupVisible: true,
  type: 'secondary',
  size: 'medium',
  xPosition: 'left',
  yPosition: 'bottom',
  horizontalOffset: undefined,
  disabled: undefined,
  icon: undefined,
  hideSearch: false,
  customButton: undefined,
  onSelectClick: undefined,
  keyMap: undefined,
  multiSelect: undefined,
  shortcutsEnabled: true,
  searchPlaceholder: 'Search',
  tooltip: undefined,
  isOpen: false,
  onClose: undefined,
  hasIconOnly: false,
  marginTop: undefined,
  hasCustomAction: false,
  onCustomItemClick: undefined,
  customItemLabel: undefined,
  hotKeys: undefined,
  fullWidth: undefined,
};