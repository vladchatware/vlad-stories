import { GenreStory, genreDetails } from './genre-details';

export interface DiscoverHeroStory {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
}

export interface DiscoverStoryListItem {
  id: string;
  title: string;
  author: string;
  views: string;
  likes: string;
  progressLabel?: string;
  progress?: number;
}

export interface StoryTag {
  label: string;
  tone?: 'default' | 'accent';
}

export interface StoryCover {
  colors: [string, string];
  monogram: string;
  symbol: string;
}

export interface StoryDetail {
  id: string;
  title: string;
  author: string;
  description: string;
  views: string;
  likes: string;
  durationLabel: string;
  progressPercent?: number;
  progressLabel?: string;
  statusLabel?: string;
  accentColor: string;
  cover: StoryCover;
  tags: StoryTag[];
}

export const discoverHeroStories: DiscoverHeroStory[] = [
  { id: '1', title: 'Vlad at the Winter Estate', subtitle: 'Mira Sol', accent: '#D14B83' },
  { id: '2', title: 'The Letters Vlad Never Sent', subtitle: 'Jonah Vale', accent: '#C86A96' },
  { id: '3', title: 'Vlad.exe', subtitle: 'Keiko Navarro', accent: '#5A87F5' },
  { id: '4', title: 'The Night Vlad Came Home', subtitle: 'Sonia Petrov', accent: '#D14B83' },
] as const;

export const discoverPopularStories: DiscoverStoryListItem[] = [
  { id: '5', title: 'Portrait of Vlad in Rain', author: 'Tomas Reed', views: '5.2K', likes: '304' },
  {
    id: '6',
    title: 'The Last Summer of Vlad Marin',
    author: 'Elina Sava',
    views: '4.6K',
    likes: '276',
    progressLabel: 'Ep 1',
    progress: 6,
  },
  { id: '7', title: 'Where Vlad Left the Key', author: 'Noor Haddad', views: '4.0K', likes: '244' },
] as const;

export const discoverNewReleaseStories: DiscoverStoryListItem[] = [
  { id: '8', title: 'Vlad and the Glass Garden', author: 'Irena Moss', views: '3.3K', likes: '201' },
  { id: '9', title: 'Call Me When Vlad Wakes', author: 'Devon Pike', views: '3.5K', likes: '216' },
  { id: '10', title: 'Vlad Beyond the Ice Line', author: 'Petra Quinn', views: '3.0K', likes: '184' },
] as const;

