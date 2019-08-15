import { Component, OnInit } from '@angular/core';
import { CleanService } from './service/clean/clean.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'imagemap';

  constructor(
    private cleanService: CleanService,
  ) { }

  ngOnInit(): void {
    this.cleanService.CleanMapGet();
  }
}
