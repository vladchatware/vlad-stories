import { Circle, RoundedRectangle, Image, ZStack } from '@expo/ui/swift-ui';
import { blur, foregroundStyle, frame, offset, opacity, shadow } from '@expo/ui/swift-ui/modifiers';

export function AuthAppLogo() {
  return (
    <ZStack alignment="center" modifiers={[frame({ width: 104, height: 104 })]}>
      <RoundedRectangle
        cornerRadius={20}
        modifiers={[
          frame({ width: 72, height: 72 }),
          foregroundStyle('#23202D'),
          shadow({ radius: 24, y: 12, color: 'rgba(0, 0, 0, 0.28)' }),
        ]}
      />

      <RoundedRectangle
        cornerRadius={16}
        modifiers={[
          frame({ width: 50, height: 38 }),
          foregroundStyle('#691B6B'),
          offset({ x: -2, y: 12 }),
          opacity(0.72),
          blur(0.2),
        ]}
      />

      <RoundedRectangle
        cornerRadius={16}
        modifiers={[
          frame({ width: 50, height: 38 }),
          foregroundStyle('#A22CD5'),
          offset({ x: 0, y: 6 }),
          opacity(0.9),
        ]}
      />

      <RoundedRectangle
        cornerRadius={16}
        modifiers={[
          frame({ width: 50, height: 38 }),
          foregroundStyle({
            type: 'linearGradient',
            colors: ['#FF62D3', '#B035FF'],
            startPoint: { x: 0, y: 0.1 },
            endPoint: { x: 1, y: 1 },
          }),
          shadow({ radius: 14, y: 9, color: 'rgba(178, 52, 199, 0.45)' }),
        ]}
      />

      <Circle
        modifiers={[
          frame({ width: 22, height: 22 }),
          foregroundStyle('#FFD7F2'),
        ]}
      />

      <Image systemName="heart.fill" size={14} color="#FFF7FB" />
    </ZStack>
  );
}
