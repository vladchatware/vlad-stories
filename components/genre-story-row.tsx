import { Button, HStack, Image, RoundedRectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  background,
  buttonStyle,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  padding,
  shadow,
  shapes,
} from '@expo/ui/swift-ui/modifiers';
import { GenreStory } from '@/constants/genre-details';

interface GenreStoryRowProps {
  item: GenreStory;
  accentColor: string;
  cardColor: string;
  titleColor: string;
  subtitleColor: string;
  bodyColor: string;
  iconColor: string;
  metricColor: string;
  progressTrackColor: string;
  onPress?: () => void;
}

export function GenreStoryRow({
  item,
  accentColor,
  cardColor,
  titleColor,
  subtitleColor,
  bodyColor,
  iconColor,
  metricColor,
  progressTrackColor,
  onPress,
}: GenreStoryRowProps) {
  const progressWidth = item.progressPercent ? Math.max(10, Math.min(176, item.progressPercent * 3.5)) : 0;

  return (
    <Button
      onPress={onPress}
      modifiers={[
        buttonStyle('plain'),
        frame({ maxWidth: Infinity, alignment: 'leading' }),
      ]}>
      <ZStack
        alignment="leading"
        modifiers={[
          frame({ maxWidth: Infinity, alignment: 'leading' }),
        ]}>
        <RoundedRectangle
          cornerRadius={24}
          modifiers={[
            frame({ maxWidth: Infinity }),
            foregroundStyle(cardColor),
            shadow({ radius: 18, y: 10, color: 'rgba(5, 9, 20, 0.24)' }),
          ]}
        />

        <VStack
          spacing={12}
          alignment="leading"
          modifiers={[
            frame({ maxWidth: Infinity, alignment: 'leading' }),
            padding({ top: 14, bottom: 14, leading: 14, trailing: 16 }),
          ]}>
          <HStack spacing={14} alignment="top">
            <ZStack alignment="center">
              <RoundedRectangle
                cornerRadius={16}
                modifiers={[
                  frame({ width: 68, height: 92 }),
                  foregroundStyle({
                    type: 'linearGradient',
                    colors: item.cover.colors,
                    startPoint: { x: 0, y: 0 },
                    endPoint: { x: 1, y: 1 },
                  }),
                ]}
              />
              <VStack spacing={8} alignment="center">
                <Image systemName={item.cover.symbol as never} size={18} color="#FFF6EE" />
                <Text
                  modifiers={[
                    font({ size: 22, weight: 'bold', design: 'rounded' }),
                    foregroundStyle('#FFF8F2'),
                    fixedSize({ horizontal: true, vertical: true }),
                  ]}>
                  {item.cover.monogram}
                </Text>
              </VStack>
            </ZStack>

            <VStack
              spacing={8}
              alignment="leading"
              modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
              <HStack spacing={10} alignment="top">
                <VStack
                  spacing={4}
                  alignment="leading"
                  modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
                  <Text
                    modifiers={[
                      font({ size: 22, weight: 'bold', design: 'rounded' }),
                      foregroundStyle(titleColor),
                      lineLimit(2),
                      fixedSize({ horizontal: false, vertical: true }),
                    ]}>
                    {item.title}
                  </Text>
                  <Text
                    modifiers={[
                      font({ size: 14, weight: 'semibold', design: 'rounded' }),
                      foregroundStyle(subtitleColor),
                      lineLimit(1),
                      fixedSize({ horizontal: false, vertical: true }),
                    ]}>
                    {item.subtitle}
                  </Text>
                </VStack>

                <Image systemName="chevron.right" size={14} color={iconColor} />
              </HStack>

              <Text
                modifiers={[
                  font({ size: 13, weight: 'medium', design: 'rounded' }),
                  foregroundStyle(bodyColor),
                  lineLimit(3),
                  fixedSize({ horizontal: false, vertical: true }),
                ]}>
                {item.description}
              </Text>
            </VStack>
          </HStack>

          <VStack spacing={10} alignment="leading" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
            <HStack spacing={14} alignment="center">
              <HStack spacing={5} alignment="center">
                <Image systemName="eye.fill" size={12} color={metricColor} />
                <Text
                  modifiers={[
                    font({ size: 13, weight: 'semibold', design: 'rounded' }),
                    foregroundStyle(metricColor),
                  ]}>
                  {item.views}
                </Text>
              </HStack>

              <HStack spacing={5} alignment="center">
                <Image systemName="heart.fill" size={12} color={accentColor} />
                <Text
                  modifiers={[
                    font({ size: 13, weight: 'semibold', design: 'rounded' }),
                    foregroundStyle(accentColor),
                  ]}>
                  {item.likes}
                </Text>
              </HStack>

              <Spacer />
            </HStack>

            {item.progressPercent !== undefined ? (
              <HStack spacing={10} alignment="center">
                <ZStack
                  alignment="leading"
                  modifiers={[frame({ maxWidth: Infinity, height: 4, alignment: 'leading' })]}>
                  <RoundedRectangle
                    cornerRadius={999}
                    modifiers={[
                      frame({ maxWidth: Infinity, height: 4 }),
                      foregroundStyle(progressTrackColor),
                    ]}
                  />
                  <RoundedRectangle
                    cornerRadius={999}
                    modifiers={[
                      frame({ width: progressWidth, height: 4 }),
                      foregroundStyle(accentColor),
                    ]}
                  />
                </ZStack>

                <Text
                  modifiers={[
                    font({ size: 12, weight: 'bold', design: 'rounded' }),
                    foregroundStyle('#2A2E41'),
                    padding({ horizontal: 10, vertical: 4 }),
                    background('#F8F6F3', shapes.capsule()),
                    fixedSize({ horizontal: true, vertical: true }),
                  ]}>
                  {`${item.progressPercent}%`}
                </Text>
              </HStack>
            ) : null}
          </VStack>
        </VStack>
      </ZStack>
    </Button>
  );
}
