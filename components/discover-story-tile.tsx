import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from './ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const THUMBNAIL_ASPECT_RATIO = 1.14;

export interface DiscoverStoryTileItem {
  id: string;
  title: string;
  author: string;
  views: string;
  likes: string;
  progressLabel?: string;
  progress?: number;
}

interface DiscoverStoryTileProps {
  item: DiscoverStoryTileItem;
  width: number;
}

export function DiscoverStoryTile({ item, width }: DiscoverStoryTileProps) {
  const router = useRouter();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];
  const cardStyle = StyleSheet.flatten([styles.card, { width }]);

  return (
    <TouchableOpacity activeOpacity={0.92} style={cardStyle} onPress={() => router.push(`/story/${item.id}`)}>
      <View style={[styles.imageCard, { backgroundColor: colors.card }]}>
        <View style={[styles.imagePlaceholder, { backgroundColor: colors.placeholder }]} />

        <View style={styles.overlayFooter}>
          <View style={styles.overlayStack}>
            <View style={styles.metricsRow}>
              <View style={[styles.metricPill, { backgroundColor: colors.overlay }]}>
                <IconSymbol size={14} name="eye.fill" color={colors.text} />
                <Text style={[styles.metricText, { color: colors.text }]}>{item.views}</Text>
              </View>

              <View style={[styles.metricPill, { backgroundColor: colors.overlay }]}>
                <IconSymbol size={14} name="heart.fill" color="#D14B83" />
                <Text style={[styles.metricText, { color: colors.text }]}>{item.likes}</Text>
              </View>
            </View>

            {(item.progressLabel || item.progress !== undefined) && (
              <View style={styles.progressRow}>
                {item.progressLabel ? (
                  <Text style={[styles.progressText, { color: colors.text }]}>{item.progressLabel}</Text>
                ) : (
                  <View />
                )}

                {item.progress !== undefined && (
                  <Text style={[styles.progressText, { color: colors.text }]}>{`${item.progress}%`}</Text>
                )}
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.copyHost}>
        <Text style={[styles.authorText, { color: colors.secondaryText }]} numberOfLines={1}>
          {item.author}
        </Text>

        <Text style={[styles.titleText, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
  },
  imageCard: {
    aspectRatio: THUMBNAIL_ASPECT_RATIO,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 10,
  },
  overlayStack: {
    gap: 10,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  metricPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  copyHost: {
    gap: 6,
    minHeight: 64,
  },
  authorText: {
    fontSize: 12,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '700',
    minHeight: 52,
  },
});
