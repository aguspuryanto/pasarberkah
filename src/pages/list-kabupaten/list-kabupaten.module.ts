import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListKabupatenPage } from './list-kabupaten';

@NgModule({
  declarations: [
    ListKabupatenPage,
  ],
  imports: [
    IonicPageModule.forChild(ListKabupatenPage),
  ],
})
export class ListKabupatenPageModule {}
