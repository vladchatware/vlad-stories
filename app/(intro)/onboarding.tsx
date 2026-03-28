import { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View, ViewToken } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Discover Stories',
    description: 'Explore new and trending stories from your favorite genres',
  },
  {
    id: '2',
    title: 'Chat with Stories',
    description: 'Interact with stories in a whole new way and chat your way through narratives',
  },
  {
    id: '3',
    title: 'Share & Gift',
    description: 'Send stories as gifts to friends or share your favorites',
  },
] as const;

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<(typeof slides)[number]>>(null);

  const colors = Colors[theme];

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      setCurrentIndex(Number(viewableItems[0].key) - 1);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const finishOnboarding = () => {
    router.replace('/(tabs)/discover');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      return;
    }

    finishOnboarding();
  };

  const renderItem = ({ item }: { item: (typeof slides)[number] }) => (
    <View style={[styles.slide, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.description}>{item.description}</ThemedText>
      </ThemedView>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? colors.tint : colors.icon },
            ]}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <ThemedText onPress={finishOnboarding} style={styles.skipButton}>
          Skip
        </ThemedText>
        <ThemedText onPress={handleNext} style={[styles.nextButton, { color: colors.tint }]}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  skipButton: {
    fontSize: 16,
    opacity: 0.5,
  },
  nextButton: {
    fontSize: 16,
    fontWeight: '600',
  },
});
