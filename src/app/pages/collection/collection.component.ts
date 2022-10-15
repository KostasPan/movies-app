import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/interfaces/collection';
import { Movie } from 'src/app/interfaces/movie';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  movies_results!:Array<Movie>
  collection_id!:number
  movies!:Array<Movie>

  constructor(private localStore: LocalStorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const id = params.get('id')
      this.collection_id = Number(id)
    });

    console.log(this.collection_id)

    if (this.collection_id) {
      let ls = this.localStore.getData('collections');
      if (ls) {
        const collections:Array<Collection> = JSON.parse(ls)
        const i = collections.findIndex(el => el.id == this.collection_id)
        this.movies = collections[i].movies
      } 
    }
    
  }

}
