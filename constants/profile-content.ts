export interface ProfileMenuItemContent {
  id: string;
  icon: string;
  title: string;
  badgeText?: string;
}

export interface ProfileMenuSectionContent {
  id: string;
  items: ProfileMenuItemContent[];
}

export interface ProfileHeaderContent {
  displayName: string;
  balance: string;
}

export interface ProfileUpgradeContent {
  title: string;
  subtitle: string;
}

export const profileHeaderContent: ProfileHeaderContent = {
  displayName: 'Vlad Rimsha',
  balance: '336',
};

export const profileUpgradeContent: ProfileUpgradeContent = {
  title: 'Upgrade to Plus',
  subtitle: 'Get twice as much!',
};

export const profileMenuSections: ProfileMenuSectionContent[] = [
  {
    id: 'account',
    items: [
      { id: 'top-up', icon: 'bitcoinsign.circle', title: 'Top Up', badgeText: '+50%' },
      { id: 'edit-profile', icon: 'person.crop.circle', title: 'Edit Profile' },
      { id: 'music-settings', icon: 'music.note', title: 'Music Settings' },
      { id: 'language', icon: 'globe', title: 'Language' },
    ],
  },
  {
    id: 'subscription',
    items: [
      { id: 'manage-subscription', icon: 'creditcard', title: 'Manage Subscription' },
      {
        id: 'restore-purchases',
        icon: 'clock.arrow.trianglehead.counterclockwise.rotate.90',
        title: 'Restore Purchases',
      },
    ],
  },
  {
    id: 'support',
    items: [
      { id: 'follow-us', icon: 'heart', title: 'Follow Us' },
      { id: 'contact-support', icon: 'envelope', title: 'Contact Support' },
    ],
  },
];
