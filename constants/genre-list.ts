import { genreDetails } from './genre-details';

export interface GenreListEntry {
  id: string;
  title: string;
  storyCount: number;
}

export const genreListEntries: GenreListEntry[] = genreDetails.map(({ id, title, storyCount }) => ({
  id,
  title,
  storyCount,
}));
