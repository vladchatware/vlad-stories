import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DiscoverHeroCarousel } from '@/components/discover-hero-carousel';
import { DiscoverStoryRail } from '@/components/discover-story-rail';
import {
  discoverHeroStories,
  discoverNewReleaseStories,
  discoverPopularStories,
} from '@/constants/story-details';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 132,
          },
        ]}>
        <DiscoverHeroCarousel items={discoverHeroStories} />
        <DiscoverStoryRail title="Popular" items={discoverPopularStories} />
        <DiscoverStoryRail title="New Releases" items={discoverNewReleaseStories} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 28,
  },
});
