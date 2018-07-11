import { injectGlobal } from 'styled-components';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: #e6ecf0;
    font-family: 'Montserrat', sans-serif;
    color: #FFF;
  }

  button {
    cursor: pointer;
  }

  .container {
    width: 80%;
    margin: 0 auto;
  }
`;
