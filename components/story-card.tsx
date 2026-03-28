import { DimensionValue, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Host, Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle, lineLimit } from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface StoryItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  progress?: number;
}

interface StoryCardProps {
  item: StoryItem;
  width: number;
  showProgress?: boolean;
}

export function StoryCard({ item, width, showProgress }: StoryCardProps) {
  const router = useRouter();
  const theme = genreThemes[item.genre] ?? genreThemes.default;
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];
  const cardStyle = StyleSheet.flatten([styles.card, { width }]);

  return (
    <TouchableOpacity activeOpacity={0.9} style={cardStyle} onPress={() => router.push(`/story/${item.id}`)}>
      <View style={[styles.cardImage, { backgroundColor: colors.placeholder }]} />
      <View style={styles.cardContent}>
        <Host style={[styles.titleHost, { backgroundColor: colors.background }]}>
          <VStack spacing={4}>
            <Text modifiers={[font({ size: 16, weight: 'bold', design: 'rounded' }), lineLimit(2)]}>
              {item.title}
            </Text>
            <Text
              modifiers={[
                font({ size: 12 }),
                foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                lineLimit(1),
              ]}>
              {`by ${item.author}`}
            </Text>
          </VStack>
        </Host>
        {showProgress && item.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressTrack, { backgroundColor: colors.cardMuted }]}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${item.progress}%` as DimensionValue, backgroundColor: theme.glow },
                ]}
              />
            </View>
            <Host style={[styles.progressHost, { backgroundColor: colors.background }]}>
              <Text
                modifiers={[
                  font({ size: 11, weight: 'medium' }),
                  foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                  lineLimit(1),
                ]}>
                {`${item.progress}% completed`}
              </Text>
            </Host>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const genreThemes: Record<string, { glow: string }> = {
  Fantasy: { glow: '#7D5FFF' },
  'Sci-Fi': { glow: '#2AA7C8' },
  Mystery: { glow: '#6D7D95' },
  Adventure: { glow: '#58A36C' },
  Thriller: { glow: '#D96C49' },
  Romance: { glow: '#E06C9F' },
  Horror: { glow: '#7A5DC7' },
  Cyberpunk: { glow: '#4A7BD8' },
  Drama: { glow: '#D8943B' },
  default: { glow: '#7393B3' },
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  cardImage: {
    height: 196,
    borderRadius: 22,
    overflow: 'hidden',
  },
  cardContent: {
    paddingTop: 12,
    gap: 8,
  },
  titleHost: {
  },
  progressContainer: {
    gap: 8,
  },
  progressTrack: {
    height: 5,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 999,
  },
  progressHost: {
  },
});
