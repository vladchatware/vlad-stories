import { VStack } from '@expo/ui/swift-ui';
import { frame } from '@expo/ui/swift-ui/modifiers';
import { ProfileAvatarHeader } from '@/components/profile-avatar-header';
import { ProfileMenuSection } from '@/components/profile-menu-section';
import { ProfileUpgradeCard } from '@/components/profile-upgrade-card';
import { TabScrollScreen } from '@/components/tab-scroll-screen';
import {
  profileHeaderContent,
  profileMenuSections,
  profileUpgradeContent,
} from '@/constants/profile-content';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const nameColor = theme === 'dark' ? '#F4F4FA' : '#1B2130';

  return (
    <TabScrollScreen contentSpacing={14} horizontalPadding={16} bottomPadding={104}>
      <VStack spacing={14} alignment="leading" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
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
    </TabScrollScreen>
  );
}
