import { getStoryDetail } from './story-details';

const winterEstate = getStoryDetail('1');
const lettersStory = getStoryDetail('2');
const vladExe = getStoryDetail('3');

if (!winterEstate || !lettersStory || !vladExe) {
  throw new Error('Onboarding content requires seeded story details.');
}

export type OnboardingSlideKind = 'discover' | 'chat' | 'gift';

export interface OnboardingSlide {
  id: string;
  kind: OnboardingSlideKind;
  eyebrow: string;
  title: string;
  description: string;
  accentColor: string;
  gradient: [string, string, string];
  cover: typeof winterEstate.cover;
  detailLabel: string;
  detailValue: string;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'discover',
    kind: 'discover',
    eyebrow: 'Curated for you',
    title: 'Step into stories that already feel alive.',
    description:
      'Browse atmospheric picks, trending episodes, and new Vlad worlds without losing the sense of editorial focus.',
    accentColor: winterEstate.accentColor,
    gradient: ['#161C2D', '#252E44', '#101520'],
    cover: winterEstate.cover,
    detailLabel: 'Tonight',
    detailValue: '4 fresh picks',
  },
  {
    id: 'chat',
    kind: 'chat',
    eyebrow: 'Responsive reading',
    title: 'Talk to the story while the tension is still building.',
    description:
      'Move between chapters and chat moments in one flow so each choice feels immediate instead of bolted on after the fact.',
    accentColor: vladExe.accentColor,
    gradient: ['#111827', '#18253A', '#0A101A'],
    cover: vladExe.cover,
    detailLabel: 'Live thread',
    detailValue: '3 prompts waiting',
  },
  {
    id: 'gift',
    kind: 'gift',
    eyebrow: 'Shared moments',
    title: 'Send a story with enough personality to feel personal.',
    description:
      'Gift a favorite title, highlight a mood, and hand someone a world that already has a point of view.',
    accentColor: lettersStory.accentColor,
    gradient: ['#221822', '#41303A', '#140F15'],
    cover: lettersStory.cover,
    detailLabel: 'Easy gifting',
    detailValue: 'Deliver instantly',
  },
];
