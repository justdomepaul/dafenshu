import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { HistoryData } from 'src/app/interface/clean';

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

  constructor(
    public cleanService: CleanService,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.cleanService.routerName = '評分紀錄';
    this.cleanService.CleanHistoryWeekGet();
  }

  showData(i: number) {
    const data = this.cleanService.historyWeek[i].data();
    this.cleanService.historyWeek[i].fireData = data.data;
    this.cleanService.historyWeek[i].clean = [];
    this.cleanService.CleanHistoryGet(i);
    Object.keys(this.cleanService.historyWeek[i].fireData).map((objectKey) => {
      const value = this.cleanService.historyWeek[i].fireData[objectKey];
      this.cleanService.historyWeek[i].clean[objectKey] = value;
    });
  }

  test(i: number) {
    const week = this.cleanService.historyWeek[i].id;
    const history = { data: [] };
    console.log(this.cleanService.historyWeek[i].clean);
    console.log(this.cleanService.classArr);
    this.cleanService.classArr.forEach(classArr => {
      let scores = 0;
      classArr.ownArea.forEach(ownArea => {
        this.cleanService.historyWeek[i].clean.forEach(day => {
          if (day[ownArea] === null) { return; }
          scores += Number(day[ownArea].rate);
        });
      });
      console.log(classArr.name, scores);
      const historyData: HistoryData = {
        name: classArr.name,
        // tslint:disable-next-line: object-literal-shorthand
        scores: scores,
      };
      history.data.push(historyData);
    });
    this.db.collection('history').doc(week).set(history);
  }
}
