import { useRouter } from 'expo-router';
import {
  Button,
  GlassEffectContainer,
  HStack,
  Image,
  RoundedRectangle,
  Text,
  VStack,
  ZStack,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
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
  const story = getStoryDetail(item.id);
  const imageHeight = width / THUMBNAIL_ASPECT_RATIO;

  return (
    <Button
      onPress={() => router.push(`/story/${item.id}`)}
      modifiers={[buttonStyle('plain'), frame({ width, alignment: 'leading' })]}>
      <VStack spacing={10} alignment="leading" modifiers={[frame({ width, alignment: 'leading' })]}>
        <ZStack alignment="bottom" modifiers={[frame({ width, height: imageHeight, alignment: 'leading' })]}>
          <RoundedRectangle
            cornerRadius={24}
            modifiers={[
              frame({ width, height: imageHeight }),
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
            cornerRadius={24}
            modifiers={[
              frame({ width: width - 10, height: imageHeight - 10 }),
              foregroundStyle({
                type: 'linearGradient',
                colors: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)'],
                startPoint: { x: 0, y: 0 },
                endPoint: { x: 1, y: 1 },
              }),
            ]}
          />

          <VStack
            spacing={8}
            alignment="leading"
            modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'bottom' }), padding({ horizontal: 12, bottom: 12 })]}>
            <MetaBar views={item.views} likes={item.likes} />
            {item.progressLabel || item.progress !== undefined ? (
              <ProgressMeta progressLabel={item.progressLabel} progress={item.progress} />
            ) : null}
          </VStack>
        </ZStack>

        <VStack
          spacing={6}
          alignment="leading"
          modifiers={[
            frame({ width, alignment: 'leading' }),
            padding({ horizontal: 2, vertical: 2 }),
          ]}>
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
    </Button>
  );
}

function MetaBar({
  views,
  likes,
}: {
  views: string;
  likes: string;
}) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <GlassEffectContainer spacing={12}>
      <HStack
        spacing={8}
        alignment="center"
        modifiers={[
          frame({ maxWidth: Infinity, alignment: 'leading' }),
          padding({ horizontal: 10, vertical: 8 }),
          glassEffect({
            glass: {
              variant: 'clear',
              tint: colors.glassTint,
            },
            shape: 'capsule',
          }),
        ]}>
        <Image systemName="eye.fill" size={14} color={colors.text} />
        <Text
          modifiers={[
            font({ size: 11, weight: 'semibold', design: 'rounded' }),
            foregroundStyle(colors.text),
            monospacedDigit(),
            lineLimit(1),
            fixedSize({ horizontal: true, vertical: false }),
          ]}>
          {views}
        </Text>

        <Text
          modifiers={[
            font({ size: 11, weight: 'medium', design: 'rounded' }),
            foregroundStyle(colors.secondaryText),
            fixedSize({ horizontal: true, vertical: false }),
          ]}>
          ·
        </Text>

        <Image systemName="heart.fill" size={14} color="#D14B83" />
        <Text
          modifiers={[
            font({ size: 11, weight: 'semibold', design: 'rounded' }),
            foregroundStyle(colors.text),
            monospacedDigit(),
            lineLimit(1),
            fixedSize({ horizontal: true, vertical: false }),
          ]}>
          {likes}
        </Text>
      </HStack>
    </GlassEffectContainer>
  );
}

function ProgressMeta({
  progressLabel,
  progress,
}: {
  progressLabel?: string;
  progress?: number;
}) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <HStack spacing={6} alignment="center">
      {progressLabel ? (
        <Text
          modifiers={[
            font({ size: 11, weight: 'medium', design: 'rounded' }),
            foregroundStyle(colors.specularHighlight),
            lineLimit(1),
            fixedSize({ horizontal: true, vertical: false }),
          ]}>
          {progressLabel}
        </Text>
      ) : null}
      {progress !== undefined ? (
        <Text
          modifiers={[
            font({ size: 11, weight: 'semibold', design: 'rounded' }),
            foregroundStyle(colors.specularHighlight),
            monospacedDigit(),
            lineLimit(1),
            fixedSize({ horizontal: true, vertical: false }),
          ]}>
          {`${progress}%`}
        </Text>
      ) : null}
    </HStack>
  );
}
