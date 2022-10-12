import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogEntryComponent } from './components/dialog-entry/dialog-entry.component';
import { DialogOverviewExampleComponent } from './components/dialog-overview-example/dialog-overview-example.component';
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
    path: 'home',
    component: DialogOverviewExampleComponent,
    children: [
      {
        path: 'dialog',
        component: DialogEntryComponent
      }
    ]
  },
  { path: '**', pathMatch:'full',  redirectTo: 'search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
