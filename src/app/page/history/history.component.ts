import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { AngularFirestore } from '@angular/fire/firestore';
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
          if (day[ownArea] === null || day[ownArea] === undefined || day[ownArea].rate === undefined) { return; }
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

  exportToCSV(i: number, level: string) {
    const fireName = this.cleanService.historyWeek[i].id;
    const weekLength = Object.keys(this.cleanService.historyWeek[i].fireData).length;
    console.log(this.cleanService.historyWeek[i]);
    let csv = '';
    if (level === 'high' || level === 'low') {
      csv = '班級,內掃區\n';
    }
    if (level === 'outer') {
      csv = '班級,外掃區\n';
    }
    this.cleanService.historyWeek[i].historyDatas.sort((a, b) => {
      if (level === 'high' || level === 'low') {
        return a.scores.scoresC < b.scores.scoresC ? 1 : -1;
      }
      if (level === 'outer') {
        return a.scores.scoresA + a.scores.scoresB < b.scores.scoresA + b.scores.scoresB ? 1 : -1;
      }
    });
    this.cleanService.historyWeek[i].historyDatas.forEach(
      (historyData) => {
        csv += historyData.name + ',';
        let score = 0;
        if (level === 'high') { if (Number(historyData.name.substr(0, 1)) <= 3) { return; } }
        if (level === 'low') { if (Number(historyData.name.substr(0, 1)) > 3) { return; } }
        if (level === 'outer') {
          score = 95 + ((historyData.scores.scoresA + historyData.scores.scoresB) / weekLength);
          csv += score + '\n';
          return;
        }
        score = 95 + (historyData.scores.scoresC / weekLength);
        csv += score + '\n';
      },
    );
    this.toolService.exportToCSV(csv, fireName);
  }
}
