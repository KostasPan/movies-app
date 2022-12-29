import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchTabComponent } from './components/search-tab/search-tab.component';
import { SearchComponent } from './pages/search/search.component';

import { CookieService } from 'ngx-cookie-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { NgChartsModule } from 'ng2-charts';

import { InputStrengthDirective } from './directives/search-tab-validation.directive';
import { MoviesComponent } from './components/movies/movies.component';
import { DialogEntryComponent } from './components/dialog-entry/dialog-entry.component';
import { DialogOverviewExampleDialogComponent } from './components/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { MoviesChartComponent } from './components/movies-chart/movies-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchTabComponent,
    SearchComponent,
    InputStrengthDirective,
    MoviesComponent,
    DialogEntryComponent,
    DialogOverviewExampleDialogComponent,
    MovieDetailsComponent,
    CollectionsComponent,
    CollectionsListComponent,
    CollectionComponent,
    MoviesChartComponent,
  ],
  imports: [
    MaterialExampleModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgChartsModule
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
