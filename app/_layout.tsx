import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(Colors[colorScheme].background);
  }, [colorScheme]);

  const navigationTheme =
    colorScheme === 'dark'
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: Colors.dark.background,
            card: Colors.dark.tabBar,
            primary: Colors.dark.tint,
            text: Colors.dark.text,
            border: Colors.dark.border,
            notification: Colors.dark.tint,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: Colors.light.background,
            card: Colors.light.tabBar,
            primary: Colors.light.tint,
            text: Colors.light.text,
            border: Colors.light.border,
            notification: Colors.light.tint,
          },
        };

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(intro)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="genre/[genreId]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="story/[storyId]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="chat" options={{ presentation: 'modal', title: 'Story Chat' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
