import React from 'react';
import PropTypes from 'prop-types';
import { SearchInput, SearchWrapper } from './style';

/** Search input that filters the Select items and adds keyboard navigation */
export default class Search extends React.Component {
  state = {
    search: '',
  };


  componentDidUpdate(prevProps) {
    if(prevProps.isOpen !== this.props.isOpen){
      setTimeout(()=> this.inputRef.focus(), 50)
    }
  }


  onChange = (event) => {
    const { onChange } = this.props;
    const search = event.target.value;

    onChange(search);
    this.setState({
      search,
    });
  }

  render() {
    const {
      placeholder,
    } = this.props;

    const { search } = this.state;

    return (
      <SearchWrapper>
        <SearchInput
          placeholder={placeholder}
          type="text"
          value={search}
          innerRef={inputRef => this.inputRef = inputRef}
          onChange={event => this.onChange(event)}
        />
      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  /** Search placeholder */
  placeholder: PropTypes.string,

  /** Function to call on search input change */
  onChange: PropTypes.func.isRequired,

  /** Is the select menu open */
  isOpen: PropTypes.bool
};

Search.defaultProps = {
  placeholder: '',
  isOpen: false
}
