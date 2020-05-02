import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
import { CheckoutPage } from '../checkout/checkout';
// import { ListPage } from '../list/list';
// import { RegisterPage } from '../register/register';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ priority: 'high', segment: 'tabs' })
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ShoppingCartPage;
  tab3Root = CheckoutPage;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    events.subscribe('user:logout', () => {
      this.navCtrl.popToRoot();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
