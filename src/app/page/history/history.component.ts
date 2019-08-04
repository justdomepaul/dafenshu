import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(
    private cleanService: CleanService,
  ) { }

  ngOnInit() {
    this.cleanService.routerName = '評分紀錄';
  }

}
