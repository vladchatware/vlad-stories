import { Button, HStack, Spacer, Text, VStack, ZStack, Circle } from '@expo/ui/swift-ui';
import {
  background,
  buttonStyle,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  padding,
  shapes,
  shadow,
} from '@expo/ui/swift-ui/modifiers';

interface GiftsActionCardProps {
  title: string;
  subtitle: string;
}

export function GiftsActionCard({ title, subtitle }: GiftsActionCardProps) {
  return (
    <Button
      modifiers={[
        buttonStyle('plain'),
      ]}>
      <HStack
        spacing={14}
        alignment="center"
        modifiers={[
          padding({ horizontal: 18, vertical: 18 }),
          background('#17355E', shapes.roundedRectangle({ cornerRadius: 22 })),
          shadow({ radius: 16, y: 10, color: 'rgba(5, 17, 31, 0.22)' }),
        ]}>
        <ZStack alignment="center">
          <Circle
            modifiers={[
              frame({ width: 34, height: 34 }),
              foregroundStyle('#2E4F95'),
            ]}
          />
          <Text
            modifiers={[
              font({ size: 15, weight: 'bold', design: 'rounded' }),
              foregroundStyle('#6D7EFF'),
            ]}>
            ▶
          </Text>
        </ZStack>

        <VStack
          spacing={4}
          alignment="leading"
          modifiers={[
            frame({ maxWidth: Infinity, alignment: 'leading' }),
          ]}>
          <Text
            modifiers={[
              font({ size: 22, weight: 'bold', design: 'rounded' }),
              foregroundStyle('#F5F4FB'),
              lineLimit(1),
              fixedSize({ horizontal: false, vertical: true }),
            ]}>
            {title}
          </Text>
          <Text
            modifiers={[
              font({ size: 14, weight: 'semibold', design: 'rounded' }),
              foregroundStyle('#99A0B9'),
              lineLimit(2),
              fixedSize({ horizontal: false, vertical: true }),
            ]}>
            {subtitle}
          </Text>
        </VStack>

        <Spacer minLength={8} />

        <Text
          modifiers={[
            font({ size: 23, weight: 'bold', design: 'rounded' }),
            foregroundStyle('#D5D8E6'),
          ]}>
          ›
        </Text>
      </HStack>
    </Button>
  );
}
