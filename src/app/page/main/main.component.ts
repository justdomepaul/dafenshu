import { Component, OnInit, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { ToolService, DialogData } from 'src/app/service/tool/tool.service';
import { Clean, DBClean } from 'src/app/interface/clean';
import { MatSnackBar, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { AreaSetDialogComponent } from '../area-set/area-set.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentChecked {
  tabIndex = 0;
  @ViewChild('img') img: ElementRef;
  @ViewChild('img2') img2: ElementRef;
  imgWidth = 948;
  imgWidth2 = 1500;

  range = [
    0,
    this.cleanService.mapArea.length,
    this.cleanService.mapArea2.length,
  ];
  constructor(
    public cleanService: CleanService,
    private toolService: ToolService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngAfterContentChecked() {
    // this.onResize();
  }

  ngOnInit() {
    this.tabIndex = Number(this.route.snapshot.queryParams.tabIndex) || 0;
    console.log('tabIndex', this.tabIndex);
    this.cleanService.CleanMapGet();
    this.cleanService.routerName = '樹人環境評分系統';
    this.cleanService.CleanDataGetDB().subscribe(
      (v) => {
        console.log('CleanDataGetDB', v.data());
        this.cleanService.cleanDatasDB = v.data() as DBClean;
        if (v.data() === undefined) {
          this.cleanService.CleanDataAddWeek().then((result) => {
            this.ngOnInit();
          }).catch((err) => {

          });
        }
      }
    );
  }

  tabChang(index) {
    this.tabIndex = index;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.onResize();
      }, i * 200);
    }
  }

  onResize() {
    const innerWidth = this.img.nativeElement.clientWidth;
    const innerWidth2 = this.img2.nativeElement.clientWidth;
    const scale = Math.round(innerWidth / this.imgWidth * 100) / 100;
    const scale2 = Math.round(innerWidth2 / this.imgWidth2 * 100) / 100;
    const newArea = [];
    console.log(this.cleanService.mapArea);
    this.cleanService.mapArea.forEach(area => {
      newArea.push({ coords: [area.coords[0] * scale, area.coords[1] * scale, 20 * scale] });
    });
    this.cleanService.mapAreaUse = newArea;
    const newArea2 = [];
    this.cleanService.mapArea2.forEach(area => {
      newArea2.push({ coords: [area.coords[0] * scale2, area.coords[1] * scale2, 30 * scale2] });
    });
    this.cleanService.mapAreaUse2 = newArea2;
  }

  CleanDataDelete(i: number) {
    const dialogData: DialogData = {
      title: this.cleanService.cleanDatas[i].area + '',
      content: '確定這筆資料刪除嗎？',
      yes: '是',
      no: '否',
    };
    this.toolService.openDialog(dialogData).subscribe(
      (result: boolean) => {
        if (result === true) {
          this.cleanService.cleanDatas[i] = null;
        }
      },
    );
  }

  CleanDataUpload() {
    const cleanDatas: Clean[] = [];
    this.cleanService.cleanDatas.map(
      (cleanData) => {
        if (cleanData !== null) {
          cleanDatas.push(cleanData);
        }
      }
    );
    console.log('cleanDatas', cleanDatas);
    const dialogData: DialogData = {
      title: '系統' + this.cleanService.monday,
      content: '確定上傳' + cleanDatas.length + '筆資料嗎？',
      yes: '是',
      no: '否',
    };
    this.toolService.openDialog(dialogData).subscribe(
      (result: boolean) => {
        if (result === true) {
          this.cleanService.CleanDatasImgur().then((promise) => {
            this.CleanDataCheck();
          }).catch((err) => {

          });
        }
      },
    );
  }

  CleanDataCheck() {
    const index = moment().isoWeekday();
    // 取得資料確保不會被強置蓋過去
    if (this.cleanService.cleanDatasDB === undefined) {
      this.cleanService.CleanDataGetDB().subscribe(
        (v) => {
          this.cleanService.cleanDatasDB = v.data() as DBClean;
          console.log(this.cleanService.cleanDatasDB);
          this.CleanDataCheck();
        }
      );
    } else {
      if (this.cleanService.cleanDatasDB.data === undefined || this.cleanService.cleanDatasDB.data[index] === undefined) {
        this.CleanDataUploadDB();
      } else {
        this.cleanService.CleanDataCompare();
        if (this.cleanService.cleanDatasREDB.length === 0) {
          this.CleanDataUploadDB();
        }
        console.log('衝突資料', this.cleanService.cleanDatasREDB);
      }
    }
  }

  CleanDataUploadDB() {
    this.cleanService.CleanDataUploadDB().then((res) => {
      console.log('CleanDataUploadDB then', res);
      this.snackBar.open('上傳成功', '', { duration: 2000 });
      this.cleanService.CleanDataReset();
    }).catch((err) => {
      console.log('CleanDataUploadDB err', err);
    });
  }

  CleanDataKeep(cleanData: Clean) {
    const index = moment().isoWeekday();
    this.cleanService.cleanDatas[cleanData.area] = cleanData;
    this.cleanService.cleanDatasDB.data[index][cleanData.area] = null;
    this.cleanService.CleanDataCompare();
  }

  openDialog(i: number): void {
    this.dialog.open(AreaSetDialogComponent, {
      width: '300px',
      data: i,
    }).afterClosed().subscribe(result => {
      console.log(result);
      this.cleanService.CleanMapSet();
    });
  }
}
