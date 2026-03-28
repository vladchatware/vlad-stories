import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  GlassEffectContainer,
  Host,
  HStack,
  RoundedRectangle,
  Spacer,
  Text,
  VStack,
  ZStack,
} from '@expo/ui/swift-ui';
import {
  fixedSize,
  font,
  foregroundStyle,
  frame,
  glassEffect,
  lineLimit,
  monospacedDigit,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { Colors } from '@/constants/theme';
import { getStoryDetail } from '@/constants/story-details';
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

const CARD_IMAGE_HEIGHT = 196;

export function StoryCard({ item, width, showProgress }: StoryCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];
  const story = getStoryDetail(item.id);
  const progress = story?.progressPercent ?? item.progress;

  return (
    <TouchableOpacity activeOpacity={0.92} style={[styles.card, { width }]} onPress={() => router.push(`/story/${item.id}`)}>
      <Host style={styles.host}>
        <VStack spacing={12} alignment="leading" modifiers={[frame({ width, alignment: 'leading' })]}>
          <ZStack alignment="bottomLeading" modifiers={[frame({ width, height: CARD_IMAGE_HEIGHT, alignment: 'leading' })]}>
            <RoundedRectangle
              cornerRadius={24}
              modifiers={[
                frame({ width, height: CARD_IMAGE_HEIGHT }),
                foregroundStyle(
                  story
                    ? {
                        type: 'linearGradient',
                        colors: story.cover.colors,
                        startPoint: { x: 0, y: 0 },
                        endPoint: { x: 1, y: 1 },
                      }
                    : colors.card
                ),
              ]}
            />

            <RoundedRectangle
              cornerRadius={20}
              modifiers={[
                frame({ width: width - 10, height: CARD_IMAGE_HEIGHT - 10 }),
                foregroundStyle({
                  type: 'linearGradient',
                  colors: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)'],
                  startPoint: { x: 0, y: 0 },
                  endPoint: { x: 1, y: 1 },
                }),
              ]}
            />

            <VStack
              spacing={0}
              alignment="leading"
              modifiers={[
                frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'bottomLeading' }),
                padding({ horizontal: 12, bottom: 12 }),
              ]}>
              <StoryMetaCapsule
                genre={item.genre}
                showProgress={showProgress}
                progress={progress}
              />
            </VStack>
          </ZStack>

          <VStack spacing={5} alignment="leading" modifiers={[padding({ horizontal: 2 })]}>
            <Text
              modifiers={[
                font({ size: 12, weight: 'regular', design: 'rounded' }),
                foregroundStyle(colors.secondaryText),
                lineLimit(1),
              ]}>
              {item.author}
            </Text>

            <Text
              modifiers={[
                font({ size: 17, weight: 'bold', design: 'rounded' }),
                foregroundStyle(colors.text),
                lineLimit(2),
                fixedSize({ horizontal: false, vertical: true }),
                frame({ maxWidth: Infinity, alignment: 'leading' }),
              ]}>
              {item.title}
            </Text>
          </VStack>
        </VStack>
      </Host>
    </TouchableOpacity>
  );
}

function StoryMetaCapsule({
  genre,
  showProgress,
  progress,
}: {
  genre: string;
  showProgress?: boolean;
  progress?: number;
}) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <GlassEffectContainer spacing={12}>
      <HStack
        spacing={8}
        alignment="center"
        modifiers={[
          frame({ maxWidth: Infinity, alignment: 'leading' }),
          padding({ horizontal: 11, vertical: 8 }),
          glassEffect({
            glass: {
              variant: 'clear',
              tint: colors.glassTint,
            },
            shape: 'capsule',
          }),
        ]}>
        <Text
          modifiers={[
            font({ size: 11, weight: 'medium', design: 'rounded' }),
            foregroundStyle(colors.text),
            lineLimit(1),
            fixedSize({ horizontal: true, vertical: false }),
          ]}>
          {genre}
        </Text>

        {showProgress && progress !== undefined ? (
          <>
            <Text
              modifiers={[
                font({ size: 11, weight: 'medium', design: 'rounded' }),
                foregroundStyle(colors.secondaryText),
                fixedSize({ horizontal: true, vertical: false }),
              ]}>
              ·
            </Text>
            <Spacer />
            <Text
              modifiers={[
                font({ size: 11, weight: 'medium', design: 'rounded' }),
                foregroundStyle(colors.text),
                fixedSize({ horizontal: true, vertical: false }),
              ]}>
              Continue
            </Text>
            <Text
              modifiers={[
                font({ size: 11, weight: 'semibold', design: 'rounded' }),
                foregroundStyle(colors.text),
                monospacedDigit(),
                fixedSize({ horizontal: true, vertical: false }),
              ]}>
              {`${progress}%`}
            </Text>
          </>
        ) : null}
      </HStack>
    </GlassEffectContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  host: {
    backgroundColor: 'transparent',
  },
});
