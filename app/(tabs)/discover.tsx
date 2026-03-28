import { Circle, VStack, ZStack } from '@expo/ui/swift-ui';
import { blur, frame, foregroundStyle, opacity } from '@expo/ui/swift-ui/modifiers';
import { DiscoverHeroCarousel } from '@/components/discover-hero-carousel';
import { DiscoverStoryRail } from '@/components/discover-story-rail';
import { TabScrollScreen } from '@/components/tab-scroll-screen';
import {
  discoverHeroStories,
  discoverNewReleaseStories,
  discoverPopularStories,
} from '@/constants/story-details';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DiscoverScreen() {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <TabScrollScreen
      backgroundColor={colors.baseCanvas}
      contentSpacing={24}
      horizontalPadding={0}
      bottomPadding={58}
      backgroundDecorations={
        <ZStack alignment="topLeading" modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'topLeading' })]}>
          <Circle
            modifiers={[
              frame({ width: 280, height: 280 }),
              foregroundStyle(theme === 'dark' ? '#6F8FDB' : '#FFE7C8'),
              opacity(theme === 'dark' ? 0.14 : 0.34),
              blur(42),
            ]}
          />

          <ZStack
            alignment="topTrailing"
            modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'topTrailing' })]}>
            <Circle
              modifiers={[
                frame({ width: 240, height: 240 }),
                foregroundStyle(theme === 'dark' ? '#D14B83' : '#FFD7E7'),
                opacity(theme === 'dark' ? 0.12 : 0.32),
                blur(48),
              ]}
            />
          </ZStack>
        </ZStack>
      }>
      <VStack spacing={24} alignment="leading" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
        <DiscoverHeroCarousel items={discoverHeroStories} />
        <DiscoverStoryRail title="Popular" items={discoverPopularStories} />
        <DiscoverStoryRail title="New Releases" items={discoverNewReleaseStories} />
      </VStack>
    </TabScrollScreen>
  );
}
