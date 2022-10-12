import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialogComponent implements OnInit {
  animal: string = '';
  name: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    private dataService: DataService) {
      this.animal = dataService.animal;
      this.name = dataService.name;
    }

  onNoClick(): void {
    this.dataService.animal = '';
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dataService.animal = this.animal;
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
