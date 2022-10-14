import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogEntryComponent } from './components/dialog-entry/dialog-entry.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { 
    path:'search', 
    component: SearchComponent,
    children: [
      {
        path: 'movie/:id',
        component: DialogEntryComponent
      }
    ]
  },
  { 
    path:'collections', 
    component: CollectionsComponent,
  },
  { 
    path:'collection/:id', 
    component: CollectionComponent,
  },
  { path: '**', pathMatch:'full',  redirectTo: 'search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
