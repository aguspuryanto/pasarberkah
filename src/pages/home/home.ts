import { Component, Inject } from '@angular/core';
import { NavController, Platform, App, NavParams, LoadingController } from 'ionic-angular';

import { CartService } from "./../../providers/cart.service";
import { CategoryService } from "./../../providers/category.service";
import { Category } from "../../entities/category";
import { Product } from "../../entities/product";
import { ProductService } from "../../providers/product.service";

// import { HttpClient } from '@angular/common/http';
import { Http } from "@angular/http";
// import { IonicImageCacheModule } from 'ionic3-image-cache';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

import { ShoppingCartPage } from "./../shopping-cart/shopping-cart";
import { ProductDetailPage } from "./../product-detail/product-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ProductService, CategoryService]
})
export class HomePage {
  // This property will save the callback which we can unsubscribe when we leave this view
  public unsubscribeBackEvent: any;
  options: GeolocationOptions;

  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string;
  filterText: string;
  cartCount: number = 0;
  myClock: string;
  page: number = 1;
  noMoreData: boolean = false;

  constructor(
    public platform: Platform, 
    public navCtrl: NavController, 
    public app: App,
    public navParams: NavParams,
    public productService: ProductService,
    public categoryService: CategoryService,
    public cartService: CartService,
    public loadingController: LoadingController,
    public geolocation: Geolocation,
    public http: Http, @Inject('apiUrl') private apiUrl
  ) {
    this.getLocation();
  }

  //Called when view is loaded
  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.getProducts(this.page);
    // this.getLocation();
  }

  ionViewWillEnter() {
    if (this.cartService.cartCount) {
      this.cartCount = this.cartService.cartCount;
    }
  }
  
  //Called when view is left
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent && this.unsubscribeBackEvent();
  }

  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.registerBackButtonAction(function (event) {
        // you can add logic here to execute on backpress
    }, 101);
    /* here priority 101 will be greater then 100 
    if we have registerBackButtonAction in app.component.ts */
  }

  getProducts(page) {
    let loader=this.loadingController.create( {content:'Please wait....'} );
    loader.present().then(() => {
      // 
      if(localStorage.getItem('products')) {
        this.products = JSON.parse(localStorage.getItem('products'));
      } else {
        this.productService.getProducts(page).subscribe(data => {
          localStorage.setItem('products', JSON.stringify(data));
          this.products = this.products.concat(data);
        });
      }
      loader.dismiss();
    });
  }

  getLocation(){
    this.options =  {
      enableHighAccuracy: true
    }

    this.geolocation.getCurrentPosition(this.options).then((resp: Geoposition) => {
      console.log(resp.coords.longitude + ',' + resp.coords.latitude);
     }).catch((error: PositionError) => {
       console.log('Error getting location', error.message);
     });
  }

  itemTapped(event, product) {
    this.navCtrl.push(ProductDetailPage, { item: product });
  }

  goToCart() {
    this.navCtrl.push(ShoppingCartPage);
  }

  loadData(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.getProducts(this.page);
      infiniteScroll.complete();
    }, 1000);
  }
}
