import { Injectable } from '@angular/core';
import { Clean, MapArea, DBClean, ClassArea, MkQueryDocumentSnapshot } from 'src/app/interface/clean';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToolService } from '../tool/tool.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CleanService {
  imgSrc = {
    mapArea: 'assets/szmcmap.jpg',
    mapArea2: 'assets/szmcmap2.jpg',
    mapArea3: 'assets/szmcmap3.jpg',
  };
  routerName = '';
  mapAreaName = {};
  mapAreaUse = [];
  mapAreaUse2 = [];
  mapAreaUse3 = [];
  cleanDatasDB: DBClean;
  cleanDatas: Clean[] = [];
  cleanDatasRELocal: Clean[] = [];
  cleanDatasREDB: Clean[] = [];
  classArr: ClassArea[] = [];
  historyWeek: MkQueryDocumentSnapshot[] = [];
  historyTable;
  cleanDataDemo: Clean = {
    area: 0,
    rate: 0,
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

  mapArea2: MapArea[] = [
    { coords: [340, 133] },
    { coords: [341, 201] },
    { coords: [346, 262] },
    { coords: [345, 318] },
    { coords: [350, 391] },
    { coords: [347, 457] },
    { coords: [347, 523] },
    { coords: [380, 667] },
    { coords: [382, 739] },
    { coords: [382, 810] },
    { coords: [377, 953] },
    { coords: [381, 1041] },
    { coords: [606, 86] },
    { coords: [611, 153] },
    { coords: [615, 222] },
    { coords: [618, 280] },
    { coords: [616, 348] },
    { coords: [619, 408] },
    { coords: [838, 664] },
    { coords: [834, 743] },
    { coords: [844, 812] },
    { coords: [838, 954] },
    { coords: [842, 1024] },
    { coords: [898, 130] },
    { coords: [893, 199] },
    { coords: [895, 264] },
    { coords: [899, 327] },
    { coords: [897, 399] },
    { coords: [899, 461] },
    { coords: [1205, 609] },
    { coords: [1211, 677] },
    { coords: [1212, 738] },
    { coords: [1208, 805] },
    { coords: [1209, 870] },
    { coords: [1207, 932] },
    { coords: [1201, 1056] },
    { coords: [1431, 242] },
    { coords: [1434, 301] },
    { coords: [1433, 372] },
    { coords: [1437, 436] },
    { coords: [1440, 510] },
    { coords: [1439, 567] },
  ];

  mapArea3: MapArea[] = [
    { coords: [97, 110, 20] },
    { coords: [96, 199, 20] },
    { coords: [178, 167, 20] },
    { coords: [180, 199, 20] },
    { coords: [181, 222, 20] },
    { coords: [263, 81, 20] },
    { coords: [267, 111, 20] },
    { coords: [264, 226, 20] },
    { coords: [268, 256, 20] },
    { coords: [348, 80, 20] },
    { coords: [344, 107, 20] },
    { coords: [342, 132, 20] },
    { coords: [347, 170, 20] },
    { coords: [345, 198, 20] },
    { coords: [349, 229, 20] },
    { coords: [346, 255, 20] },
    { coords: [430, 169, 20] },
    { coords: [433, 198, 20] },
    { coords: [434, 227, 20] },
    { coords: [433, 254, 20] },
    { coords: [519, 82, 20] },
    { coords: [517, 110, 20] },
    { coords: [516, 142, 20] },
    { coords: [517, 169, 20] },
    { coords: [516, 200, 20] },
    { coords: [518, 227, 20] },
    { coords: [517, 255, 20] },
    { coords: [598, 138, 20] },
    { coords: [601, 226, 20] },
    { coords: [600, 254, 20] },
    { coords: [767, 167, 20] },
    { coords: [767, 197, 20] },
    { coords: [764, 225, 20] },
    { coords: [850, 81, 20] },
    { coords: [846, 113, 20] },
    { coords: [845, 140, 20] },
    { coords: [850, 169, 20] },
    { coords: [850, 197, 20] },
    { coords: [851, 227, 20] },
    { coords: [851, 256, 20] },
    { coords: [96, 341, 20] },
    { coords: [96, 372, 20] },
    { coords: [99, 399, 20] },
    { coords: [178, 343, 20] },
    { coords: [181, 372, 20] },
    { coords: [181, 401, 20] },
    { coords: [265, 343, 20] },
    { coords: [267, 373, 20] },
    { coords: [267, 402, 20] },
    { coords: [348, 342, 20] },
    { coords: [348, 374, 20] },
    { coords: [349, 400, 20] },
    { coords: [432, 372, 20] },
    { coords: [434, 400, 20] },
    { coords: [519, 342, 20] },
    { coords: [518, 372, 20] },
    { coords: [516, 398, 20] },
    { coords: [605, 344, 20] },
    { coords: [601, 372, 20] },
    { coords: [602, 400, 20] },
    { coords: [682, 340, 20] },
    { coords: [680, 372, 20] },
    { coords: [681, 399, 20] },
    { coords: [94, 515, 20] },
    { coords: [96, 546, 20] },
    { coords: [96, 576, 20] },
    { coords: [96, 605, 20] },
    { coords: [94, 632, 20] },
    { coords: [180, 515, 20] },
    { coords: [181, 544, 20] },
    { coords: [183, 576, 20] },
    { coords: [182, 603, 20] },
    { coords: [180, 632, 20] },
    { coords: [265, 517, 20] },
    { coords: [266, 546, 20] },
    { coords: [267, 576, 20] },
    { coords: [265, 603, 20] },
    { coords: [265, 633, 20] },
    { coords: [347, 517, 20] },
    { coords: [349, 545, 20] },
    { coords: [350, 574, 20] },
    { coords: [348, 604, 20] },
    { coords: [349, 633, 20] },
    { coords: [432, 514, 20] },
    { coords: [435, 544, 20] },
    { coords: [517, 515, 20] },
    { coords: [519, 545, 20] },
    { coords: [95, 776, 20] },
    { coords: [95, 806, 20] },
    { coords: [98, 834, 20] },
    { coords: [182, 806, 20] },
    { coords: [179, 833, 20] },
    { coords: [264, 776, 20] },
    { coords: [266, 805, 20] },
    { coords: [265, 837, 20] },
    { coords: [349, 748, 20] },
    { coords: [351, 778, 20] },
    { coords: [350, 805, 20] },
    { coords: [353, 837, 20] },
    { coords: [434, 777, 20] },
    { coords: [437, 803, 20] },
    { coords: [434, 835, 20] },
    { coords: [519, 746, 20] },
    { coords: [519, 780, 20] },
    { coords: [517, 806, 20] },
    { coords: [516, 836, 20] },
    { coords: [604, 749, 20] },
    { coords: [606, 776, 20] },
    { coords: [604, 810, 20] },
    { coords: [605, 834, 20] },
    { coords: [682, 748, 20] },
    { coords: [683, 777, 20] },
    { coords: [682, 805, 20] },
    { coords: [684, 834, 20] },
    { coords: [767, 747, 20] },
    { coords: [766, 777, 20] },
    { coords: [768, 808, 20] },
    { coords: [765, 835, 20] },
    { coords: [847, 747, 20] },
    { coords: [848, 781, 20] },
    { coords: [850, 805, 20] },
    { coords: [850, 837, 20] },
    { coords: [643, 516, 20] },
    { coords: [642, 547, 20] },
    { coords: [643, 576, 20] },
    { coords: [643, 605, 20] },
    { coords: [639, 634, 20] },
    { coords: [726, 519, 20] },
    { coords: [726, 548, 20] },
    { coords: [724, 576, 20] },
    { coords: [724, 603, 20] },
    { coords: [724, 633, 20] },
  ];

  range = [
    0,
    this.mapArea.length,
    this.mapArea.length + this.mapArea2.length,
    this.mapArea.length + this.mapArea2.length + this.mapArea3.length,
  ];

  mapAreaAll: MapArea[];
  constructor(
    private db: AngularFirestore,
    private toolService: ToolService,
  ) {
    this.mapAreaAll = this.mapArea.concat(this.mapArea2, this.mapArea3);
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
    // this.cleanDatas = JSON.parse(localStorage.getItem('mkdata'));
    const index = moment().isoWeekday();
    // 該周空 直接上傳
    if (this.cleanDatasDB.data[index] === undefined) {
      this.cleanDatasDB.data[index] = this.cleanDatas;
    } else {
      // 該周有資料 要對比一下
      for (let i = 0; i < this.cleanDatas.length; i++) {
        const cleanData = this.cleanDatas[i];
        if (this.cleanDatasDB.data[index][i] === undefined) {
          this.cleanDatasDB.data[index][i] = null;
        }
        if (cleanData !== null) {
          this.cleanDatasDB.data[index][i] = cleanData;
        }
      }
    }
    const batch = this.db.firestore.batch();
    const ref = this.db.collection('clean').doc(this.monday).ref;
    const cleanDatasDB = JSON.parse(JSON.stringify(this.cleanDatasDB));
    batch.set(ref, cleanDatasDB);
    return batch.commit();
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
            console.log('this.cleanDatas[i]1', this.cleanDatas[i]);
            this.toolService.imgurImageUpload(this.cleanDatas[i].image[j]).subscribe(
              (v) => {
                console.log('v', v);
                console.log('this.cleanDatas[i]', this.cleanDatas[i]);
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

  CleanMapGet(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (JSON.stringify(this.mapAreaName !== '{}')) {
        resolve();
      }
      this.db.collection('cleanMap').doc('map01').get().subscribe(
        (v) => {
          const data: any = v.data();
          if (JSON.stringify(data) !== '{}') {
            this.mapAreaName = data.data;
          }
          resolve();
        }
      );
    });
  }

  CleanMapSet() {
    this.db.collection('cleanMap').doc('map01').set({ data: this.mapAreaName });
  }

  CleanClassGet() {
    this.db.collection('class').doc('樹人醫護管理專科學校').valueChanges().subscribe(
      (v: any) => {
        console.log('CleanClassGet 班級');
        this.classArr = v.data;
      },
      (e) => { console.log('e', e); },
    );
  }

  CleanHistoryWeekGet(): Promise<boolean> {
    return new Promise((resolve) => {
      this.db.collection('clean').get().subscribe(
        (v) => {
          this.historyWeek = v.docs;
          this.historyWeek.reverse();
          resolve(true);
        },
      );
    });
  }

  CleanHistoryGet(i: number) {
    const theWeek = this.historyWeek[i].id;
    this.db.collection('history').doc(theWeek).valueChanges().subscribe(
      (v: any) => {
        if (v !== undefined) {
          const data = v.data;
          this.historyWeek[i].historyDatas = data;
        }
      },
    );
  }

  ClassNameGetById(id: number): string {
    let className = '';
    this.classArr.forEach(item => {
      if (item.ownArea.indexOf(id) !== -1) {
        className = item.name;
        return className;
      }
    });
    return className;
  }

  showData(i: number) {
    const data = this.historyWeek[i].data();
    this.historyWeek[i].fireData = data.data;
    this.historyWeek[i].clean = [];
    this.CleanHistoryGet(i);
    Object.keys(this.historyWeek[i].fireData).map((objectKey) => {
      const value = this.historyWeek[i].fireData[objectKey];
      this.historyWeek[i].clean[objectKey] = value;
    });
  }
}
