import { Injectable } from '@angular/core';
import { Clean, MapArea, DBClean, ClassArea, MkQueryDocumentSnapshot } from 'src/app/interface/clean';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToolService } from '../tool/tool.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CleanService {
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
    { coords: [57, 110, 20] },
    { coords: [56, 199, 20] },
    { coords: [138, 167, 20] },
    { coords: [140, 199, 20] },
    { coords: [141, 222, 20] },
    { coords: [223, 81, 20] },
    { coords: [227, 111, 20] },
    { coords: [224, 226, 20] },
    { coords: [228, 256, 20] },
    { coords: [263, 112, 20] },
    { coords: [308, 80, 20] },
    { coords: [304, 107, 20] },
    { coords: [302, 132, 20] },
    { coords: [307, 170, 20] },
    { coords: [305, 198, 20] },
    { coords: [309, 229, 20] },
    { coords: [306, 255, 20] },
    { coords: [390, 169, 20] },
    { coords: [393, 198, 20] },
    { coords: [394, 227, 20] },
    { coords: [393, 254, 20] },
    { coords: [479, 82, 20] },
    { coords: [477, 110, 20] },
    { coords: [476, 142, 20] },
    { coords: [477, 169, 20] },
    { coords: [476, 200, 20] },
    { coords: [478, 227, 20] },
    { coords: [477, 255, 20] },
    { coords: [558, 138, 20] },
    { coords: [561, 226, 20] },
    { coords: [560, 254, 20] },
    { coords: [600, 137, 20] },
    { coords: [727, 167, 20] },
    { coords: [727, 197, 20] },
    { coords: [724, 225, 20] },
    { coords: [810, 81, 20] },
    { coords: [806, 113, 20] },
    { coords: [805, 140, 20] },
    { coords: [810, 169, 20] },
    { coords: [810, 197, 20] },
    { coords: [811, 227, 20] },
    { coords: [811, 256, 20] },
    { coords: [56, 341, 20] },
    { coords: [56, 372, 20] },
    { coords: [59, 399, 20] },
    { coords: [138, 343, 20] },
    { coords: [141, 372, 20] },
    { coords: [141, 401, 20] },
    { coords: [225, 343, 20] },
    { coords: [227, 373, 20] },
    { coords: [227, 402, 20] },
    { coords: [308, 342, 20] },
    { coords: [308, 374, 20] },
    { coords: [309, 400, 20] },
    { coords: [351, 344, 20] },
    { coords: [392, 372, 20] },
    { coords: [394, 400, 20] },
    { coords: [479, 342, 20] },
    { coords: [478, 372, 20] },
    { coords: [476, 398, 20] },
    { coords: [565, 344, 20] },
    { coords: [561, 372, 20] },
    { coords: [562, 400, 20] },
    { coords: [642, 340, 20] },
    { coords: [640, 372, 20] },
    { coords: [641, 399, 20] },
    { coords: [54, 515, 20] },
    { coords: [56, 546, 20] },
    { coords: [56, 576, 20] },
    { coords: [56, 605, 20] },
    { coords: [54, 632, 20] },
    { coords: [140, 515, 20] },
    { coords: [141, 544, 20] },
    { coords: [143, 576, 20] },
    { coords: [142, 603, 20] },
    { coords: [140, 632, 20] },
    { coords: [182, 572, 20] },
    { coords: [183, 602, 20] },
    { coords: [225, 517, 20] },
    { coords: [226, 546, 20] },
    { coords: [227, 576, 20] },
    { coords: [225, 603, 20] },
    { coords: [225, 633, 20] },
    { coords: [265, 632, 20] },
    { coords: [307, 517, 20] },
    { coords: [309, 545, 20] },
    { coords: [310, 574, 20] },
    { coords: [308, 604, 20] },
    { coords: [309, 633, 20] },
    { coords: [392, 514, 20] },
    { coords: [395, 544, 20] },
    { coords: [477, 515, 20] },
    { coords: [479, 545, 20] },
    { coords: [522, 542, 20] },
    { coords: [55, 776, 20] },
    { coords: [55, 806, 20] },
    { coords: [58, 834, 20] },
    { coords: [142, 806, 20] },
    { coords: [139, 833, 20] },
    { coords: [224, 776, 20] },
    { coords: [226, 805, 20] },
    { coords: [225, 837, 20] },
    { coords: [309, 748, 20] },
    { coords: [311, 778, 20] },
    { coords: [310, 805, 20] },
    { coords: [313, 837, 20] },
    { coords: [394, 777, 20] },
    { coords: [397, 803, 20] },
    { coords: [394, 835, 20] },
    { coords: [479, 746, 20] },
    { coords: [479, 780, 20] },
    { coords: [477, 806, 20] },
    { coords: [476, 836, 20] },
    { coords: [564, 749, 20] },
    { coords: [566, 776, 20] },
    { coords: [564, 810, 20] },
    { coords: [565, 834, 20] },
    { coords: [600, 805, 20] },
    { coords: [604, 837, 20] },
    { coords: [642, 748, 20] },
    { coords: [643, 777, 20] },
    { coords: [642, 805, 20] },
    { coords: [644, 834, 20] },
    { coords: [727, 747, 20] },
    { coords: [726, 777, 20] },
    { coords: [728, 808, 20] },
    { coords: [725, 835, 20] },
    { coords: [807, 747, 20] },
    { coords: [808, 781, 20] },
    { coords: [810, 805, 20] },
    { coords: [810, 837, 20] },
    { coords: [603, 516, 20] },
    { coords: [602, 547, 20] },
    { coords: [603, 576, 20] },
    { coords: [603, 605, 20] },
    { coords: [599, 634, 20] },
    { coords: [686, 519, 20] },
    { coords: [686, 548, 20] },
    { coords: [684, 576, 20] },
    { coords: [684, 603, 20] },
    { coords: [684, 633, 20] },
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
    this.cleanDatas = JSON.parse(localStorage.getItem('mkdata'));
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
    console.log('CleanDataUploadDB2', this.cleanDatasDB);
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

  CleanHistoryWeekGet() {
    this.db.collection('clean').get().subscribe(
      (v) => {
        this.historyWeek = v.docs;
      },
    );
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
}
