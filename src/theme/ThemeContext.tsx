import React, { createContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { LightTheme } from './themes';

export const ThemeContext = createContext(LightTheme);


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();
  //todo: Remove eslint exclusion for exhaustive deps when dark theme is implemented
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const theme = useMemo(() => (/*scheme === 'dark' ? DarkTheme :*/ LightTheme), [scheme]);

  return (<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>)
};
