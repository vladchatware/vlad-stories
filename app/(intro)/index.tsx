import { StyleSheet, View } from 'react-native';
import { Host, Circle, RoundedRectangle, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import { blur, font, foregroundStyle, frame, ignoreSafeArea, offset, opacity, padding } from '@expo/ui/swift-ui/modifiers';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthAppLogo } from '@/components/auth-app-logo';
import { AuthProviderButton } from '@/components/auth-provider-button';
import { introCopy, introPalette } from '@/constants/intro-content';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function IntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const palette = introPalette[theme];

  const enterApp = () => {
    router.push('/(intro)/onboarding');
  };

  return (
    <View style={[styles.container, { backgroundColor: palette.screen }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Host
        useViewportSizeMeasurement
        colorScheme={theme}
        style={styles.host}>
        <ZStack alignment="center" modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity })]}>
          <RoundedRectangle
            cornerRadius={0}
            modifiers={[
              frame({ maxWidth: Infinity, maxHeight: Infinity }),
              foregroundStyle({
                type: 'linearGradient',
                colors: palette.backgroundGradient,
                startPoint: { x: 0.2, y: 0 },
                endPoint: { x: 0.65, y: 1 },
              }),
              ignoreSafeArea(),
            ]}
          />

          <Circle
            modifiers={[
              frame({ width: 280, height: 280 }),
              foregroundStyle({
                type: 'radialGradient',
                colors: palette.pinkGlow,
                center: { x: 0.5, y: 0.5 },
                startRadius: 8,
                endRadius: 140,
              }),
              offset({ x: 0, y: -360 }),
              blur(18),
              opacity(0.92),
            ]}
          />

          <Circle
            modifiers={[
              frame({ width: 320, height: 320 }),
              foregroundStyle({
                type: 'radialGradient',
                colors: palette.blueGlow,
                center: { x: 0.5, y: 0.5 },
                startRadius: 8,
                endRadius: 160,
              }),
              offset({ x: -110, y: -250 }),
              blur(28),
            ]}
          />

          <VStack
            spacing={28}
            alignment="center"
            modifiers={[
              frame({ maxWidth: Infinity, maxHeight: Infinity }),
              padding({
                top: insets.top + 76,
                bottom: Math.max(insets.bottom, 12) + 8,
                horizontal: 22,
              }),
            ]}>
            <VStack
              spacing={24}
              alignment="center"
              modifiers={[frame({ maxWidth: Infinity })]}>
              <AuthAppLogo />

              <VStack
                spacing={10}
                alignment="center"
                modifiers={[
                  padding({ top: 24 }),
                ]}>
                <Text
                  modifiers={[
                    font({ size: 18, weight: 'bold', design: 'rounded' }),
                    foregroundStyle(palette.title),
                  ]}>
                  {introCopy.appName}
                </Text>
                <Text
                  modifiers={[
                    font({ size: 13, weight: 'medium', design: 'rounded' }),
                    foregroundStyle(palette.body),
                  ]}>
                  {introCopy.headlineLines[0]}
                </Text>
                <Text
                  modifiers={[
                    font({ size: 13, weight: 'medium', design: 'rounded' }),
                    foregroundStyle(palette.body),
                    offset({ y: -4 }),
                  ]}>
                  {introCopy.headlineLines[1]}
                </Text>
              </VStack>
            </VStack>

            <VStack
              spacing={14}
              alignment="center"
              modifiers={[
                frame({ maxWidth: Infinity }),
                padding({ horizontal: 4 }),
              ]}>
              <AuthProviderButton
                provider="google"
                label={introCopy.providerButtons.google}
                onPress={enterApp}
                appearance={theme}
              />
              <AuthProviderButton
                provider="apple"
                label={introCopy.providerButtons.apple}
                onPress={enterApp}
                appearance={theme}
              />
            </VStack>

            <VStack
              spacing={0}
              alignment="center"
              modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'bottom' })]}>
              <VStack spacing={5} alignment="center">
                <Text
                  modifiers={[
                    font({ size: 11, weight: 'medium', design: 'rounded' }),
                    foregroundStyle(palette.footnote),
                  ]}>
                  {introCopy.legalFootnote}
                </Text>

                <Text
                  modifiers={[
                    font({ size: 11, weight: 'bold', design: 'rounded' }),
                    foregroundStyle(palette.legal),
                  ]}>
                  {introCopy.legalLinkLabel}
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </ZStack>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111521',
  },
  host: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
