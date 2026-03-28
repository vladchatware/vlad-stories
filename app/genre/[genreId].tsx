import { StyleSheet, View } from 'react-native';
import { Host, Button, HStack, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import {
  buttonStyle,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { GenreStoryRow } from '@/components/genre-story-row';
import { NavigationBackButton } from '@/components/navigation-back-button';
import { TabScrollScreen } from '@/components/tab-scroll-screen';
import { genreDetailMap } from '@/constants/genre-details';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function GenreDetailScreen() {
  const { genreId } = useLocalSearchParams<{ genreId: string }>();
  const router = useRouter();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const fallbackColors = Colors[theme];
  const genre = genreId ? genreDetailMap[genreId] : undefined;

  const backgroundColor = theme === 'dark' ? '#0C1020' : '#F6F1EA';
  const cardColor = theme === 'dark' ? '#171E32' : '#FFFFFF';
  const titleColor = theme === 'dark' ? '#F4F5FA' : '#151A28';
  const subtitleColor = theme === 'dark' ? '#8F97B4' : '#6C738A';
  const bodyColor = theme === 'dark' ? '#7E869F' : '#6F768F';
  const iconColor = theme === 'dark' ? '#AAB1C8' : '#7C859E';
  const metricColor = theme === 'dark' ? '#96A0BE' : '#7A839D';
  const progressTrackColor = theme === 'dark' ? '#2B3550' : '#E7DFD3';

  if (!genre) {
    return (
      <View style={[styles.container, { backgroundColor: fallbackColors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Host style={styles.emptyHost}>
          <VStack
            spacing={12}
            alignment="leading"
            modifiers={[
              frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'leading' }),
              padding({ horizontal: 20, vertical: 24 }),
            ]}>
            <Text
              modifiers={[
                font({ size: 28, weight: 'bold', design: 'rounded' }),
                foregroundStyle(fallbackColors.text),
              ]}>
              Genre not found
            </Text>
            <Button onPress={() => router.back()} label="Go back" modifiers={[buttonStyle('borderedProminent')]} />
          </VStack>
        </Host>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TabScrollScreen backgroundColor={backgroundColor} contentSpacing={20} horizontalPadding={16} bottomPadding={44}>
        <HStack spacing={14} alignment="center" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
          <NavigationBackButton color={titleColor} onPress={() => router.back()} />

          <Text
            modifiers={[
              font({ size: 30, weight: 'bold', design: 'rounded' }),
              foregroundStyle(titleColor),
              fixedSize({ horizontal: false, vertical: true }),
            ]}>
            {genre.title}
          </Text>

          <Spacer />
        </HStack>

        <VStack spacing={12} alignment="leading" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
          {genre.stories.map((story) => (
            <GenreStoryRow
              key={story.id}
              item={story}
              accentColor={genre.accentColor}
              cardColor={cardColor}
              titleColor={titleColor}
              subtitleColor={subtitleColor}
              bodyColor={bodyColor}
              iconColor={iconColor}
              metricColor={metricColor}
              progressTrackColor={progressTrackColor}
              onPress={() => router.push(`/story/${story.id}`)}
            />
          ))}
        </VStack>
      </TabScrollScreen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyHost: {
    flex: 1,
  },
});
