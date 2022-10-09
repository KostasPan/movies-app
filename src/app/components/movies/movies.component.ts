import { Component, Input } from '@angular/core';
import { SearchResults } from 'src/app/interfaces/search-results';
import { config as CONFIG } from 'src/utils/config'; 

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  @Input() data!:SearchResults;

  public MDB_IMG_BASE_URL:string = CONFIG.MOVIEDB_IMAGES

  constructor(
  ) {}
}
