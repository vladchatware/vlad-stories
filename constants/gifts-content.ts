export interface GiftsStreakDayContent {
  id: string;
  coins: string;
  label: string;
  active?: boolean;
}

export interface GiftsSocialTaskContent {
  id: string;
  reward: string;
  action: string;
}

export interface GiftsStreakContent {
  title: string;
  accentTitle: string;
  subtitle: string;
  coinBalance: string;
  bonusCtaLabel: string;
  multiplierLabel: string;
  footerNote: string;
  days: GiftsStreakDayContent[];
}

export interface GiftsActionContent {
  title: string;
  subtitle: string;
}

export interface GiftsSocialSectionContent {
  title: string;
  subtitle: string;
  tasks: GiftsSocialTaskContent[];
}

export const giftsStreakContent: GiftsStreakContent = {
  title: 'Daily',
  accentTitle: 'Gifts',
  subtitle: 'Check in daily to earn coins',
  coinBalance: '336',
  bonusCtaLabel: 'Get Bonus',
  multiplierLabel: 'X2',
  footerNote: 'Come 7 days in a row and get the Biggest Bonus',
  days: [
    { id: 'day-1', coins: '5', label: 'Day 1', active: true },
    { id: 'day-2', coins: '10', label: 'Day 2' },
    { id: 'day-3', coins: '15', label: 'Day 3' },
    { id: 'day-4', coins: '20', label: 'Day 4' },
    { id: 'day-5', coins: '25', label: 'Day 5' },
    { id: 'day-6', coins: '30', label: 'Day 6' },
    { id: 'day-7', coins: '50', label: 'Day 7' },
  ],
};

export const giftsVideoAdsContent: GiftsActionContent = {
  title: 'Video Ads',
  subtitle: 'Earn coins for every ad you watch',
};

export const giftsSocialSectionContent: GiftsSocialSectionContent = {
  title: 'Subscribe & Get Bonuses',
  subtitle: 'Follow us on social media to earn coins',
  tasks: [
    { id: 'instagram', reward: '30 Coins', action: 'Follow on Instagram' },
    { id: 'threads', reward: '30 Coins', action: 'Follow on Threads' },
    { id: 'tiktok', reward: '30 Coins', action: 'Follow on TikTok' },
  ],
};
