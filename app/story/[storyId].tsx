import { StyleSheet, View } from 'react-native';
import { Host, Button, GlassEffectContainer, HStack, ScrollView, Spacer, Text, VStack, ZStack, Image, Circle } from '@expo/ui/swift-ui';
import {
  background,
  buttonStyle,
  blur,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  kerning,
  lineLimit,
  multilineTextAlignment,
  opacity,
  padding,
  scrollContentBackground,
  shapes,
  glassEffect,
} from '@expo/ui/swift-ui/modifiers';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBackButton } from '@/components/navigation-back-button';
import { StoryCoverArt } from '@/components/story-cover-art';
import { Colors } from '@/constants/theme';
import { getStoryDetail } from '@/constants/story-details';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function StoryDetailScreen() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];
  const story = getStoryDetail(storyId);

  const backgroundColor = theme === 'dark' ? '#0F1321' : '#F6F1EA';
  const secondaryTextColor = theme === 'dark' ? '#8B93AB' : '#7A7487';
  const bodyColor = theme === 'dark' ? '#A4ADC2' : '#666E84';
  const footerButtonTextColor = '#FFF6F9';
  const footerHorizontalInset = 22;
  const footerBottomInset = 18;
  const footerControlSize = 48;
  const footerChromeVerticalPadding = 10;
  const footerScrollGap = 52;
  const footerDockHeight = footerControlSize + footerChromeVerticalPadding * 2;
  const footerScrollBottomClearance = footerDockHeight + footerScrollGap;

  if (!story) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Host style={styles.host}>
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
                foregroundStyle(colors.text),
              ]}>
              Story not found
            </Text>
            <Button onPress={() => router.back()} label="Go back" modifiers={[buttonStyle('borderedProminent')]} />
          </VStack>
        </Host>
      </View>
    );
  }

  const primaryActionLabel =
    story.progressPercent !== undefined
      ? `Continue ${story.progressLabel ?? 'Ep. 1'} - ${story.progressPercent}%`
      : 'Unlock & Read';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Host useViewportSizeMeasurement colorScheme={theme} style={styles.host}>
        <ZStack alignment="bottom">
          <ZStack alignment="topLeading">
            <Circle
              modifiers={[
                frame({ width: 240, height: 240 }),
                foregroundStyle(story.accentColor),
                opacity(0.1),
                blur(34),
              ]}
            />
          </ZStack>
          <ScrollView
            showsIndicators={false}
            modifiers={[
              background(backgroundColor),
              scrollContentBackground('hidden'),
            ]}>
            <VStack
              spacing={22}
              alignment="leading"
              modifiers={[
                frame({ maxWidth: Infinity, alignment: 'leading' }),
                padding({
                  top: insets.top,
                  bottom: insets.bottom + footerScrollBottomClearance,
                  horizontal: 18,
                }),
              ]}>
              <HStack spacing={12} alignment="center" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
                <NavigationBackButton color={colors.text} onPress={() => router.back()} />

                <Spacer />

                <Button modifiers={[buttonStyle('plain'), padding({ horizontal: 6, vertical: 6 })]}>
                  <Text
                    modifiers={[
                      font({ size: 22, weight: 'bold', design: 'rounded' }),
                      foregroundStyle(secondaryTextColor),
                      fixedSize({ horizontal: true, vertical: true }),
                    ]}>
                    ⋯
                  </Text>
                </Button>
              </HStack>

              <VStack spacing={12} alignment="center" modifiers={[frame({ maxWidth: Infinity, alignment: 'center' })]}>
                <StoryCoverArt cover={story.cover} width={170} height={250} />

                <VStack spacing={6} alignment="center" modifiers={[frame({ maxWidth: 320, alignment: 'center' })]}>
                  <Text
                    modifiers={[
                      font({ size: 12, weight: 'medium', design: 'rounded' }),
                      foregroundStyle(secondaryTextColor),
                      lineLimit(1),
                      multilineTextAlignment('center'),
                    ]}>
                    {story.author}
                  </Text>
                  <Text
                    modifiers={[
                      font({ size: 34, weight: 'bold', design: 'rounded' }),
                      kerning(-0.2),
                      foregroundStyle(colors.text),
                      lineLimit(2),
                      multilineTextAlignment('center'),
                      fixedSize({ horizontal: false, vertical: true }),
                    ]}>
                    {story.title}
                  </Text>
                </VStack>
              </VStack>

              <VStack
                spacing={10}
                alignment="leading"
                modifiers={[
                  frame({ maxWidth: Infinity, alignment: 'leading' }),
                ]}>
                <StoryMetaPanel
                  likes={story.likes}
                  durationLabel={story.durationLabel}
                  views={story.views}
                  accentColor={story.accentColor}
                />

                <HStack spacing={8} alignment="center" modifiers={[frame({ maxWidth: Infinity, alignment: 'center' })]}>
                  {story.tags.slice(0, 3).map((tag) => (
                    <TagChip
                      key={`${story.id}-${tag.label}`}
                      label={tag.label}
                      accent={tag.tone === 'accent'}
                      accentColor={story.accentColor}
                      textColor={secondaryTextColor}
                    />
                  ))}
                </HStack>
              </VStack>

              <VStack spacing={14} alignment="leading" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
                <Text
                  modifiers={[
                    font({ size: 20, weight: 'bold', design: 'rounded' }),
                    foregroundStyle(colors.text),
                  ]}>
                  Description
                </Text>

                <Text
                  modifiers={[
                    font({ size: 16, weight: 'medium', design: 'rounded' }),
                    foregroundStyle(bodyColor),
                    fixedSize({ horizontal: false, vertical: true }),
                  ]}>
                  {story.description}
                </Text>

                <Text
                  modifiers={[
                    font({ size: 16, weight: 'medium', design: 'rounded' }),
                    foregroundStyle(bodyColor),
                    fixedSize({ horizontal: false, vertical: true }),
                  ]}>
                  {`Every choice pushes ${story.title} closer to the reveal, and the next episode begins the moment you open the chat.`}
                </Text>
              </VStack>
            </VStack>
          </ScrollView>

          <VStack
            spacing={0}
            alignment="leading"
            modifiers={[
              frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'bottom' }),
              padding({
                bottom: insets.bottom > 0 ? Math.max(14, insets.bottom - 2) : footerBottomInset,
                horizontal: footerHorizontalInset,
              }),
            ]}>
            <HStack spacing={10} alignment="center">
              <GlassEffectContainer spacing={14}>
                <HStack
                  spacing={10}
                  alignment="center"
                  modifiers={[
                    frame({ maxWidth: Infinity, alignment: 'leading' }),
                    padding({ horizontal: 10, vertical: 10 }),
                    glassEffect({
                      glass: {
                        variant: 'regular',
                        tint: colors.glassTint,
                      },
                      shape: 'roundedRectangle',
                      cornerRadius: 30,
                    }),
                  ]}>
                  <Button
                    modifiers={[
                      buttonStyle('glass'),
                      frame({ width: 48, height: 48 }),
                    ]}>
                    <Image systemName="heart" size={18} color={story.accentColor} />
                  </Button>

                  <Button
                    onPress={() => router.push(`/chat?itemId=${story.id}`)}
                    modifiers={[
                      buttonStyle('plain'),
                      frame({ maxWidth: Infinity }),
                      padding({ horizontal: 20, vertical: 15 }),
                      background(story.accentColor, shapes.capsule()),
                    ]}>
                    <HStack spacing={8} alignment="center">
                      <Image
                        systemName={story.progressPercent !== undefined ? 'play.fill' : 'lock.fill'}
                        size={13}
                        color={footerButtonTextColor}
                      />
                      <Text
                        modifiers={[
                          font({ size: 14, weight: 'bold', design: 'rounded' }),
                          kerning(0.4),
                          foregroundStyle(footerButtonTextColor),
                          lineLimit(1),
                        ]}>
                        {primaryActionLabel.toUpperCase()}
                      </Text>
                    </HStack>
                  </Button>
                </HStack>
              </GlassEffectContainer>
            </HStack>
          </VStack>
        </ZStack>
      </Host>
    </View>
  );
}

