import { Button, HStack, Image, RoundedRectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  buttonStyle,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  padding,
  shadow,
} from '@expo/ui/swift-ui/modifiers';

interface ProfileUpgradeCardProps {
  title: string;
  subtitle: string;
}

export function ProfileUpgradeCard({
  title,
  subtitle,
}: ProfileUpgradeCardProps) {
  return (
    <Button
      modifiers={[
        buttonStyle('plain'),
        frame({ maxWidth: Infinity, height: 96, alignment: 'leading' }),
      ]}>
      <ZStack
        alignment="leading"
        modifiers={[
          frame({ maxWidth: Infinity, height: 96, alignment: 'leading' }),
        ]}>
        <RoundedRectangle
          cornerRadius={24}
          modifiers={[
            frame({ maxWidth: Infinity, height: 96 }),
            foregroundStyle({
              type: 'linearGradient',
              colors: ['#6E4BFF', '#8B53FF'],
              startPoint: { x: 0, y: 0.5 },
              endPoint: { x: 1, y: 0.5 },
            }),
            shadow({ radius: 18, y: 12, color: 'rgba(54, 28, 139, 0.32)' }),
          ]}
        />

        <HStack
          spacing={14}
          alignment="center"
          modifiers={[
            frame({ maxWidth: Infinity, height: 96, alignment: 'leading' }),
            padding({ horizontal: 14 }),
          ]}>
          <ZStack alignment="center">
            <RoundedRectangle
              cornerRadius={16}
              modifiers={[
                frame({ width: 52, height: 52 }),
                foregroundStyle('#1E1738'),
              ]}
            />
            <Image systemName="heart.circle.fill" size={28} color="#FF72D2" />
          </ZStack>

          <VStack
            spacing={4}
            alignment="leading"
            modifiers={[
              frame({ maxWidth: Infinity, alignment: 'leading' }),
            ]}>
            <Text
              modifiers={[
                font({ size: 21, weight: 'bold', design: 'rounded' }),
                foregroundStyle('#FFF8FF'),
                lineLimit(1),
                fixedSize({ horizontal: false, vertical: true }),
              ]}>
              {title}
            </Text>
            <Text
              modifiers={[
                font({ size: 15, weight: 'semibold', design: 'rounded' }),
                foregroundStyle('#D9C9FF'),
                lineLimit(1),
                fixedSize({ horizontal: false, vertical: true }),
              ]}>
              {subtitle}
            </Text>
          </VStack>

          <Spacer minLength={8} />

          <Image systemName="chevron.right" size={15} color="#E1D5FF" />
        </HStack>
      </ZStack>
    </Button>
  );
}
