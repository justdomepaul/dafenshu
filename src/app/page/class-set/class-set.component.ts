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

  classArr: SchoolClass[] = [];

  ngOnInit() {
    // this.db.collection('class').doc('樹人醫護管理專科學校').set({ pet: 'dog' });
    this.cleanService.routerName = '班級管理';
    this.db.collection('class').doc('樹人醫護管理專科學校').valueChanges().subscribe(
      (v: any) => {
        console.log('v', v);
        this.classArr = v.data;
      },
      (e) => { console.log('e', e); },
    );
  }

  ReflashArea() {
    this.mapAreaUse = [];
    this.cleanService.mapArea.map(
      (x) => { x.disabled = false; }
    );
    this.classArr.map(
      (x) => {
        x.ownArea.forEach(area => {
          this.cleanService.mapArea[area].disabled = true;
        });
      }
    );
  }

  ClassAdd() {
    this.classArr.push(JSON.parse(JSON.stringify(this.emptyClass)));
  }

  ClassUpdate() {
    this.db.doc('class/樹人醫護管理專科學校').update({ data: this.classArr }).then((result) => {
      console.log('result', result);
      this.snackBar.open('更新成功', '', { duration: 2000 });
    }).catch((err) => {

    });
  }

  ClassDel(i: number) {
    const dialogData: DialogData = {
      title: this.classArr[i].name + '',
      content: '確定這筆資料刪除嗎？',
      yes: '是',
      no: '否',
    };
    this.toolService.openDialog(dialogData).subscribe(
      (result: boolean) => {
        if (result === true) {
          this.classArr.splice(i, 1);
        }
      },
    );
  }
}
