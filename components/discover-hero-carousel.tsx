import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Host, Button, HStack, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { buttonStyle, controlSize, font, foregroundStyle, frame, layoutPriority, lineLimit, multilineTextAlignment, tint } from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width;
const CARD_GAP = 0;
const HERO_WIDTH = Math.min(CARD_WIDTH * 0.76, 248);
const HERO_HEIGHT = HERO_WIDTH / 0.92;
const CARD_MIN_HEIGHT = HERO_HEIGHT + 108;
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
  const scrollViewRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      scrollViewRef.current?.scrollTo({ x: nextIndex * (CARD_WIDTH + CARD_GAP), animated: true });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_GAP));
    setCurrentIndex(index);
  };

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}>
        {items.map((item, index) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + CARD_GAP),
            index * (CARD_WIDTH + CARD_GAP),
            (index + 1) * (CARD_WIDTH + CARD_GAP),
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [10, 0, 10],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.92}
              style={styles.slide}
              onPress={() => router.push(`/story/${item.id}`)}>
              <Animated.View
                style={[
                  styles.card,
                  { transform: [{ translateY }] },
                ]}>
                <View
                  style={[
                    styles.heroImage,
                    {
                      backgroundColor: colors.placeholder,
                      shadowColor: colors.shadow,
                    },
                  ]}
                />

                <Host style={[styles.footerHost, { backgroundColor: colors.background }]}>
                  <VStack spacing={0} alignment="leading">
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
                          font({ size: 28, weight: 'bold', design: 'rounded' }),
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
                          buttonStyle('borderedProminent'),
                          controlSize('large'),
                          tint(item.accent),
                        ]}>
                      </Button>
                    </HStack>
                  </VStack>
                </Host>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>

      {items.length > 1 && (
        <View style={styles.paginationContainer}>
          {items.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: colors.border },
                currentIndex === index && { ...styles.activeDot, backgroundColor: colors.tint },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  slide: {
    width: CARD_WIDTH,
    marginRight: CARD_GAP,
    minHeight: CARD_MIN_HEIGHT,
  },
  card: {
    paddingTop: 4,
    paddingBottom: 0,
    paddingHorizontal: 20,
    minHeight: CARD_MIN_HEIGHT,
  },
  heroImage: {
    width: HERO_WIDTH,
    aspectRatio: 0.92,
    alignSelf: 'center',
    marginBottom: 48,
    borderRadius: 26,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
  },
  footerHost: {
    marginTop: 0,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 0,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 999,
  },
  activeDot: {
    width: 34,
  },
});
