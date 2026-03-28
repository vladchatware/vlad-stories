import { ScrollView, StyleSheet, View } from 'react-native';
import { Host, Text } from '@expo/ui/swift-ui';
import { font, foregroundStyle, lineLimit } from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GenreListItem } from '@/components/genre-list-item';
import { genreListEntries } from '@/constants/genre-list';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function GenresScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];
  const cardBackground = theme === 'dark' ? '#232841' : colors.surfaceElevated;
  const titleColor = theme === 'dark' ? '#F4F3FA' : colors.text;
  const subtitleColor = theme === 'dark' ? '#9AA1BA' : colors.secondaryText;
  const iconColor = theme === 'dark' ? '#E1E3EF' : colors.icon;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 34,
            paddingBottom: insets.bottom + 104,
          },
        ]}>
        <Host style={[styles.titleHost, { backgroundColor: colors.background }]}>
          <Text
            modifiers={[
              font({ size: 42, weight: 'bold', design: 'rounded' }),
              foregroundStyle(titleColor),
              lineLimit(1),
            ]}>
            Genres
          </Text>
        </Host>

        <View style={styles.list}>
          {genreListEntries.map((genre) => (
            <GenreListItem
              key={genre.id}
              item={genre}
              backgroundColor={cardBackground}
              titleColor={titleColor}
              subtitleColor={subtitleColor}
              iconColor={iconColor}
              onPress={() => router.push(`/genre/${genre.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  titleHost: {
    marginBottom: 40,
  },
  list: {
    gap: 10,
  },
});
