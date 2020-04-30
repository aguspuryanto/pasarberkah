import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the ListKabupatenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-kabupaten',
  templateUrl: 'list-kabupaten.html',
})
export class ListKabupatenPage {
  items: any[];
  titleText: string = "";
  selectedItem: any;

  constructor(public platform: Platform, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.items = this.navParams.get("data");
    this.titleText = this.navParams.get("titleText");

    platform.registerBackButtonAction(() => {
      // this.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListKabupatenPage');
  }

  getItems(ev: any) {
    let val = ev.target.value;
    console.log(val);
  }

  select(i){
    console.log(i);
    this.selectedItem = i.barcode;
    this.viewCtrl.dismiss(i);
  }

}
