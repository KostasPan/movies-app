import { Movie } from "./movie";

export interface Collection {
    title: string,
    description: string,
    movies: Array<Movie>
}
