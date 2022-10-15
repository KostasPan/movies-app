import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Collection } from 'src/app/interfaces/collection';
import { Movie } from 'src/app/interfaces/movie';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

import { config as CONFIG } from '../../../utils/config';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.css'],
})
export class CollectionsListComponent implements OnInit, OnChanges {
  collections: Array<Collection> = [];

  @Input() data!: any;
  @Input() newCollection!: Collection;

  constructor(private localStore: LocalStorageService, private snackBar: SnackbarService, private router: Router,) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.newCollection);
    if (changes['newCollection']?.currentValue) {
      this.addNewCollection(this.newCollection);
    }
  }

  addNewCollection(collection: Collection) {
    this.collections.push(collection);
    this.localStore.saveData(
      CONFIG.COLLECTIONS_LS_NAME,
      JSON.stringify(this.collections)
    );
  }

  goToCollection(id: number, movies: Array<Movie>) {
    // route to collection page with movies
    console.log('GO to collection', id);
    console.log('Movies', movies);

    this.router.navigate(['/collection', id]);
  }

  addMovieToCollection(id: number, movies: Array<Movie>) {
    // route to collection page with movies
    console.log('ADD to collection', id, movies);

    let cindex:number = this.collections.findIndex(el => el.id == id)
    let mid:number = this.collections[cindex].movies.findIndex(el => el.id == this.data.movie.id)

    console.log(mid)

    if (mid >= 0) {
      this.snackBar.openSnackBar('You have already added this movie to collection', 'x')
    } else {
      movies.push(this.data.movie)
      this.collections[cindex].movies = movies
      this.localStore.saveData(
        CONFIG.COLLECTIONS_LS_NAME,
        JSON.stringify(this.collections)
      );
      this.snackBar.openSnackBar('You successfully added movie to collection', 'x')
    }

    // TODO: close dialog
  }

  ngOnInit(): void {
    console.log('collection-list data: ', this.data);
    let ls = this.localStore.getData('collections');
    if (ls) this.collections = JSON.parse(ls);
    // console.log('[{"id":0,"title":"Collection0","description":"description0","movies":[{"id":456,"title":"Movie456","vote_count":6,"vote_average":4.5},{"id":12,"title":"Movie12","vote_count":7894,"vote_average":5},{"id":9,"title":"Movie9","vote_count":8990,"vote_average":10}]},{"id":1,"title":"movie1","description":"description1","movies":[{"id":77,"title":"Movie77","vote_count":7,"vote_average":7.7}]},{"id":2,"title":"movie2","description":"description2","movies":[]}]')
  }
}
