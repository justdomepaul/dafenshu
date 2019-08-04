import { Injectable } from '@angular/core';
import { Clean, MapArea, DBClean } from 'src/app/interface/clean';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToolService } from '../tool/tool.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CleanService {
  routerName = '';
  mapAreaName = [];
  mapAreaUse = [];
  cleanDatasDB: DBClean;
  cleanDatas: Clean[] = [];
  cleanDatasRELocal: Clean[] = [];
  cleanDatasREDB: Clean[] = [];
  cleanDataDemo: Clean = {
    area: 0,
    rate: 3,
    note: '',
    image: [],
  };
  monday = moment().startOf('isoWeek').format('YYYY-MM-DD週');
  mapArea: MapArea[] = [
    { coords: [208, 574, 20] },
    { coords: [787, 610, 20] },
    { coords: [694, 632, 20] },
    { coords: [400, 409, 20] },
    { coords: [487, 412, 20] },
    { coords: [632, 364, 20] },
    { coords: [576, 487, 20] },
    { coords: [706, 480, 20] },
    { coords: [871, 429, 20] },
    { coords: [777, 231, 20] },
    { coords: [633, 228, 20] },
    { coords: [390, 141, 20] },
    { coords: [358, 245, 20] },
    { coords: [296, 423, 20] },
    { coords: [184, 462, 20] },
    { coords: [407, 638, 20] },
    { coords: [207, 664, 20] },
    { coords: [384, 487, 20] },
    { coords: [561, 643, 20] },
    { coords: [559, 777, 20] },
    { coords: [324, 964, 20] },
    { coords: [189, 886, 20] },
    { coords: [121, 750, 20] },
    { coords: [97, 696, 20] },
    { coords: [84, 590, 20] },
    { coords: [123, 544, 20] },
    { coords: [122, 483, 20] },
    { coords: [79, 427, 20] },
    { coords: [84, 348, 20] },
    { coords: [103, 279, 20] },
    { coords: [102, 228, 20] },
    { coords: [169, 164, 20] },
  ];
  constructor(
    private db: AngularFirestore,
    private toolService: ToolService,
  ) {
    if (localStorage.getItem('mkdata') !== null) {
      this.cleanDatas = JSON.parse(localStorage.getItem('mkdata'));
    }
  }

  CleanDataGetDB() {
    console.log('CleanDataGetDB', this.monday);
    return this.db.collection('clean').doc(this.monday).get();
  }

  CleanDataAddWeek() {
    console.log('CleanDataAddWeek');
    return this.db.collection('clean').doc(this.monday).set({ data: {} });
  }

  CleanDataUploadDB() {
    const index = moment().isoWeekday();
    if (this.cleanDatasDB.data[index] === undefined) {
      this.cleanDatasDB.data[index] = this.cleanDatas;
    } else {
      this.cleanDatas.map(
        (cleanData, i) => {
          if (this.cleanDatasDB.data[index][i] === undefined) {
            this.cleanDatasDB.data[index][i] = null;
          }
          if (cleanData !== null) {
            this.cleanDatasDB.data[index][i] = cleanData;
          }
        }
      );
    }
    console.log('CleanDataUploadDB', this.cleanDatasDB);
    return this.db.collection('clean').doc(this.monday).set(this.cleanDatasDB);
  }

  CleanDataSave(data: Clean) {
    this.cleanDatas[data.area] = data;
    localStorage.setItem('mkdata', JSON.stringify(this.cleanDatas));
  }

  CleanDataReset() {
    this.cleanDatas = [];
    localStorage.removeItem('mkdata');
  }

  CleanDataGet(i: number): Clean {
    console.log('CleanDataGet', this.cleanDatas[i]);
    this.routerName = '第 ' + i + ' 打掃區域';
    if (this.cleanDatas[i] === undefined || this.cleanDatas[i] === null) {
      const cleanDataDemo: Clean = JSON.parse(JSON.stringify(this.cleanDataDemo));
      cleanDataDemo.area = i;
      return cleanDataDemo;
    }
    return JSON.parse(JSON.stringify(this.cleanDatas[i]));
  }

  CleanDataCompare() {
    this.cleanDatasREDB = [];
    this.cleanDatasRELocal = [];
    const index = moment().isoWeekday();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.cleanDatas.length; i++) {
      const element = this.cleanDatas[i];
      const elementDB = this.cleanDatasDB.data[index][i];
      if (element !== null && elementDB !== null) {
        if (elementDB !== undefined && element !== undefined) {
          this.cleanDatasREDB.push(elementDB);
          this.cleanDatasRELocal.push(element);
        }
      }
    }
  }

  CleanDatasImgur(): Promise<boolean[]> {
    const promiseArr = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.cleanDatas.length; i++) {
      if (this.cleanDatas[i] === null || this.cleanDatas[i] === undefined) {
        continue;
      }
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.cleanDatas[i].image.length; j++) {
        if (this.cleanDatas[i].image[j].length < 50) {
          // 已經轉好的跳過
          continue;
        }
        promiseArr.push(
          new Promise((resolve, reject) => {
            this.toolService.imgurImageUpload(this.cleanDatas[i].image[j]).subscribe(
              (v) => {
                console.log('v', v);
                this.cleanDatas[i].image[j] = v.data.link;
                resolve(true);
              },
              (e) => { console.log('e', e); reject(false); },
              () => { resolve(true); },
            );
          })
        );
      }
    }
    return Promise.all(promiseArr);
  }
}
