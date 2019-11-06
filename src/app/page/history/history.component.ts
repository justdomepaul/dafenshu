import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { HistoryData } from 'src/app/interface/clean';
import { ToolService } from 'src/app/service/tool/tool.service';

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
    private toolService: ToolService,
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
      let scoresA = 0;
      let scoresB = 0;
      let scoresC = 0;
      classArr.ownArea.forEach(ownArea => {
        this.cleanService.historyWeek[i].clean.forEach(day => {
          if (day[ownArea] === null || day[ownArea].rate === undefined) { return; }
          if (ownArea < this.cleanService.range[1]) {
            scoresA += Number(day[ownArea].rate);
          }
          if (ownArea > this.cleanService.range[1] && ownArea < this.cleanService.range[2]) {
            scoresB += Number(day[ownArea].rate);
          }
          if (ownArea > this.cleanService.range[2]) {
            scoresC += Number(day[ownArea].rate);
          }
        });
      });
      console.log(classArr.name, scoresA, scoresB, scoresC);
      const historyData: HistoryData = {
        name: classArr.name,
        scores: {
          scoresA,
          scoresB,
          scoresC,
        },
      };
      history.data.push(historyData);
    });
    this.db.collection('history').doc(week).set(history);
  }

  exportToCSV(i) {
    const fireName = this.cleanService.historyWeek[i].id;
    console.log(this.cleanService.historyWeek[i]);
    let csv = '班級,外掃區,廁所,內掃區\n';
    this.cleanService.historyWeek[i].historyDatas.forEach(
      (historyData) => {
        csv += historyData.name + ',';
        csv += historyData.scores.scoresA + ',';
        csv += historyData.scores.scoresB + ',';
        csv += historyData.scores.scoresC + '\n';
      },
    );
    this.toolService.exportToCSV(csv, fireName);
  }
}
