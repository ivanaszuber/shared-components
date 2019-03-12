import { createGlobalStyle } from 'styled-components';

/**
 * https://www.styled-components.com/docs/api#createglobalstyle
 */
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
