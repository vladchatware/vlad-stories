export interface GenreStoryCover {
  colors: [string, string];
  monogram: string;
  symbol: string;
}

export interface GenreStory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  views: string;
  likes: string;
  progressPercent?: number;
  cover: GenreStoryCover;
}

export interface GenreDetail {
  id: string;
  title: string;
  storyCount: number;
  accentColor: string;
  stories: GenreStory[];
}

const genreDetailSeeds: Omit<GenreDetail, 'storyCount'>[] = [
  {
    id: 'fantasy',
    title: 'Fantasy',
    accentColor: '#7D5FFF',
    stories: [
      {
        id: 'fantasy-midnight-crown',
        title: 'Vlad and the Moonlit Crown',
        subtitle: 'Irina Vale',
        description: 'When Vlad inherits a crown that only appears under moonlight, every wish he makes rewrites one kingdom and erases another.',
        views: '3.6K',
        likes: '166',
        cover: { colors: ['#35246A', '#8A74F4'], monogram: 'VC', symbol: 'sparkles' },
      },
    ],
  },
  {
    id: 'drama',
    title: 'Drama',
    accentColor: '#D14B83',
    stories: [
      {
        id: 'drama-heir-undercover',
        title: 'Portrait of Vlad in Rain',
        subtitle: 'Tomas Reed',
        description: 'A gallery opening forces Vlad to face the portrait his late mother painted the year he disappeared from the family estate.',
        views: '4.9K',
        likes: '287',
        progressPercent: 2,
        cover: { colors: ['#5B3240', '#D67A98'], monogram: 'VR', symbol: 'heart.fill' },
      },
      {
        id: 'drama-second-chapter',
        title: 'The Letters Vlad Never Sent',
        subtitle: 'Jonah Vale',
        description: 'A box of unsent letters resurfaces on the day Vlad agrees to fake an engagement with the woman who once read every draft.',
        views: '3.8K',
        likes: '213',
        cover: { colors: ['#6E5445', '#D4B08C'], monogram: 'LV', symbol: 'book.closed.fill' },
      },
      {
        id: 'drama-after-divorce',
        title: 'The Night Vlad Came Home',
        subtitle: 'Sonia Petrov',
        description: 'After twelve silent years, Vlad returns for one funeral dinner and finds the family still speaking in accusations instead of names.',
        views: '3.1K',
        likes: '174',
        cover: { colors: ['#2D3248', '#AA7C82'], monogram: 'VH', symbol: 'flame.fill' },
      },
      {
        id: 'drama-falling-for-ai',
        title: 'Call Me When Vlad Wakes',
        subtitle: 'Devon Pike',
        description: 'A hospital volunteer keeps leaving Vlad voice notes while he sleeps through a scandal that could ruin half the city.',
        views: '2.9K',
        likes: '162',
        cover: { colors: ['#21324E', '#6FA8DF'], monogram: 'VW', symbol: 'cpu.fill' },
      },
      {
        id: 'drama-invisible-miss-weston',
        title: 'Vlad at the Winter Estate',
        subtitle: 'Mira Sol',
        description: 'Snow seals Vlad inside the estate where his father vanished, and every locked room keeps a version of the story he was told to forget.',
        views: '4.4K',
        likes: '251',
        cover: { colors: ['#4B2E33', '#C2897C'], monogram: 'VE', symbol: 'moon.stars.fill' },
      },
    ],
  },
  {
    id: 'thriller',
    title: 'Thriller',
    accentColor: '#E46D47',
    stories: [
      {
        id: 'thriller-late-signal',
        title: 'Where Vlad Left the Key',
        subtitle: 'Noor Haddad',
        description: 'A janitor finds Vlad\'s name scratched beneath a safe deposit box that should have been emptied the night the mayor was killed.',
        views: '4.2K',
        likes: '236',
        cover: { colors: ['#2A2332', '#D36B48'], monogram: 'VK', symbol: 'dot.radiowaves.left.and.right' },
      },
      {
        id: 'thriller-third-basement',
        title: 'Vlad.exe',
        subtitle: 'Keiko Navarro',
        description: 'A dead coder\'s assistant keeps impersonating Vlad online, and every new message predicts the next corporate sabotage exactly.',
        views: '4.5K',
        likes: '248',
        cover: { colors: ['#1F2534', '#8B8FF4'], monogram: 'VX', symbol: 'bolt.fill' },
      },
    ],
  },
  {
    id: 'mystery',
    title: 'Mystery',
    accentColor: '#8AA0C7',
    stories: [
      {
        id: 'mystery-wren-house',
        title: 'Vlad and the Glass Garden',
        subtitle: 'Irena Moss',
        description: 'The greenhouse blooms only when Vlad lies, and the detective renting the attic has started counting petals instead of alibis.',
        views: '3.4K',
        likes: '181',
        cover: { colors: ['#2B3146', '#7FA8A2'], monogram: 'VG', symbol: 'magnifyingglass' },
      },
      {
        id: 'mystery-black-ink',
        title: 'The Last Summer of Vlad Marin',
        subtitle: 'Elina Sava',
        description: 'A vanished swimmer leaves behind six cassette tapes, each accusing a different person of knowing why Vlad never surfaced.',
        views: '3.0K',
        likes: '149',
        cover: { colors: ['#252B38', '#5F7FA5'], monogram: 'VM', symbol: 'doc.text.fill' },
      },
    ],
  },
  {
    id: 'romance',
    title: 'Romance',
    accentColor: '#E06C9F',
    stories: [
      {
        id: 'romance-june-in-paris',
        title: 'Teach Vlad to Dance',
        subtitle: 'Camille Arden',
        description: 'An uptight architect promises one wedding waltz lesson a week and discovers Vlad memorizes people faster than choreography.',
        views: '5.1K',
        likes: '322',
        cover: { colors: ['#7A3F55', '#E49DBA'], monogram: 'VD', symbol: 'heart.text.square.fill' },
      },
      {
        id: 'romance-lighthouse-vows',
        title: 'Kiss Vlad Before Sunrise',
        subtitle: 'Lena Duarte',
        description: 'A fake dating pact at a coastal wedding turns dangerous when Vlad starts treating every lie like a promise worth keeping.',
        views: '4.0K',
        likes: '257',
        cover: { colors: ['#9B674D', '#E2B08F'], monogram: 'VS', symbol: 'sun.max.fill' },
      },
    ],
  },
  {
    id: 'horror',
    title: 'Horror',
    accentColor: '#8A6ACF',
    stories: [
      {
        id: 'horror-room-13',
        title: 'Do Not Open Vlad\'s Door',
        subtitle: 'Maris Kade',
        description: 'Every tenant hears Vlad moving behind apartment 13B, but the landlord insists the lease ended forty-three years ago.',
        views: '3.8K',
        likes: '194',
        cover: { colors: ['#231D35', '#6A5A90'], monogram: 'VD', symbol: 'eye.trianglebadge.exclamationmark.fill' },
      },
    ],
  },
  {
    id: 'anime',
    title: 'Anime',
    accentColor: '#59A7FF',
    stories: [
      {
        id: 'anime-neon-kendo',
        title: 'Vlad Turbo Hearts',
        subtitle: 'Riku Ames',
        description: 'Vlad joins the city\'s loudest scooter crew to pay a debt and accidentally becomes the face of a rebellion in neon sneakers.',
        views: '3.1K',
        likes: '179',
        cover: { colors: ['#193D6E', '#5EC2FF'], monogram: 'VH', symbol: 'bolt.circle.fill' },
      },
      {
        id: 'anime-cloud-runner',
        title: 'Vlad on Channel Zero',
        subtitle: 'Aya Sato',
        description: 'A pirate broadcast recruits Vlad into a schoolwide battle of rumors, rankings, and rooftop confessions.',
        views: '2.8K',
        likes: '158',
        cover: { colors: ['#22506D', '#84D5E7'], monogram: 'VZ', symbol: 'wind' },
      },
    ],
  },
  {
    id: 'sci-fi',
    title: 'Sci-Fi',
    accentColor: '#4AB6D9',
    stories: [
      {
        id: 'scifi-orbit-zero',
        title: 'Vlad Beyond the Ice Line',
        subtitle: 'Petra Quinn',
        description: 'A survey ship receives a distress beacon in Vlad\'s voice from a glacier where no human could have survived landing.',
        views: '3.9K',
        likes: '219',
        cover: { colors: ['#17324A', '#49A9D4'], monogram: 'VI', symbol: 'antenna.radiowaves.left.and.right' },
      },
      {
        id: 'scifi-echo-protocol',
        title: 'Backup Vlad',
        subtitle: 'Hana Brooks',
        description: 'The city archives spawn a perfect copy of Vlad every midnight, and each version remembers a different betrayal.',
        views: '3.5K',
        likes: '203',
        cover: { colors: ['#203F5D', '#86D0E6'], monogram: 'BV', symbol: 'brain.head.profile' },
      },
    ],
  },
];

export const genreDetails: GenreDetail[] = genreDetailSeeds.map((genre) => ({
  ...genre,
  storyCount: genre.stories.length,
}));

export const genreDetailMap = Object.fromEntries(genreDetails.map((genre) => [genre.id, genre])) as Record<
  string,
  GenreDetail
>;
