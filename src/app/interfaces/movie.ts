export interface Movie {
  adult: boolean;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;

  budget: number;
  release_date: string;
  revenue: number;
  spoken_languages: Array<SpokenLanguages>;
}

interface SpokenLanguages {
  english_name: string;
}
