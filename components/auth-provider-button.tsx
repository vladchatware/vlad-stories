import { Button, HStack, Image, Spacer, Text, ZStack } from '@expo/ui/swift-ui';
import { background, border, buttonStyle, font, foregroundStyle, frame, opacity, padding, shapes, shadow } from '@expo/ui/swift-ui/modifiers';

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
          backgroundColor: 'rgba(43, 49, 78, 0.92)',
          textColor: '#ECECF5',
          shadowColor: 'rgba(6, 8, 18, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
        }
      : {
          backgroundColor: '#FFFFFF',
          textColor: '#171C2E',
          shadowColor: 'rgba(74, 53, 106, 0.12)',
          borderColor: 'rgba(88, 70, 122, 0.10)',
        };

  return (
    <Button
      onPress={onPress}
      modifiers={[
        buttonStyle('plain'),
        frame({ maxWidth: Infinity, height: 54, alignment: 'leading' }),
      ]}>
      <HStack
        spacing={12}
        alignment="center"
        modifiers={[
          frame({ maxWidth: Infinity, height: 54, alignment: 'leading' }),
          padding({ horizontal: 20 }),
          background(palette.backgroundColor, shapes.capsule()),
          border({ color: palette.borderColor, width: 1 }),
          shadow({ radius: 12, y: 8, color: palette.shadowColor }),
        ]}>
        <ProviderMark provider={provider} appearance={appearance} />

        <Spacer minLength={0} />

        <Text
          modifiers={[
          font({ size: 15, weight: 'bold', design: 'rounded' }),
          foregroundStyle(palette.textColor),
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
