import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaComponent } from './page/area/area.component';
import { LayoutComponent } from './page/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarRatingModule } from 'ngx-bar-rating';
import { MaterialModule } from './module/material/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DialogComponent } from './common/dialog/dialog.component';
import { ClassSetComponent } from './page/class-set/class-set.component';
import { MainComponent } from './page/main/main.component';
import { HistoryComponent } from './page/history/history.component';
import { AreaSetComponent, AreaSetDialogComponent } from './page/area-set/area-set.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    LayoutComponent,
    DialogComponent,
    ClassSetComponent,
    MainComponent,
    HistoryComponent,
    AreaSetComponent,
    AreaSetDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BarRatingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, AreaSetDialogComponent],
})
export class AppModule { }
