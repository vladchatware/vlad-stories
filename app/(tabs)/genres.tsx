import { Circle, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  blur,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  opacity,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';
import { GenreListItem } from '@/components/genre-list-item';
import { TabScrollScreen } from '@/components/tab-scroll-screen';
import { genreListEntries } from '@/constants/genre-list';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function GenresScreen() {
  const router = useRouter();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <TabScrollScreen
      backgroundColor={colors.baseCanvas}
      contentSpacing={22}
      horizontalPadding={20}
      bottomPadding={74}
      backgroundDecorations={
          <ZStack
          alignment="topLeading"
          modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'topLeading' })]}>
          <Circle
            modifiers={[
              frame({ width: 268, height: 268 }),
              foregroundStyle(theme === 'dark' ? '#667FC6' : '#F4DFC6'),
              opacity(theme === 'dark' ? 0.15 : 0.42),
              blur(52),
            ]}
          />

          <ZStack
            alignment="topTrailing"
            modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'topTrailing' })]}>
            <Circle
              modifiers={[
                frame({ width: 212, height: 212 }),
                foregroundStyle(theme === 'dark' ? '#D14B83' : '#F3D3DE'),
                opacity(theme === 'dark' ? 0.12 : 0.28),
                blur(46),
              ]}
            />
          </ZStack>
        </ZStack>
      }>
      <VStack spacing={4} alignment="leading" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
        <Text
          modifiers={[
            font({ size: 36, weight: 'bold', design: 'rounded' }),
            foregroundStyle(colors.text),
            lineLimit(1),
          ]}>
          Genres
        </Text>
      </VStack>

      <VStack spacing={12} alignment="leading" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
        {genreListEntries.map((genre) => (
          <GenreListItem
            key={genre.id}
            item={genre}
            onPress={() => router.push(`/genre/${genre.id}`)}
          />
        ))}
      </VStack>
    </TabScrollScreen>
  );
}
