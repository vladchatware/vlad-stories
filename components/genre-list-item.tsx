import { StyleSheet, TouchableOpacity } from 'react-native';
import { Host, HStack, Image, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle, lineLimit } from '@expo/ui/swift-ui/modifiers';

export interface GenreListItemData {
  id: string;
  title: string;
  storyCount: number;
}

interface GenreListItemProps {
  item: GenreListItemData;
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  iconColor: string;
  onPress?: () => void;
}

export function GenreListItem({
  item,
  backgroundColor,
  titleColor,
  subtitleColor,
  iconColor,
  onPress,
}: GenreListItemProps) {
  const storyLabel = item.storyCount === 1 ? 'story' : 'stories';

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.card, { backgroundColor }]}>
      <Host style={[styles.host, { backgroundColor }]}>
        <HStack spacing={12} alignment="center">
          <VStack spacing={4}>
            <Text
              modifiers={[
                font({ size: 21, weight: 'bold', design: 'rounded' }),
                foregroundStyle(titleColor),
                lineLimit(1),
              ]}>
              {item.title}
            </Text>
            <Text
              modifiers={[
                font({ size: 14, weight: 'medium', design: 'rounded' }),
                foregroundStyle(subtitleColor),
                lineLimit(1),
              ]}>
              {`${item.storyCount} ${storyLabel}`}
            </Text>
          </VStack>

          <Spacer />

          <Image systemName="chevron.right" size={15} color={iconColor} />
        </HStack>
      </Host>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    minHeight: 92,
    justifyContent: 'center',
    paddingHorizontal: 18,
    shadowColor: '#02040B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 3,
  },
  host: {
    borderRadius: 18,
  },
});
