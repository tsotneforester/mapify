import React, { useState } from 'react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
const AppContext = React.createContext();
import { ThemeProvider } from 'styled-components';

function Context({ children }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  return (
    <AppContext.Provider
      value={{ isModalOpened, setIsModalOpened, justSignedUp, setJustSignedUp }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export { Context, AppContext };
