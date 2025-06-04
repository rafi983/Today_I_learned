import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: "Sono", sans-serif;
    padding: 48px 64px;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    body {
      padding: 32px 48px;
    }
  }
`;

export default GlobalStyles;
