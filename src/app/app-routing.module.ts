import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './page/area/area.component';
import { LayoutComponent } from './page/layout/layout.component';
import { ClassSetComponent } from './page/class-set/class-set.component';
import { MainComponent } from './page/main/main.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: MainComponent },
      { path: 'classSet', component: ClassSetComponent },
      { path: 'area/:area', component: AreaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
