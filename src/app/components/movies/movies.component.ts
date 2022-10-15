import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { config as CONFIG } from 'src/utils/config'; 
import { Movie } from 'src/app/interfaces/movie';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Pagination } from 'src/app/interfaces/pagination';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  @Input() movies!:Array<Movie>
  @Input() pagination!:Pagination

  public MDB_IMG_BASE_URL:string = CONFIG.MOVIEDB_IMAGES

  constructor(
    public dialog: MatDialog
  ) {}

  openCollectionsDialog(movie:Movie): void {
    console.log("Movie = ", movie)
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '80%',
      data: { component: 'collections-list', movie: movie, addToCollection: true},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      console.log(result);
    });
  }

}
