import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { MatDialog } from '@angular/material';

export interface DialogData {
  title: string;
  content: string;
  yes: string;
  no: string;
}

export interface Imgur {
  data: ImgurData;
}

export interface ImgurData {
  link: string;
}


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  imgurImageUpload(imageFile: string): Observable<Imgur> {
    const url = 'https://api.imgur.com/3/image';
    const data = { image: imageFile.split(',')[1], type: 'base64' };
    const headersArr = new HttpHeaders({
      Authorization: 'Client-ID 8bb968ccc05f1cb',
    });
    const options = { headers: headersArr };
    return this.http.post<Imgur>(url, data, options);
  }

  openDialog(dialogData: DialogData) {
    // const dialogData: DialogData = {
    //   title: 'title',
    //   content: 'content',
    //   yes: '是',
    //   no: '否',
    // };
    return this.dialog.open(DialogComponent, {
      width: '300px',
      disableClose: true,
      autoFocus: false,
      data: dialogData,
    }).afterClosed();
  }

  compress(file: File): Observable<any> {
    const defultSize = 250; // For scaling relative to width
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(observer => {
      reader.onload = ev => {
        const img = new Image();
        img.src = (ev.target as any).result;
        (img.onload = () => {
          const imgType = file.type;
          const elem = document.createElement('canvas'); // Use Angular's Renderer2 method

          let scaleFactor = 1;
          if (img.width > img.height) {
            scaleFactor = defultSize / img.height;
          } else {
            scaleFactor = defultSize / img.width;
          }
          elem.width = img.width * scaleFactor;
          elem.height = img.height * scaleFactor;

          const ctx = elem.getContext('2d');
          ctx.drawImage(img, 0, 0, elem.width, elem.height);
          ctx.canvas.toBlob(
            blob => {
              observer.next(
                new File([blob], file.name, {
                  type: imgType,
                  lastModified: Date.now(),
                }),
              );
            },
            imgType,
            1,
          );
        }),
          (reader.onerror = error => observer.error(error));
      };
    });
  }

  convertFile(file): Promise<any> {
    return new Promise((resolve, reject) => {
      // 建立FileReader物件
      const reader = new FileReader();
      // 註冊onload事件，取得result則resolve (會是一個Base64字串)
      reader.onload = () => { resolve(reader.result); };
      // 註冊onerror事件，若發生error則reject
      reader.onerror = () => { reject(reader.error); };
      // 讀取檔案
      reader.readAsDataURL(file);
    });
  }

  exportToCSV(csvString: string, filename: string) {
    const downloadLink = document.createElement('a');
    downloadLink.download = filename + '.csv';
    downloadLink.innerHTML = 'Download File';
    const code = encodeURIComponent(csvString);
    downloadLink.href = 'data:application/csv;charset=utf-8,\uFEFF' + code;
    downloadLink.click();
  }
}
