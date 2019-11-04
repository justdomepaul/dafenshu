import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent implements OnInit {
  historyWeek;
  constructor(
    private route: ActivatedRoute,
    public cleanService: CleanService,
  ) { }

  ngOnInit() {
    const week = this.route.snapshot.params.week;
    this.cleanService.historyWeek.forEach(
      (historyWeek) => {
        console.log('historyWeek.id ', historyWeek.id);
        if (historyWeek.id === week) {
          this.historyWeek = historyWeek.data();
          return;
        }
      },
    );
  }

}
