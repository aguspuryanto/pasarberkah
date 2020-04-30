import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { CartService } from "../../providers/cart.service";
import { Product } from "../../entities/product";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
  selector: "page-product-detail",
  templateUrl: "product-detail.html"
})
export class ProductDetailPage {
  selectedProduct: Product;
  cartCount:number=0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public toastController: ToastController,

  ) {
    this.selectedProduct = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProductDetailPage");
  }

  chatSeller(product: Product){
    // this.navCtrl.push(ProductDetailPage, { item: product });
    this.navCtrl.setRoot(ChatPage, {
      item:product,
      nickname: 'Guest'
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartService.cartCount=this.cartService.cartCount+1;
    this.cartCount=this.cartService.cartCount;
    this.showToast();
  }

  showToast(){
    let toast=this.toastController.create({
      message:'Your product was added to cart',
      duration:2000,
      position:'bottom'
    });
    toast.present();
  }

  goToCart(){
    this.navCtrl.push(ShoppingCartPage);
  }

  ionViewWillEnter(){
    if(this.cartService.cartCount){
      this.cartCount=this.cartService.cartCount;
    }
  }

}
