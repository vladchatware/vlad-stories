import { Circle, Image, RoundedRectangle, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import { blur, fixedSize, font, foregroundStyle, frame, opacity, shadow } from '@expo/ui/swift-ui/modifiers';
import { StoryCover } from '@/constants/story-details';

interface StoryCoverArtProps {
  cover: StoryCover;
  width: number;
  height: number;
}

export function StoryCoverArt({ cover, width, height }: StoryCoverArtProps) {
  return (
    <ZStack alignment="center">
      <Circle
        modifiers={[
          frame({ width: width + 34, height: width + 34 }),
          foregroundStyle(cover.colors[1]),
          opacity(0.2),
          blur(18),
        ]}
      />
      <RoundedRectangle
        cornerRadius={28}
        modifiers={[
          frame({ width, height }),
          foregroundStyle({
            type: 'linearGradient',
            colors: cover.colors,
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 1, y: 1 },
          }),
          shadow({ radius: 20, y: 14, color: 'rgba(0, 0, 0, 0.32)' }),
        ]}
      />
      <RoundedRectangle
        cornerRadius={28}
        modifiers={[
          frame({ width: width - 10, height: height - 10 }),
          foregroundStyle({
            type: 'linearGradient',
            colors: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.01)'],
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 1, y: 1 },
          }),
        ]}
      />
      <VStack spacing={10} alignment="center">
        <Image systemName={cover.symbol as never} size={22} color="#FFF7F0" />
        <Text
          modifiers={[
            font({ size: 34, weight: 'bold', design: 'rounded' }),
            foregroundStyle('#FFF8F3'),
            fixedSize({ horizontal: true, vertical: true }),
          ]}>
          {cover.monogram}
        </Text>
      </VStack>
    </ZStack>
  );
}
