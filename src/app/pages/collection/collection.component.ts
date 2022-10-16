import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/interfaces/collection';
import { Movie } from 'src/app/interfaces/movie';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { config as CONFIG } from 'src/utils/config';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  private collection_id!: number;
  movies!: Array<Movie>;

  constructor(
    private localStore: LocalStorageService,
    private route: ActivatedRoute,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.collection_id = Number(id);
    });

    if (this.collection_id) {
      let c = this.localStore.getData('collections');
      if (c) {
        const collections: Array<Collection> = JSON.parse(c);
        const i = collections.findIndex((el) => el.id == this.collection_id);
        this.movies = collections[i].movies;
      }
    }
  }

  onRemoveMovie(movieid: number) {
    console.log(`remove movie ${movieid} from collection`);
    console.log(this.movies);

    if (this.collection_id) {
      let c = this.localStore.getData('collections');
      if (c) {
        let collections: Array<Collection> = JSON.parse(c);
        const i = collections.findIndex((el) => el.id == this.collection_id);
        this.movies = collections[i].movies = this.movies.filter((el) => el.id !== movieid);

        this.localStore.saveData(CONFIG.COLLECTIONS_LS_NAME, JSON.stringify(collections));
        this.snackBar.openSnackBar('You successfully removed movie from collection', 'x');
      }
    }
  }
}
