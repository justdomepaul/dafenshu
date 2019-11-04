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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DialogComponent } from './common/dialog/dialog.component';
import { ClassSetComponent } from './page/class-set/class-set.component';
import { MainComponent } from './page/main/main.component';
import { HistoryComponent } from './page/history/history.component';
import { AreaSetComponent, AreaSetDialogComponent } from './page/area-set/area-set.component';
import { environment } from '../environments/environment';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { HistoryDetailsComponent } from './page/history-details/history-details.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      clientId: '420897161487-cf87fb7m84u5kk1633ddt8v7a5ct1si0.apps.googleusercontent.com',
      authMethod: 'https://accounts.google.com',
      customParameters: {
        prompt: 'select_account',
      },
    },
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: 'https://app.termly.io/document/privacy-policy/fc3b5c0c-669e-4877-ba74-caf43bbc888b',
  signInSuccessUrl: 'login',
};

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
    LoginPageComponent,
    HistoryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BarRatingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, AreaSetDialogComponent],
})
export class AppModule { }
