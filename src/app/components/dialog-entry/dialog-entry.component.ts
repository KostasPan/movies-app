import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html',
  styleUrls: ['./dialog-entry.component.css'],
})
export class DialogEntryComponent implements OnInit {
  private routeConfig!: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
    private location: Location
  ) {
    this.openDialog();
  }
  openDialog(): void {
    let currentRoute = this.router.routerState.root;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    this.routeConfig = currentRoute.routeConfig;

    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: { component: 'movie-details', routeConfig: this.routeConfig },
    });

    this.movieDetailsService.mid = this.route.snapshot.params['id'];

    dialogRef.afterClosed().subscribe((result) => {
      this.location.back();
      this.movieDetailsService.mid = 0;
    });
  }

  ngOnInit(): void {}
}
