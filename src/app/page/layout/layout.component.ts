import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/service/tool/tool.service';
import { CleanService } from 'src/app/service/clean/clean.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  constructor(
    public cleanService: CleanService
  ) { }

  ngOnInit() {
    this.cleanService.routerName = '';
  }

}
