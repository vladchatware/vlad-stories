import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Host, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  fixedSize,
  font,
  foregroundStyle,
  frame,
  multilineTextAlignment,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OnboardingControlBar } from '@/components/onboarding-control-bar';
import { OnboardingSlideHero } from '@/components/onboarding-slide-hero';
import { onboardingSlides } from '@/constants/onboarding-content';
import { introPalette } from '@/constants/intro-content';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const palette = introPalette[theme];
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = onboardingSlides[currentIndex];

  const finishOnboarding = () => {
    router.replace('/(tabs)/discover');
  };

  const handleNext = () => {
    if (currentIndex === onboardingSlides.length - 1) {
      finishOnboarding();
      return;
    }

    setCurrentIndex((value) => value + 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: palette.screen }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Host useViewportSizeMeasurement colorScheme={theme} style={styles.host}>
        <ZStack alignment="center" modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity })]}>
          <VStack
            spacing={22}
            alignment="center"
            modifiers={[
              frame({ maxWidth: Infinity, maxHeight: Infinity }),
              padding({
                top: insets.top + 22,
                bottom: Math.max(insets.bottom, 16) + 12,
                horizontal: 22,
              }),
            ]}>
            <OnboardingSlideHero slide={slide} />

            <VStack spacing={12} alignment="center" modifiers={[frame({ maxWidth: 340, alignment: 'center' })]}>
              <Text
                modifiers={[
                  font({ size: 28, weight: 'bold', design: 'rounded' }),
                  foregroundStyle(palette.title),
                  fixedSize({ horizontal: false, vertical: true }),
                  multilineTextAlignment('center'),
                ]}>
                {slide.title}
              </Text>

              <Text
                modifiers={[
                  font({ size: 15, weight: 'medium', design: 'rounded' }),
                  foregroundStyle(palette.body),
                  fixedSize({ horizontal: false, vertical: true }),
                  multilineTextAlignment('center'),
                ]}>
                {slide.description}
              </Text>
            </VStack>

            <VStack
              spacing={0}
              alignment="center"
              modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'bottom' })]}>
              <OnboardingControlBar
                currentIndex={currentIndex}
                total={onboardingSlides.length}
                accentColor={slide.accentColor}
                isLast={currentIndex === onboardingSlides.length - 1}
                onSkip={finishOnboarding}
                onNext={handleNext}
              />
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
  },
  host: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
