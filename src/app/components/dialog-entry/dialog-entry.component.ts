import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';

@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html',
  styleUrls: ['./dialog-entry.component.css']
})
export class DialogEntryComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService) {
    this.openDialog('500ms', '500ms');
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.movieDetailsService.mid = this.route.snapshot.params['id'];
    console.log(this.movieDetailsService.mid);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.movieDetailsService.mid = 0;
    });
  }

  ngOnInit(): void {
    
  }

}
