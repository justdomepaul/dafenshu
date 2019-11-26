import { Component, OnInit } from '@angular/core';
import { CleanService } from './service/clean/clean.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dafenshu';

  constructor(
    private cleanService: CleanService,
  ) { }

  ngOnInit(): void {
    this.cleanService.CleanMapGet();
    this.cleanService.CleanClassGet();
    this.cleanService.CleanHistoryWeekGet();
  }
}
