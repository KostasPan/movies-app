import { Component } from '@angular/core';
import { SearchResults } from 'src/app/interfaces/search-results';
import { SearchService } from 'src/app/services/search.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  private query:string = ''
  
  public results!:SearchResults

  constructor(
    private searchService:SearchService,
    private snackBarService:SnackbarService 
  ) {}

  onMovieQueryInput(query:string) {
    this.query = query
    console.log('query: ', this.query)

    this.searchService.getMovies(query, 1).subscribe({
      next: response => {
        this.results = response
        console.log('results: ', this.results)
      },
      error: e => {
        this.snackBarService.openSnackBar('Error occurred, try again later.', 'x')
        console.error(e)
      }
    })
  }  
}
