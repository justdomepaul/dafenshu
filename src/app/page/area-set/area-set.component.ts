import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-area-set-dialog',
  template: `
  <div mat-dialog-content>
    <p>修改區域名稱</p>
    <mat-form-field style="width: 100%;">
      <input matInput [(ngModel)]="data.animal" cdkFocusInitial>
    </mat-form-field>
  </div>
  <div mat-dialog-actions style="justify-content: space-between;">
    <button mat-button (click)="onNoClick()">取消</button>
    <button mat-raised-button color="primary" [mat-dialog-close]="data.animal">修改</button>
  </div>
  `,
})
export class AreaSetDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AreaSetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-area-set',
  templateUrl: './area-set.component.html',
  styleUrls: ['./area-set.component.scss']
})
export class AreaSetComponent implements OnInit {
  @ViewChild('img') img: ElementRef;
  imgWidth = 948;
  imgHight = 1280;
  constructor(
    public cleanService: CleanService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.cleanService.routerName = '區域管理';
  }

  onResize() {
    console.log('resize');
    const innerWidth = this.img.nativeElement.clientWidth;
    const scale = Math.round(innerWidth / this.imgWidth * 100) / 100;
    const newArea = [];
    this.cleanService.mapArea.forEach(area => {
      newArea.push({ coords: [area.coords[0] * scale, area.coords[1] * scale, 20 * scale] });
    });
    this.cleanService.mapAreaUse = newArea;
  }

  canvasPrint() {
    const canvas = document.createElement('canvas');
    canvas.width = this.imgWidth;
    canvas.height = this.imgHight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.img.nativeElement, 0, 0);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 50;
    ctx.lineCap = 'round';
    this.cleanService.mapArea.map(mapArea => {
      const x = mapArea.coords[0];
      const y = mapArea.coords[1];
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    });
    ctx.stroke();
    const dataURL = canvas.toDataURL('image/jpeg');
    this.img.nativeElement.src = dataURL;
  }

  openDialog(i: number): void {
    this.dialog.open(AreaSetDialogComponent, {
      width: '300px',
      data: this.cleanService.mapAreaUse,
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}


