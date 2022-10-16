import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { config as CONFIG } from 'src/utils/config';
import { Movie } from 'src/app/interfaces/movie';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Pagination } from 'src/app/interfaces/pagination';
import { PageEvent } from '@angular/material/paginator';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  @Input() movies!: Array<Movie>;
  @Input() pagination!: Pagination;
  @Input() isAddBtnShown!: boolean;
  @Input() isRemoveBtnShown!: boolean;

  @Output() pageChangeEvent = new EventEmitter<number>();
  @Output() removeMovieEvent = new EventEmitter<number>();

  public MDB_IMG_BASE_URL: string = CONFIG.MOVIEDB_IMAGES;

  constructor(public dialog: MatDialog, private localStore: LocalStorageService, private snackBar: SnackbarService) {}

  handleChangePageEvent(event: PageEvent) {
    this.pageChangeEvent.emit(event.pageIndex);
  }

  openCollectionsDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: {
        component: 'collections-list',
        movie: movie,
        addToCollection: true,
      },
    });
  }

  removeFromCollection(movieid: number) {
    this.removeMovieEvent.emit(movieid);
  }
}
