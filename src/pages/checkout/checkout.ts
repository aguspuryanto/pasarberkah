import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../providers/cart.service';
import { CartItem } from '../../entities/cart-item';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cartItems:CartItem[]=[];
  cartTotal: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    this.cartItems=this.cartService.list();
    this.cartTotal = this.cartItems.map(item => (item.quantity*item.product.unitPrice)).reduce((prev, next) => prev + next);
  }

}
