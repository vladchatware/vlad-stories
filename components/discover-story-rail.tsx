import { Dimensions } from 'react-native';
import { Button, HStack, Image, ScrollView, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import {
  buttonStyle,
  font,
  foregroundStyle,
  frame,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { DiscoverStoryTile, DiscoverStoryTileItem } from './discover-story-tile';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.38, 220);

interface DiscoverStoryRailProps {
  title: string;
  items: DiscoverStoryTileItem[];
}

export function DiscoverStoryRail({ title, items }: DiscoverStoryRailProps) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <VStack spacing={16} alignment="leading">
      <HStack
        spacing={12}
        alignment="center"
        modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' }), padding({ horizontal: 20 })]}>
        <Text
          modifiers={[
            font({ size: 25, weight: 'bold', design: 'rounded' }),
            foregroundStyle(colors.text),
          ]}>
          {title}
        </Text>

        <Spacer />

        <Button modifiers={[buttonStyle('plain')]}>
          <HStack spacing={6} alignment="center">
            <Text
              modifiers={[
                font({ size: 14, weight: 'semibold', design: 'rounded' }),
                foregroundStyle(colors.secondaryText),
              ]}>
              Show All
            </Text>
            <Image systemName="chevron.right" size={16} color={colors.secondaryText} />
          </HStack>
        </Button>
      </HStack>

      <ScrollView axes="horizontal" showsIndicators={false}>
        <HStack
          spacing={18}
          alignment="top"
          modifiers={[padding({ horizontal: 20, top: 8, bottom: 10 })]}>
          {items.map((item) => (
            <DiscoverStoryTile key={item.id} item={item} width={CARD_WIDTH} />
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
}