const discoverStoryDetails: StoryDetail[] = [
  {
    id: '1',
    title: 'Vlad at the Winter Estate',
    author: 'Mira Sol',
    description:
      'Snow seals Vlad inside the estate where his father vanished, and every locked room keeps a version of the story he was told to forget.',
    views: '5.4K',
    likes: '318',
    durationLabel: '2 Hours',
    statusLabel: 'Completed',
    accentColor: '#D14B83',
    cover: { colors: ['#34283D', '#CB6D8F'], monogram: 'VE', symbol: 'clock.fill' },
    tags: [
      { label: 'Completed' },
      { label: 'Drama' },
      { label: 'Family Secret' },
      { label: 'Gothic' },
    ],
  },
  {
    id: '2',
    title: 'The Letters Vlad Never Sent',
    author: 'Jonah Vale',
    description:
      'A box of unsent letters resurfaces on the day Vlad agrees to fake an engagement with the woman who once read every draft.',
    views: '4.9K',
    likes: '289',
    durationLabel: '1 Hour',
    progressPercent: 8,
    progressLabel: 'Ep. 1',
    statusLabel: 'In Progress',
    accentColor: '#C86A96',
    cover: { colors: ['#5C342E', '#D38D64'], monogram: 'LV', symbol: 'heart.fill' },
    tags: [
      { label: 'In Progress', tone: 'accent' },
      { label: 'Drama' },
      { label: 'Romance' },
      { label: 'Second Chance' },
    ],
  },
  {
    id: '3',
    title: 'Vlad.exe',
    author: 'Keiko Navarro',
    description:
      'A dead coder\'s assistant keeps impersonating Vlad online, and every new message predicts the next corporate sabotage exactly.',
    views: '4.2K',
    likes: '261',
    durationLabel: '58 Min',
    statusLabel: 'Trending',
    accentColor: '#5A87F5',
    cover: { colors: ['#1F2533', '#5A87F5'], monogram: 'VX', symbol: 'dot.radiowaves.left.and.right' },
    tags: [
      { label: 'Trending', tone: 'accent' },
      { label: 'Thriller' },
      { label: 'Sci-Fi' },
      { label: 'Corporate War' },
    ],
  },
  {
    id: '4',
    title: 'The Night Vlad Came Home',
    author: 'Sonia Petrov',
    description:
      'After twelve silent years, Vlad returns for one funeral dinner and finds the family still speaking in accusations instead of names.',
    views: '3.9K',
    likes: '228',
    durationLabel: '1 Hour',
    statusLabel: 'New',
    accentColor: '#D14B83',
    cover: { colors: ['#32485D', '#C07D94'], monogram: 'VH', symbol: 'cloud.rain.fill' },
    tags: [
      { label: 'New', tone: 'accent' },
      { label: 'Drama' },
      { label: 'Family' },
      { label: 'Homecoming' },
    ],
  },
  {
    id: '5',
    title: 'Portrait of Vlad in Rain',
    author: 'Tomas Reed',
    description:
      'A gallery opening forces Vlad to face the portrait his late mother painted the year he disappeared from the family estate.',
    views: '5.2K',
    likes: '304',
    durationLabel: '1 Hour',
    statusLabel: 'Trending',
    accentColor: '#D14B83',
    cover: { colors: ['#3B2737', '#C45F86'], monogram: 'VR', symbol: 'clock.fill' },
    tags: [
      { label: 'Trending', tone: 'accent' },
      { label: 'Drama' },
      { label: 'Inheritance' },
      { label: 'Family Secret' },
    ],
  },
  {
    id: '6',
    title: 'The Last Summer of Vlad Marin',
    author: 'Elina Sava',
    description:
      'A vanished swimmer leaves behind six cassette tapes, each accusing a different person of knowing why Vlad never surfaced.',
    views: '4.6K',
    likes: '276',
    durationLabel: '1 Hour',
    progressPercent: 6,
    progressLabel: 'Ep. 1',
    statusLabel: 'In Progress',
    accentColor: '#8AA0C7',
    cover: { colors: ['#2C344A', '#7E97B8'], monogram: 'VM', symbol: 'heart.fill' },
    tags: [
      { label: 'In Progress', tone: 'accent' },
      { label: 'Mystery' },
      { label: 'Cold Case' },
      { label: 'Coastal Town' },
    ],
  },
  {
    id: '7',
    title: 'Where Vlad Left the Key',
    author: 'Noor Haddad',
    description:
      'A janitor finds Vlad\'s name scratched beneath a safe deposit box that should have been emptied the night the mayor was killed.',
    views: '4.0K',
    likes: '244',
    durationLabel: '54 Min',
    statusLabel: 'Completed',
    accentColor: '#E46D47',
    cover: { colors: ['#1F2533', '#E46D47'], monogram: 'VK', symbol: 'dot.radiowaves.left.and.right' },
    tags: [
      { label: 'Completed' },
      { label: 'Thriller' },
      { label: 'Political Crime' },
      { label: 'Suspense' },
    ],
  },
  {
    id: '8',
    title: 'Vlad and the Glass Garden',
    author: 'Irena Moss',
    description:
      'The greenhouse blooms only when Vlad lies, and the detective renting the attic has started counting petals instead of alibis.',
    views: '3.3K',
    likes: '201',
    durationLabel: '48 Min',
    statusLabel: 'New',
    accentColor: '#6A9C6F',
    cover: { colors: ['#294030', '#86BE74'], monogram: 'VG', symbol: 'leaf.fill' },
    tags: [
      { label: 'New', tone: 'accent' },
      { label: 'Mystery' },
      { label: 'Drama' },
      { label: 'Botanical Gothic' },
    ],
  },
  {
    id: '9',
    title: 'Call Me When Vlad Wakes',
    author: 'Devon Pike',
    description:
      'A hospital volunteer keeps leaving Vlad voice notes while he sleeps through a scandal that could ruin half the city.',
    views: '3.5K',
    likes: '216',
    durationLabel: '52 Min',
    statusLabel: 'Updated',
    accentColor: '#6F8FDB',
    cover: { colors: ['#203C57', '#6F8FDB'], monogram: 'VW', symbol: 'cpu.fill' },
    tags: [
      { label: 'Updated', tone: 'accent' },
      { label: 'Drama' },
      { label: 'Drama' },
      { label: 'Scandal' },
    ],
  },
  {
    id: '10',
    title: 'Vlad Beyond the Ice Line',
    author: 'Petra Quinn',
    description:
      'A survey ship receives a distress beacon in Vlad\'s voice from a glacier where no human could have survived landing.',
    views: '3.0K',
    likes: '184',
    durationLabel: '49 Min',
    statusLabel: 'New',
    accentColor: '#5A88C8',
    cover: { colors: ['#23334A', '#83B3F2'], monogram: 'VI', symbol: 'airplane.departure' },
    tags: [
      { label: 'New', tone: 'accent' },
      { label: 'Thriller' },
      { label: 'Sci-Fi' },
      { label: 'Survival' },
    ],
  },
];

const genreTagMap: Record<string, string[]> = {
  fantasy: ['Fantasy', 'Epic', 'Adventure'],
  drama: ['Drama', 'Romance', 'Character'],
  thriller: ['Thriller', 'Mystery', 'Suspense'],
  mystery: ['Mystery', 'Investigation', 'Slow Burn'],
  romance: ['Romance', 'Chemistry', 'Heartfelt'],
  horror: ['Horror', 'Paranormal', 'Dark'],
  anime: ['Anime', 'Action', 'Coming-of-Age'],
  'sci-fi': ['Sci-Fi', 'Future', 'Mind-Bending'],
};

function buildGenreStoryDetail(story: GenreStory, genreId: string, accentColor: string): StoryDetail {
  const tags = genreTagMap[genreId] ?? ['Featured'];

  return {
    id: story.id,
    title: story.title,
    author: story.subtitle,
    description: story.description,
    views: story.views,
    likes: story.likes,
    durationLabel: story.progressPercent !== undefined ? '1 Hour' : '52 Min',
    progressPercent: story.progressPercent,
    progressLabel: story.progressPercent !== undefined ? 'Ep. 1' : undefined,
    statusLabel: story.progressPercent !== undefined ? 'In Progress' : 'Completed',
    accentColor,
    cover: story.cover,
    tags: [
      { label: story.progressPercent !== undefined ? 'In Progress' : 'Completed' },
      ...tags.map((label) => ({ label })),
    ],
  };
}

const genreStoryDetails = genreDetails.flatMap((genre) =>
  genre.stories.map((story) => buildGenreStoryDetail(story, genre.id, genre.accentColor))
);

export const storyDetails = [...discoverStoryDetails, ...genreStoryDetails];

export const storyDetailMap = Object.fromEntries(storyDetails.map((story) => [story.id, story])) as Record<
  string,
  StoryDetail
>;

export function getStoryDetail(storyId?: string) {
  if (!storyId) return undefined;
  return storyDetailMap[storyId];
}
