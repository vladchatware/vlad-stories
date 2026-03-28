import { Button, GlassEffectContainer, HStack, Image, RoundedRectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  buttonStyle,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  glassEffect,
  lineLimit,
  monospacedDigit,
  opacity,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface GenreListItemData {
  id: string;
  title: string;
  storyCount: number;
}

interface GenreListItemProps {
  item: GenreListItemData;
  onPress?: () => void;
}

export function GenreListItem({ item, onPress }: GenreListItemProps) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];
  const storyLabel = item.storyCount === 1 ? 'story' : 'stories';

  return (
    <Button
      onPress={onPress}
      modifiers={[
        buttonStyle('plain'),
        frame({ maxWidth: Infinity, alignment: 'leading' }),
      ]}>
      <GlassEffectContainer spacing={16}>
        <ZStack
          alignment="topLeading"
          modifiers={[
            frame({ maxWidth: Infinity, alignment: 'leading' }),
            glassEffect({
              glass: {
                variant: 'regular',
                tint: colors.glassTint,
              },
              shape: 'roundedRectangle',
              cornerRadius: 26,
            }),
          ]}>
          <RoundedRectangle
            cornerRadius={26}
            modifiers={[
              frame({ maxWidth: Infinity, maxHeight: Infinity }),
              foregroundStyle({
                type: 'linearGradient',
                colors:
                  theme === 'dark'
                    ? ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.01)']
                    : ['rgba(255,255,255,0.54)', 'rgba(255,255,255,0.10)'],
                startPoint: { x: 0.12, y: 0 },
                endPoint: { x: 0.88, y: 1 },
              }),
              opacity(theme === 'dark' ? 0.82 : 1),
            ]}
          />

          <VStack
            spacing={12}
            alignment="leading"
            modifiers={[
              frame({ maxWidth: Infinity, alignment: 'leading' }),
              padding({ horizontal: 18, vertical: 18 }),
            ]}>
            <HStack spacing={12} alignment="center">
              <VStack
                spacing={0}
                alignment="leading"
                modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
                <Text
                  modifiers={[
                    font({ size: 24, weight: 'semibold', design: 'rounded' }),
                    foregroundStyle(colors.text),
                    lineLimit(1),
                    fixedSize({ horizontal: false, vertical: true }),
                  ]}>
                  {item.title}
                </Text>
              </VStack>

              <Image
                systemName="chevron.right"
                size={15}
                color={colors.secondaryText}
                modifiers={[opacity(0.72)]}
              />
            </HStack>

            <HStack spacing={10} alignment="center">
              <GlassEffectContainer spacing={10}>
                <HStack
                  spacing={6}
                  alignment="center"
                  modifiers={[
                    padding({ horizontal: 10, vertical: 7 }),
                    glassEffect({
                      glass: {
                        variant: 'clear',
                        tint: colors.glassTint,
                      },
                      shape: 'capsule',
                    }),
                  ]}>
                  <Image systemName="books.vertical.fill" size={12} color={colors.secondaryText} />
                  <Text
                    modifiers={[
                      font({ size: 12, weight: 'semibold', design: 'rounded' }),
                      foregroundStyle(colors.text),
                      monospacedDigit(),
                      fixedSize({ horizontal: true, vertical: false }),
                    ]}>
                    {item.storyCount}
                  </Text>
                  <Text
                    modifiers={[
                      font({ size: 12, weight: 'medium', design: 'rounded' }),
                      foregroundStyle(colors.secondaryText),
                      lineLimit(1),
                      fixedSize({ horizontal: true, vertical: false }),
                    ]}>
                    {storyLabel}
                  </Text>
                </HStack>
              </GlassEffectContainer>

              <Spacer />
            </HStack>
          </VStack>
        </ZStack>
      </GlassEffectContainer>
    </Button>
  );
}
