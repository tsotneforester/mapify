import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

//font-family: ${({ theme }) => theme.fonts.main};
body {
  min-height: 100vh;
  min-height: 100svh;
}

#root {
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: max-content auto 1fr;
  grid-template-rows:auto;
}


`;
