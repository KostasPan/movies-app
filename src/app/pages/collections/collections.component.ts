import { Component } from '@angular/core';
import { Collection } from 'src/app/interfaces/collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent {
  collection!: Collection;

  title: string = '';
  description: string = '';

  isFormOpen: boolean = false;

  constructor() {}

  newCollectionData() {
    if (this.title && this.description) {
      this.collection = { title: this.title, description: this.description, id: new Date().getTime(), movies: [] };
    }
  }
}
