import { Component, OnInit } from '@angular/core';
import { CleanService } from 'src/app/service/clean/clean.service';
import { SchoolClass } from 'src/app/interface/school-class';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { DialogData, ToolService } from 'src/app/service/tool/tool.service';

@Component({
  selector: 'app-class-set',
  templateUrl: './class-set.component.html',
  styleUrls: ['./class-set.component.scss']
})
export class ClassSetComponent implements OnInit {

  constructor(
    public cleanService: CleanService,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private toolService: ToolService,
  ) { }
  mapAreaUse = [];
  emptyClass: SchoolClass = {
    name: '未命名',
    ownArea: [],
  };

  ngOnInit() {

  }

  ReflashArea() {
    this.mapAreaUse = [];
    this.cleanService.mapAreaAll.map(
      (x) => { x.disabled = false; }
    );
    this.cleanService.classArr.map(
      (x) => {
        x.ownArea.forEach(area => {
          this.cleanService.mapAreaAll[area].disabled = true;
        });
      }
    );
  }

  ClassAdd() {
    this.cleanService.classArr.push(JSON.parse(JSON.stringify(this.emptyClass)));
  }

  ClassUpdate() {
    this.db.doc('class/樹人醫護管理專科學校').update({ data: this.cleanService.classArr }).then((result) => {
      this.snackBar.open('更新成功', '', { duration: 2000 });
    }).catch((err) => {

    });
  }

  ClassDel(i: number) {
    const dialogData: DialogData = {
      title: this.cleanService.classArr[i].name + '',
      content: '確定這筆資料刪除嗎？',
      yes: '是',
      no: '否',
    };
    this.toolService.openDialog(dialogData).subscribe(
      (result: boolean) => {
        if (result === true) {
          this.cleanService.classArr.splice(i, 1);
        }
      },
    );
  }
}
