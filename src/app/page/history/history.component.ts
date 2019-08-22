import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Clean } from 'src/app/interface/clean';

export interface MkQueryDocumentSnapshot extends QueryDocumentSnapshot<any> {
  fireData?: any;
  clean?: Clean[];
}


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  weekZh = [
    '',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日',
  ];
  historyWeek: MkQueryDocumentSnapshot[] = [];
  constructor(
    private cleanService: CleanService,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.cleanService.routerName = '評分紀錄';
    this.db.collection('clean').get().subscribe(
      (v) => {
        this.historyWeek = v.docs;
      },
    );
  }

  showData(i: number) {
    const data = this.historyWeek[i].data();
    this.historyWeek[i].fireData = data.data;
    this.historyWeek[i].clean = [];
    Object.keys(this.historyWeek[i].fireData).map((objectKey) => {
      const value = this.historyWeek[i].fireData[objectKey];
      this.historyWeek[i].clean[objectKey] = value;
    });
  }

  test(e) {
    console.log(e);
  }
}
