import { Movie } from './movie';

export interface Collection {
  id: number;
  title: string;
  description: string;
  movies: Array<Movie>;
}
