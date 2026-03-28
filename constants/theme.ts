/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#C65486';
const tintColorDark = '#D14B83';

export const Colors = {
  light: {
    text: '#10131D',
    background: '#F6F1EA',
    surface: '#FFF9F1',
    surfaceElevated: '#FFFFFF',
    secondaryText: '#7E768A',
    tint: tintColorLight,
    tintContrast: '#FFF8F3',
    icon: '#8C8498',
    border: '#DED5C7',
    card: '#FFF9F1',
    cardMuted: '#ECE4D8',
    placeholder: '#C8C8CE',
    overlay: 'rgba(255, 250, 244, 0.9)',
    inputBackground: '#EFE7DB',
    tabBar: '#F4EFE6',
    tabIconDefault: '#8C8498',
    tabIconSelected: tintColorLight,
    shadow: 'rgba(12,18,31,0.1)',
  },
  dark: {
    text: '#F7F7FB',
    background: '#0F1320',
    surface: '#121727',
    surfaceElevated: '#171C2E',
    secondaryText: '#AAA2BC',
    tint: tintColorDark,
    tintContrast: '#FFF7FB',
    icon: '#8F97AB',
    border: '#252C42',
    card: '#171C2E',
    cardMuted: '#252B3B',
    placeholder: '#4F5870',
    overlay: 'rgba(22,27,43,0.88)',
    inputBackground: '#1B2233',
    tabBar: '#0E1420',
    tabIconDefault: '#8F97AB',
    tabIconSelected: tintColorDark,
    shadow: 'rgba(0,0,0,0.3)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
