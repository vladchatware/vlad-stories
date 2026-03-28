import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Host, Button, HStack, Text, VStack } from '@expo/ui/swift-ui';
import { buttonStyle, controlSize, font, foregroundStyle, lineLimit, padding, tint } from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_GAP = 14;

interface StoryItem {
  id: string;
  title: string;
  author: string;
  genre: string;
}

interface FeaturedStoriesProps {
  stories: StoryItem[];
}

export function FeaturedStories({ stories }: FeaturedStoriesProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];
  const storyThemes = useMemo(
    () => ({
      Fantasy: { button: '#7D5FFF' },
      'Sci-Fi': { button: '#2AA7C8' },
      Mystery: { button: '#6D7D95' },
      Adventure: { button: '#58A36C' },
    }),
    []
  );
  const scrollViewRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (stories.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % stories.length;
      scrollViewRef.current?.scrollTo({ x: nextIndex * (CARD_WIDTH + CARD_GAP), animated: true });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, stories.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_GAP));
    setCurrentIndex(index);
  };

  if (stories.length === 0) return null;
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
        )}
      >
        {stories.map((item, index) => {
          const theme = storyThemes[item.genre as keyof typeof storyThemes] ?? {
            button: '#7393B3',
          };
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
                  {
                    backgroundColor: colors.surface,
                    shadowColor: colors.shadow,
                    transform: [{ translateY }],
                  },
                ]}>
                <View style={[styles.heroPanel, { backgroundColor: colors.placeholder }]} />
                <Host style={[styles.infoSectionHost, { backgroundColor: colors.surface }]}>
                  <VStack spacing={14}>
                    <VStack spacing={6}>
                      <Text
                        modifiers={[
                          font({ size: 15, weight: 'medium' }),
                          foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                        ]}>
                        {item.genre}
                      </Text>
                      <Text modifiers={[font({ size: 27, weight: 'bold', design: 'rounded' }), lineLimit(2)]}>
                        {item.title}
                      </Text>
                      <Text
                        modifiers={[
                          font({ size: 15 }),
                          foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                        ]}>
                        {`by ${item.author}`}
                      </Text>
                    </VStack>
                    <HStack
                      modifiers={[
                        padding({ top: 6 }),
                      ]}>
                      <Button
                        onPress={() => router.push(`/chat?itemId=${item.id}`)}
                        label="Read"
                        modifiers={[
                          buttonStyle('borderedProminent'),
                          controlSize('large'),
                          tint(theme.button),
                        ]}
                      />
                    </HStack>
                  </VStack>
                </Host>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
      {stories.length > 1 && (
        <View style={styles.paginationContainer}>
          {stories.map((_, index) => (
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
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
  slide: {
    width: CARD_WIDTH,
    marginRight: CARD_GAP,
  },
  card: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.24,
    shadowRadius: 30,
    elevation: 10,
  },
  heroPanel: {
    height: Math.min(height * 0.28, 280),
    marginTop: 28,
    marginHorizontal: 20,
    borderRadius: 26,
    overflow: 'hidden',
  },
  infoSectionHost: {
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 26,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 24,
  },
});
