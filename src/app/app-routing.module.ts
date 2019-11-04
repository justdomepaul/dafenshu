import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './page/area/area.component';
import { LayoutComponent } from './page/layout/layout.component';
import { ClassSetComponent } from './page/class-set/class-set.component';
import { MainComponent } from './page/main/main.component';
import { HistoryComponent } from './page/history/history.component';
import { AreaSetComponent } from './page/area-set/area-set.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { HistoryDetailsComponent } from './page/history-details/history-details.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: MainComponent },
      { path: 'classSet', component: ClassSetComponent },
      { path: 'areaSet', component: AreaSetComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'history/:week', component: HistoryDetailsComponent },
      { path: 'area/:area', component: AreaComponent },
    ],
  },
  {
    path: 'login', component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
