import { RoundedRectangle, ZStack } from '@expo/ui/swift-ui';
import {
  background,
  frame,
  foregroundStyle,
  opacity,
  shapes,
} from '@expo/ui/swift-ui/modifiers';

import { OnboardingSlide } from '@/constants/onboarding-content';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface OnboardingSlideHeroProps {
  slide: OnboardingSlide;
}

export function OnboardingSlideHero({ slide }: OnboardingSlideHeroProps) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const stageFill = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.66)';
  const stageStroke = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.84)';
  const placeholderFill = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.82)';

  return (
    <ZStack alignment="center" modifiers={[frame({ maxWidth: Infinity })]}>
      <RoundedRectangle
        cornerRadius={34}
        modifiers={[
          frame({ width: 324, height: 332 }),
          background(stageFill, shapes.roundedRectangle({ cornerRadius: 34 })),
        ]}
      />

      <RoundedRectangle
        cornerRadius={34}
        modifiers={[
          frame({ width: 324, height: 332 }),
          foregroundStyle(stageStroke),
          opacity(0.65),
        ]}
      />

      <RoundedRectangle
        cornerRadius={28}
        modifiers={[
          frame({ width: 188, height: 244 }),
          background(placeholderFill, shapes.roundedRectangle({ cornerRadius: 28 })),
        ]}
      />
    </ZStack>
  );
}