function StoryMetaPanel({
  likes,
  durationLabel,
  views,
  accentColor,
}: {
  likes: string;
  durationLabel: string;
  views: string;
  accentColor: string;
}) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <GlassEffectContainer spacing={12}>
      <HStack
        spacing={10}
        alignment="center"
        modifiers={[
          frame({ maxWidth: Infinity, alignment: 'center' }),
          padding({ horizontal: 14, vertical: 10 }),
          glassEffect({
            glass: {
              variant: 'clear',
              tint: colors.glassTint,
            },
            shape: 'capsule',
          }),
        ]}>
        <Image systemName="heart.fill" size={12} color={accentColor} />
        <Text
          modifiers={[
            font({ size: 12, weight: 'semibold', design: 'rounded' }),
            foregroundStyle(colors.text),
            fixedSize({ horizontal: true, vertical: true }),
          ]}>
          {likes}
        </Text>

        <Text
          modifiers={[
            font({ size: 12, weight: 'medium', design: 'rounded' }),
            foregroundStyle(secondaryTone(colors)),
            fixedSize({ horizontal: true, vertical: true }),
          ]}>
          ·
        </Text>

        <Image systemName="clock.fill" size={12} color={secondaryTone(colors)} />
        <Text
          modifiers={[
            font({ size: 12, weight: 'semibold', design: 'rounded' }),
            foregroundStyle(colors.text),
            fixedSize({ horizontal: true, vertical: true }),
          ]}>
          {durationLabel}
        </Text>

        <Text
          modifiers={[
            font({ size: 12, weight: 'medium', design: 'rounded' }),
            foregroundStyle(secondaryTone(colors)),
            fixedSize({ horizontal: true, vertical: true }),
          ]}>
          ·
        </Text>

        <Image systemName="eye.fill" size={12} color={secondaryTone(colors)} />
        <Text
          modifiers={[
            font({ size: 12, weight: 'semibold', design: 'rounded' }),
            foregroundStyle(colors.text),
            fixedSize({ horizontal: true, vertical: true }),
          ]}>
          {views}
        </Text>
      </HStack>
    </GlassEffectContainer>
  );
}

interface TagChipProps {
  label: string;
  accent?: boolean;
  accentColor: string;
  textColor: string;
}

function TagChip({ label, accent, accentColor, textColor }: TagChipProps) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <Text
      modifiers={[
        font({ size: 12, weight: accent ? 'bold' : 'medium', design: 'rounded' }),
        foregroundStyle(accent ? '#FFF6FB' : textColor),
        padding({ horizontal: 14, vertical: 8 }),
        background(accent ? accentColor : colors.glassThin, shapes.capsule()),
        fixedSize({ horizontal: true, vertical: true }),
      ]}>
      {label}
    </Text>
  );
}

function secondaryTone(colors: (typeof Colors)['light']) {
  return colors.secondaryText;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  host: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
