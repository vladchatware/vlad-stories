import { Button, GlassEffectContainer, HStack, Image, Spacer, Text, ZStack } from '@expo/ui/swift-ui';
import { buttonStyle, font, foregroundStyle, frame, glassEffect, lineLimit, opacity, padding } from '@expo/ui/swift-ui/modifiers';

interface AuthProviderButtonProps {
  provider: 'google' | 'apple';
  label: string;
  onPress: () => void;
  appearance?: 'light' | 'dark';
}

export function AuthProviderButton({
  provider,
  label,
  onPress,
  appearance = 'dark',
}: AuthProviderButtonProps) {
  const palette =
    appearance === 'dark'
      ? {
          textColor: '#ECECF5',
          glassTint: 'rgba(154, 170, 224, 0.12)',
        }
      : {
          textColor: '#171C2E',
          glassTint: 'rgba(255, 255, 255, 0.2)',
        };

  return (
    <GlassEffectContainer spacing={12}>
      <HStack
        spacing={0}
        alignment="center"
        modifiers={[
          frame({ maxWidth: Infinity, height: 56, alignment: 'center' }),
          glassEffect({
            glass: {
              variant: 'regular',
              tint: palette.glassTint,
            },
            shape: 'capsule',
          }),
        ]}>
        <Button
          onPress={onPress}
          modifiers={[
            buttonStyle('plain'),
            frame({ maxWidth: Infinity, height: 56, alignment: 'leading' }),
            padding({ horizontal: 18 }),
          ]}>
          <HStack spacing={12} alignment="center" modifiers={[frame({ maxWidth: Infinity, height: 56, alignment: 'leading' })]}>
            <ProviderMark provider={provider} appearance={appearance} />

            <Spacer minLength={0} />

            <Text
              modifiers={[
                font({ size: 15, weight: 'semibold', design: 'rounded' }),
                foregroundStyle(palette.textColor),
                lineLimit(1),
                frame({ maxWidth: Infinity, alignment: 'center' }),
              ]}>
              {label}
            </Text>

            <Spacer minLength={0} />

            <Text
              modifiers={[
                font({ size: 1 }),
                opacity(0),
                frame({ width: 18, height: 18, alignment: 'center' }),
              ]}>
              .
            </Text>
          </HStack>
        </Button>
      </HStack>
    </GlassEffectContainer>
  );
}

function ProviderMark({
  provider,
  appearance,
}: {
  provider: 'google' | 'apple';
  appearance: 'light' | 'dark';
}) {
  if (provider === 'apple') {
    return <Image systemName="apple.logo" size={17} color={appearance === 'dark' ? '#FFFFFF' : '#20263A'} />;
  }

  return (
    <ZStack alignment="center" modifiers={[frame({ width: 18, height: 18 })]}>
      <Text
        modifiers={[
          font({ size: 18, weight: 'bold', design: 'rounded' }),
          foregroundStyle('#FFFFFF'),
          opacity(appearance === 'dark' ? 0.18 : 0.08),
        ]}>
        G
      </Text>
      <Text
        modifiers={[
          font({ size: 18, weight: 'bold', design: 'rounded' }),
          foregroundStyle({
            type: 'linearGradient',
            colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 1, y: 1 },
          }),
        ]}>
        G
      </Text>
    </ZStack>
  );
}
