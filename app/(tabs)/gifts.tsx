import { ScrollView, StyleSheet, View } from 'react-native';
import { Host, Text, VStack } from '@expo/ui/swift-ui';
import { fixedSize, font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { GiftsActionCard } from '@/components/gifts-action-card';
import { GiftsSocialTaskCard } from '@/components/gifts-social-task-card';
import { GiftsStreakCard } from '@/components/gifts-streak-card';
import {
  giftsSocialSectionContent,
  giftsStreakContent,
  giftsVideoAdsContent,
} from '@/constants/gifts-content';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function GiftsScreen() {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];
  const titleColor = theme === 'dark' ? '#F5F4FB' : '#151A28';
  const subtitleColor = theme === 'dark' ? '#7B8098' : '#6F768F';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: 4,
            paddingBottom: 44,
          },
        ]}>
        <Host
          matchContents={{ vertical: true }}
          style={[styles.host, { backgroundColor: colors.background }]}>
          <VStack spacing={14} alignment="leading">
            <GiftsStreakCard
              days={giftsStreakContent.days}
              coinBalance={giftsStreakContent.coinBalance}
              title={giftsStreakContent.title}
              accentTitle={giftsStreakContent.accentTitle}
              subtitle={giftsStreakContent.subtitle}
              footerNote={giftsStreakContent.footerNote}
              bonusCtaLabel={giftsStreakContent.bonusCtaLabel}
              multiplierLabel={giftsStreakContent.multiplierLabel}
              titleColor={titleColor}
              subtitleColor={subtitleColor}
            />

            <GiftsActionCard title={giftsVideoAdsContent.title} subtitle={giftsVideoAdsContent.subtitle} />

            <Text
              modifiers={[
                font({ size: 22, weight: 'bold', design: 'rounded' }),
                foregroundStyle(titleColor),
                fixedSize({ horizontal: false, vertical: true }),
            ]}>
              {giftsSocialSectionContent.title}
            </Text>

            <Text
              modifiers={[
                font({ size: 14, weight: 'medium', design: 'rounded' }),
                foregroundStyle(subtitleColor),
                fixedSize({ horizontal: false, vertical: true }),
            ]}>
              {giftsSocialSectionContent.subtitle}
            </Text>

            <VStack spacing={0} alignment="leading">
              {giftsSocialSectionContent.tasks.map((item) => (
                <GiftsSocialTaskCard key={item.id} item={item} />
              ))}
            </VStack>
          </VStack>
        </Host>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  host: {
    backgroundColor: 'transparent',
  },
});
