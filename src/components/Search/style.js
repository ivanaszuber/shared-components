import styled from 'styled-components';

export const SearchWrapper = styled.div`
  height: auto;
  width: 100%;
`;

export const SearchInput = styled.input`
  && {
    border: 0;
    border-radius: 4px;
    box-shadow: none;
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    resize: none;
    font-size: 14px;
    height: 48px;
    &:focus {
      outline: none;
    }
  }
`;
