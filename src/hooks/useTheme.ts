import { useContext, useMemo } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext.tsx';

export const useTheme = () => {
  const { colors, typography, spacing } = useContext(ThemeContext);

  const appStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        } as ViewStyle,
        column: {
          flex: 1,
          flexDirection: 'column',
        } as ViewStyle,
        row: {
          flex: 1,
          flexDirection: 'row',
        } as ViewStyle,
        h1: {
          ...typography.h1,
          color: colors.text,
        } as TextStyle,
        h2: {
          ...typography.h2,
          color: colors.text,
        } as TextStyle,
        title: {
          ...typography.title,
          color: colors.text,
        } as TextStyle,
        body: {
          ...typography.body,
          color: colors.text,
        } as TextStyle,
      }),
    [colors, typography],
  );

  return { colors, appStyles, spacing };
};
