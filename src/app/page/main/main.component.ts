import { Component, OnInit, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { ToolService, DialogData } from 'src/app/service/tool/tool.service';
import { Clean, DBClean } from 'src/app/interface/clean';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentChecked {
  @ViewChild('img') img: ElementRef;
  imgWidth = 947;
  constructor(
    public cleanService: CleanService,
    private toolService: ToolService,
    private snackBar: MatSnackBar,
  ) { }

  ngAfterContentChecked() {
  }

  ngOnInit() {

    this.cleanService.CleanMapGet().then((result) => {
      console.log(this.cleanService.mapAreaName);
    }).catch((err) => {

    });
    this.cleanService.routerName = '樹人環境評分系統';
    this.cleanService.CleanDataGetDB().subscribe(
      (v) => {
        console.log(v.data());
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
    if (this.cleanService.cleanDatasDB === undefined) {
      this.cleanService.CleanDataGetDB().subscribe(
        (v) => {
          this.cleanService.cleanDatasDB = v.data() as DBClean;
          console.log(this.cleanService.cleanDatasDB);
          this.CleanDataCheck();
        }
      );
    } else {
      const index = moment().isoWeekday();
      if (this.cleanService.cleanDatasDB.data[index] === undefined) {
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
      this.snackBar.open('上傳成功', '', { duration: 2000 });
      this.cleanService.CleanDataReset();
    }).catch((err) => {

    });
  }

  CleanDataKeep(cleanData: Clean) {
    const index = moment().isoWeekday();
    this.cleanService.cleanDatas[cleanData.area] = cleanData;
    this.cleanService.cleanDatasDB.data[index][cleanData.area] = null;
    this.cleanService.CleanDataCompare();
  }
}
