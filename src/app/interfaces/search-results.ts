import { Movie } from "./movie";

export interface SearchResults {
    page: number,
    results: Array<Movie>,
    total_pages: number,
    total_results:  number
}
