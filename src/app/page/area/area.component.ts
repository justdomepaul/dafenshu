import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from 'src/app/service/tool/tool.service';
import { Clean } from 'src/app/interface/clean';
import { CleanService } from 'src/app/service/clean/clean.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { AreaSetDialogComponent } from '../area-set/area-set.component';
declare let window: any;
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  area = '';
  cleanData: Clean;
  itemDoc: AngularFirestoreDocument;
  tabIndex: number;
  constructor(
    private route: ActivatedRoute,
    private toolService: ToolService,
    public cleanService: CleanService,
    private db: AngularFirestore,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.tabIndex = this.route.snapshot.queryParams.tabIndex;
    this.route.params.subscribe(
      (v) => {
        this.cleanData = this.cleanService.CleanDataGet(Number(v.area));
        let routerName = this.cleanService.mapAreaName[v.area];
        if (routerName !== '' && routerName !== undefined) {

        } else {
          routerName = '尚未命名';
        }
        this.cleanService.routerName = routerName;
      },
      (e) => { console.log(e); },
    );
  }

  update(data) {
    const id = data.id;
    delete data.id;
    this.db.doc('item/' + id).update(data);
  }

  Save() {
    this.cleanService.CleanDataSave(this.cleanData);
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/'], { queryParams: { tabIndex: this.tabIndex } });
    // window.history.back();
  }

  previewImage(event: any, i: number = 0) {
    const sourceImage = event.srcElement.files[0];
    if (sourceImage !== undefined) {
      this.toolService.convertFile(sourceImage).then((result: string) => {
        this.cleanData.image[i] = result;
      }).catch((err) => {

      });
    }
  }

  openDialog(i: number): void {
    this.dialog.open(AreaSetDialogComponent, {
      width: '300px',
      data: i,
    }).afterClosed().subscribe(result => {
      console.log(result);
      this.cleanService.CleanMapSet();

      this.cleanService.routerName = this.cleanService.mapAreaName[this.cleanData.area];
    });
  }
}
