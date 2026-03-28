import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Button,
  GlassEffectContainer,
  HStack,
  RoundedRectangle,
  Spacer,
  Text,
  VStack,
  ZStack,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  glassEffect,
  layoutPriority,
  lineLimit,
  multilineTextAlignment,
  offset,
  padding,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import { Colors } from '@/constants/theme';
import { getStoryDetail } from '@/constants/story-details';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const HERO_WIDTH = Math.min(width * 0.76, 248);
const HERO_HEIGHT = HERO_WIDTH / 0.92;

export interface DiscoverHeroItem {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
}

interface DiscoverHeroCarouselProps {
  items: DiscoverHeroItem[];
}

export function DiscoverHeroCarousel({ items }: DiscoverHeroCarouselProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((value) => (value + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  const item = items[currentIndex];
  const story = getStoryDetail(item.id);
  const heroFill =
    story
      ? {
          type: 'linearGradient' as const,
          colors: story.cover.colors,
          startPoint: { x: 0, y: 0 },
          endPoint: { x: 1, y: 1 },
        }
      : colors.placeholder;

  return (
    <VStack spacing={14} alignment="leading" modifiers={[padding({ horizontal: 20 })]}>
      <Button
        onPress={() => router.push(`/story/${item.id}`)}
        modifiers={[buttonStyle('plain')]}>
        <VStack spacing={0} alignment="leading">
          <ZStack
            alignment="bottom"
            modifiers={[frame({ width: CARD_WIDTH, alignment: 'leading' }), padding({ bottom: 18 })]}>
            <ZStack
              alignment="center"
              modifiers={[
                frame({ width: HERO_WIDTH, height: HERO_HEIGHT, alignment: 'center' }),
                padding({ bottom: 72 }),
              ]}>
              <RoundedRectangle
                cornerRadius={34}
                modifiers={[
                  frame({ width: HERO_WIDTH, height: HERO_HEIGHT }),
                  foregroundStyle(heroFill),
                ]}
              />
              <RoundedRectangle
                cornerRadius={30}
                modifiers={[
                  frame({ width: HERO_WIDTH - 10, height: HERO_HEIGHT - 10 }),
                  foregroundStyle({
                    type: 'linearGradient',
                    colors: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)'],
                    startPoint: { x: 0, y: 0 },
                    endPoint: { x: 1, y: 1 },
                  }),
                ]}
              />
            </ZStack>

            <GlassEffectContainer spacing={20}>
              <VStack
                spacing={10}
                alignment="leading"
                modifiers={[
                  frame({ maxWidth: Infinity, alignment: 'leading' }),
                  padding({ horizontal: 20, vertical: 18 }),
                  offset({ y: 10 }),
                  glassEffect({
                    glass: {
                      variant: 'regular',
                      tint: colors.glassTint,
                    },
                    shape: 'roundedRectangle',
                    cornerRadius: 28,
                  }),
                ]}>
                <Text
                  modifiers={[
                    font({ size: 15, weight: 'medium' }),
                    foregroundStyle(colors.secondaryText),
                    lineLimit(1),
                  ]}>
                  {item.subtitle}
                </Text>

                <HStack spacing={12} alignment="bottom">
                  <Text
                    modifiers={[
                      font({ size: 26, weight: 'bold', design: 'rounded' }),
                      foregroundStyle(colors.text),
                      lineLimit(2),
                      multilineTextAlignment('leading'),
                      layoutPriority(1),
                      frame({ maxWidth: 9999, alignment: 'leading' }),
                    ]}>
                    {item.title}
                  </Text>

                  <Spacer />

                  <Button
                    onPress={() => router.push(`/chat?itemId=${item.id}`)}
                    label="Read"
                    modifiers={[
                      buttonStyle('glassProminent'),
                      controlSize('regular'),
                      tint(item.accent),
                      fixedSize({ horizontal: true, vertical: true }),
                    ]}>
                  </Button>
                </HStack>
              </VStack>
            </GlassEffectContainer>
          </ZStack>
        </VStack>
      </Button>

      {items.length > 1 ? (
        <HStack spacing={10} alignment="center" modifiers={[frame({ maxWidth: Infinity, alignment: 'center' }), padding({ top: 4 })]}>
          {items.map((heroItem, index) => (
            <Button
              key={heroItem.id}
              onPress={() => setCurrentIndex(index)}
              modifiers={[buttonStyle('plain')]}>
              <RoundedRectangle
                cornerRadius={999}
                modifiers={[
                  frame({ width: currentIndex === index ? 34 : 11, height: 11 }),
                  foregroundStyle(currentIndex === index ? colors.tint : colors.border),
                ]}
              />
            </Button>
          ))}
        </HStack>
      ) : null}
    </VStack>
  );
}
