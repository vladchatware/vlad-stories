import { StyleSheet, View } from 'react-native';
import { Host, ScrollView, VStack } from '@expo/ui/swift-ui';
import { background, frame, padding, scrollContentBackground } from '@expo/ui/swift-ui/modifiers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileAvatarHeader } from '@/components/profile-avatar-header';
import { ProfileMenuSection } from '@/components/profile-menu-section';
import { ProfileUpgradeCard } from '@/components/profile-upgrade-card';
import {
  profileHeaderContent,
  profileMenuSections,
  profileUpgradeContent,
} from '@/constants/profile-content';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];
  const nameColor = theme === 'dark' ? '#F4F4FA' : '#1B2130';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Host
        useViewportSizeMeasurement
        colorScheme={theme}
        style={styles.host}>
        <ScrollView
          showsIndicators={false}
          modifiers={[
            background(colors.background),
            scrollContentBackground('hidden'),
          ]}>
          <VStack
            spacing={14}
            alignment="leading"
            modifiers={[
              frame({ maxWidth: Infinity, alignment: 'leading' }),
              padding({
                top: 8,
                bottom: insets.bottom + 104,
                horizontal: 16,
              }),
            ]}>
            <ProfileAvatarHeader
              displayName={profileHeaderContent.displayName}
              balance={profileHeaderContent.balance}
              nameColor={nameColor}
            />
            <ProfileUpgradeCard
              title={profileUpgradeContent.title}
              subtitle={profileUpgradeContent.subtitle}
            />
            {profileMenuSections.map((section) => (
              <ProfileMenuSection key={section.id} items={section.items} />
            ))}
          </VStack>
        </ScrollView>
      </Host>
    </View>
  );
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
