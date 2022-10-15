import { Component } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { Pagination } from 'src/app/interfaces/pagination';
import { SearchService } from 'src/app/services/search.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  private query:string = ''
  
  public movies_results!:Array<Movie>
  public pagination_results!:Pagination

  constructor(
    private searchService:SearchService,
    private snackBarService:SnackbarService 
  ) {}

  onMovieQueryInput(query:string) {
    this.query = query
    console.log('query: ', this.query)

    this.searchService.getMovies(query, 1).subscribe({
      next: response => {
        this.movies_results = response.results
        const {movies, ...pagination } = response
        this.pagination_results = pagination
      },
      error: e => {
        this.snackBarService.openSnackBar('Error occurred, try again later.', 'x')
        console.error(e)
      }
    })
  }  
}
