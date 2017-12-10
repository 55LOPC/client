import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i&subset=cyrillic');

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  body.fontLoaded {
  }

  #app {
    background-color: #ffffff;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {

  }
`;
