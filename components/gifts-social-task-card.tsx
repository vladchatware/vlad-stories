import { Button, HStack, Spacer, Text, VStack } from '@expo/ui/swift-ui';
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

export interface GiftsSocialTask {
  id: string;
  reward: string;
  action: string;
}

interface GiftsSocialTaskCardProps {
  item: GiftsSocialTask;
}

export function GiftsSocialTaskCard({ item }: GiftsSocialTaskCardProps) {
  return (
    <Button
      modifiers={[
        buttonStyle('plain'),
        frame({ maxWidth: Infinity, height: 86, alignment: 'leading' }),
        padding({ bottom: 12 }),
      ]}>
      <HStack
        spacing={12}
        alignment="center"
        modifiers={[
          frame({ maxWidth: Infinity, height: 86, alignment: 'leading' }),
          padding({ horizontal: 16 }),
          background('#232941', shapes.roundedRectangle({ cornerRadius: 20 })),
          shadow({ radius: 6, y: 3, color: 'rgba(2, 4, 11, 0.12)' }),
        ]}>
        <VStack
          spacing={4}
          alignment="leading"
          modifiers={[
            frame({ maxWidth: Infinity, alignment: 'leading' }),
          ]}>
          <HStack spacing={4} alignment="center">
            <Text
              modifiers={[
                font({ size: 15, weight: 'bold', design: 'rounded' }),
                foregroundStyle('#FFC93B'),
              ]}>
              {'◕'}
            </Text>
            <Text
              modifiers={[
                font({ size: 19, weight: 'bold', design: 'rounded' }),
                foregroundStyle('#F3C934'),
                lineLimit(1),
                fixedSize({ horizontal: false, vertical: true }),
              ]}>
              {item.reward}
            </Text>
          </HStack>

            <Text
              modifiers={[
                font({ size: 14, weight: 'medium', design: 'rounded' }),
                foregroundStyle('#A2A8BF'),
                lineLimit(2),
                fixedSize({ horizontal: false, vertical: true }),
              ]}>
              {item.action}
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
