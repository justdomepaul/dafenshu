import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface MkQueryDocumentSnapshot extends QueryDocumentSnapshot<any> {
  fireData?: any;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
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
    this.historyWeek[i].fireData = this.historyWeek[i].data();
  }
}
