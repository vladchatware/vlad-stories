import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DiscoverStoryTile, DiscoverStoryTileItem } from './discover-story-tile';
import { IconSymbol } from './ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.42, 240);

interface DiscoverStoryRailProps {
  title: string;
  items: DiscoverStoryTileItem[];
}

export function DiscoverStoryRail({ title, items }: DiscoverStoryRailProps) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headingText, { color: colors.text }]}>{title}</Text>

        <Pressable style={styles.actionRow}>
          <Text style={[styles.actionText, { color: colors.secondaryText }]}>Show All</Text>
          <IconSymbol size={20} name="chevron.right" color={colors.secondaryText} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {items.map((item) => (
          <DiscoverStoryTile key={item.id} item={item} width={CARD_WIDTH} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  headingText: {
    fontSize: 24,
    fontWeight: '700',
    flexShrink: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  scrollView: {},
});
