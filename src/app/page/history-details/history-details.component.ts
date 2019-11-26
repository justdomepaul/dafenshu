import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent implements OnInit {
  weeki: number;
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
    private route: ActivatedRoute,
    public cleanService: CleanService,
  ) { }

  ngOnInit() {
    const week = this.route.snapshot.params.week;
    this.cleanService.routerName = week + '扣分狀況';
    this.cleanService.CleanHistoryWeekGet().then((result) => {
      this.cleanService.historyWeek.forEach(
        (historyWeek, i) => {
          if (historyWeek.id === week) {
            this.weeki = i;
            this.cleanService.showData(i);
            return;
          }
        },
      );
    }).catch((err) => {

    });

  }

}
