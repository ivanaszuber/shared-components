import React from 'react';
import PropTypes from 'prop-types';
import { Checkmark } from '../../Icon';
import {
  SelectItemStyled,
  SelectItemLabel,
  SelectItemIcon,
  SelectItemTitle,
  SelectItemCustom,
  CheckIconWrapper,
} from './style';

const SelectItem = ({
  item,
  onClick,
  hovered,
  keyMap,
  hasSelectedItems,
  getItemId,
  hasSearch,
  multiSelect,
}) => (
  <SelectItemStyled
    onClick={item.onItemClick || onClick}
    hovered={hovered}
    id={getItemId(item)}
  >
    <SelectItemLabel
      hasSearch={hasSearch}
      hasSelectedItems={hasSelectedItems}
      hasComponent={item.component}
    >
      {item.selected && (
        <CheckIconWrapper>
          <Checkmark color="grayDarker" />
        </CheckIconWrapper>
      )}
      {item.icon && (
        <SelectItemIcon hovered={hovered}>{item.icon}</SelectItemIcon>
      )}
      {item.component && (
        <CheckIconWrapper>
          <SelectItemCustom
            dangerouslySetInnerHTML={{ __html: item.component(item) }}
          />
        </CheckIconWrapper>
      )}
      <SelectItemTitle
        moveRight={
          (hasSelectedItems && !item.selected) ||
          (multiSelect && !item.selected)
        }
      >
        {item[keyMap ? keyMap.title : 'title']}
      </SelectItemTitle>
    </SelectItemLabel>
  </SelectItemStyled>
);

SelectItem.propTypes = {
  /** Item to render */
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    onItemClick: PropTypes.func,
    selected: PropTypes.bool,
    icon: PropTypes.node,
    component: PropTypes.func,
  }).isRequired,

  /** On click function */
  onClick: PropTypes.func.isRequired,

  /** Get the id of the item */
  getItemId: PropTypes.func.isRequired,

  /** Is the item selected */
  hovered: PropTypes.bool,

  /** Custom keys to used in the Items array */
  keyMap: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),

  /** Does the Select have selected items to adjust the margin */
  hasSelectedItems: PropTypes.bool,

  /** Does the Select have a search bar incorporated */
  hasSearch: PropTypes.bool,

  /** Is it a multi select */
  multiSelect: PropTypes.bool,
};

SelectItem.defaultProps = {
  hovered: undefined,
  keyMap: undefined,
  hasSelectedItems: undefined,
  hasSearch: undefined,
  multiSelect: undefined,
};

export default SelectItem;
