import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolService } from 'src/app/service/tool/tool.service';
import { Clean } from 'src/app/interface/clean';
import { CleanService } from 'src/app/service/clean/clean.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolService,
    private cleanService: CleanService,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (v) => {
        this.cleanData = this.cleanService.CleanDataGet(Number(v.area));
        console.log(this.cleanData);
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
    window.history.back();
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
}
