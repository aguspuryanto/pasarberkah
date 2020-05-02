import { NgModule } from '@angular/core';
// import { IonicPageModule } from 'ionic-angular';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        { path: 'tab1', loadChildren: '../home/home.module#HomePageModule' },
        { path: 'tab2', loadChildren: '../tab2/tab2.module#Tab2PageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/tab1',
    pathMatch:'full'
  }
];

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    RouterModule.forChild(routes),
    // IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
