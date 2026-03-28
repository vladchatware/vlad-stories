import { Circle, RoundedRectangle, ZStack } from '@expo/ui/swift-ui';
import { blur, foregroundStyle, frame, opacity, shadow } from '@expo/ui/swift-ui/modifiers';
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
            colors: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)'],
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 1, y: 1 },
          }),
        ]}
      />
    </ZStack>
  );
}
