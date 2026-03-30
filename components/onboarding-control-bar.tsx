import { Button, GlassEffectContainer, HStack, Image, RoundedRectangle, Spacer, Text } from '@expo/ui/swift-ui';
import {
  background,
  buttonStyle,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  glassEffect,
  opacity,
  padding,
  shapes,
} from '@expo/ui/swift-ui/modifiers';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface OnboardingControlBarProps {
  currentIndex: number;
  total: number;
  accentColor: string;
  isLast: boolean;
  onSkip: () => void;
  onNext: () => void;
}

export function OnboardingControlBar({
  currentIndex,
  total,
  accentColor,
  isLast,
  onSkip,
  onNext,
}: OnboardingControlBarProps) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <GlassEffectContainer spacing={14}>
      <HStack
        spacing={12}
        alignment="center"
        modifiers={[
          frame({ maxWidth: Infinity, alignment: 'center' }),
          padding({ horizontal: 12, vertical: 10 }),
          glassEffect({
            glass: {
              variant: 'regular',
              tint: colors.glassTint,
            },
            shape: 'roundedRectangle',
            cornerRadius: 30,
          }),
        ]}>
        <Button
          onPress={onSkip}
          modifiers={[
            buttonStyle('plain'),
            padding({ horizontal: 8, vertical: 4 }),
          ]}>
          <Text
            modifiers={[
              font({ size: 14, weight: 'semibold', design: 'rounded' }),
              foregroundStyle(colors.secondaryText),
              fixedSize({ horizontal: true, vertical: true }),
            ]}>
            Skip
          </Text>
        </Button>

        <Spacer />

        <HStack spacing={8} alignment="center">
          {Array.from({ length: total }).map((_, index) => (
            <RoundedRectangle
              key={`onboarding-indicator-${index}`}
              cornerRadius={999}
              modifiers={[
                frame({ width: index === currentIndex ? 24 : 7, height: 7 }),
                foregroundStyle(index === currentIndex ? accentColor : colors.icon),
                opacity(index === currentIndex ? 1 : 0.42),
              ]}
            />
          ))}
        </HStack>

        <Spacer />

        <Button
          onPress={onNext}
          modifiers={[
            buttonStyle('plain'),
            padding({ horizontal: 16, vertical: 11 }),
            background(accentColor, shapes.capsule()),
          ]}>
          <HStack spacing={8} alignment="center">
            <Text
              modifiers={[
                font({ size: 14, weight: 'bold', design: 'rounded' }),
                foregroundStyle('#FFF8FC'),
                fixedSize({ horizontal: true, vertical: true }),
              ]}>
              {isLast ? 'Enter app' : 'Continue'}
            </Text>
            <Image
              systemName={isLast ? 'sparkles' : 'arrow.right'}
              size={13}
              color="#FFF8FC"
            />
          </HStack>
        </Button>
      </HStack>
    </GlassEffectContainer>
  );
}
