import { Circle, HStack, Image, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  background,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  monospacedDigit,
  padding,
  shapes,
  shadow,
} from '@expo/ui/swift-ui/modifiers';

interface ProfileAvatarHeaderProps {
  displayName: string;
  balance: string;
  nameColor?: string;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileAvatarHeader({
  displayName,
  balance,
  nameColor = '#F4F4FA',
}: ProfileAvatarHeaderProps) {
  return (
    <VStack spacing={24} alignment="leading">
      <HStack spacing={0} alignment="center">
        <Spacer minLength={0} />
        <HStack
          spacing={8}
          alignment="center"
          modifiers={[
            padding({ horizontal: 12, vertical: 9 }),
            background('#1D2335', shapes.capsule()),
          ]}>
          <Image systemName="bitcoinsign.circle.fill" size={16} color="#F6C843" />
          <Text
            modifiers={[
              font({ size: 16, weight: 'bold', design: 'rounded' }),
              foregroundStyle('#F4F4FA'),
              monospacedDigit(),
            ]}>
            {balance}
          </Text>
        </HStack>
      </HStack>

      <VStack spacing={14} alignment="center" modifiers={[frame({ maxWidth: Infinity })]}>
        <ZStack alignment="center">
          <Circle
            modifiers={[
              frame({ width: 84, height: 84 }),
              foregroundStyle({
                type: 'linearGradient',
                colors: ['#AB6058', '#744171', '#2A243F'],
                startPoint: { x: 0, y: 0 },
                endPoint: { x: 1, y: 1 },
              }),
              shadow({ radius: 18, y: 10, color: 'rgba(5, 9, 20, 0.32)' }),
            ]}
          />
          <Circle
            modifiers={[
              frame({ width: 76, height: 76 }),
              foregroundStyle({
                type: 'linearGradient',
                colors: ['#E1A27A', '#8A4D58', '#56315A'],
                startPoint: { x: 0.15, y: 0 },
                endPoint: { x: 1, y: 1 },
              }),
            ]}
          />
          <Text
            modifiers={[
              font({ size: 24, weight: 'bold', design: 'rounded' }),
              foregroundStyle('#FFF8F4'),
              fixedSize({ horizontal: true, vertical: true }),
            ]}>
            {getInitials(displayName)}
          </Text>
        </ZStack>

        <Text
          modifiers={[
            font({ size: 32, weight: 'bold', design: 'rounded' }),
            foregroundStyle(nameColor),
            fixedSize({ horizontal: false, vertical: true }),
          ]}>
          {displayName}
        </Text>
      </VStack>
    </VStack>
  );
}
