import React, { useState, useEffect } from 'react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
const AppContext = React.createContext();
import { ThemeProvider } from 'styled-components';

function Context({ children }) {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <AppContext.Provider value={{ isModalOpened, setIsModalOpened }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export { Context, AppContext };