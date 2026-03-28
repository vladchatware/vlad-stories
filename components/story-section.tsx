import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Host, Button, HStack, Text } from '@expo/ui/swift-ui';
import { buttonStyle, controlSize, font, lineLimit, padding, tint } from '@expo/ui/swift-ui/modifiers';
import { StoryCard } from './story-card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.42, 178);

interface StoryItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  progress?: number;
}

interface StorySectionProps {
  title: string;
  data: StoryItem[];
  showProgress?: boolean;
}

export function StorySection({ title, data, showProgress }: StorySectionProps) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Host style={[styles.headerTextHost, { backgroundColor: colors.background }]}>
            <HStack>
              <Text modifiers={[font({ size: 24, weight: 'bold', design: 'rounded' }), lineLimit(1)]}>
                {title}
              </Text>
            </HStack>
          </Host>
          <Host style={[styles.showAllHost, { backgroundColor: colors.background }]}>
            <HStack modifiers={[padding({ top: 2 })]}>
              <Button
                systemImage="chevron.right"
                label="Show All"
                modifiers={[
                  buttonStyle('borderless'),
                  controlSize('regular'),
                  tint(colors.secondaryText),
                ]}
              />
            </HStack>
          </Host>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 14}
        snapToAlignment="start"
      >
        {data.map((item) => (
          <StoryCard
            key={item.id}
            item={item}
            width={CARD_WIDTH}
            showProgress={showProgress}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  headerTextHost: {
    flexShrink: 1,
  },
  showAllHost: {
  },
});
