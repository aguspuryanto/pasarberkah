import { Component, Inject, NgZone } from '@angular/core';
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
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

import { ShoppingCartPage } from "./../shopping-cart/shopping-cart";
import { ProductDetailPage } from "./../product-detail/product-detail";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ProductService, CategoryService]
})
export class HomePage {
  // This property will save the callback which we can unsubscribe when we leave this view
  public unsubscribeBackEvent: any;

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  address: string;
  options: GeolocationOptions;

  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string;
  filterText: string;
  cartCount: number = 0;
  myClock: string;
  page: number = 1;
  noMoreData: boolean = false;

  slideData = [{ 
    image: "../../assets/data/img1.jpg" },{ image: "../../assets/data/img2.jpg" },{ image: "../../assets/data/img3.jpg" },{ image: "../../assets/data/img4.jpg" }];

  constructor(
    public platform: Platform, 
    public navCtrl: NavController, 
    public app: App,
    public zone: NgZone,
    public navParams: NavParams,
    public productService: ProductService,
    public categoryService: CategoryService,
    public cartService: CartService,
    public loadingController: LoadingController,
    public geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
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
    this.options = {
      timeout: 10000, 
      enableHighAccuracy: true, 
      maximumAge: 3600
    }

    this.geolocation.getCurrentPosition(this.options).then((resp: Geoposition) => {
      console.log(resp)
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddress(this.latitude, this.longitude);
     }).catch((error: PositionError) => {
       console.log('Error getting location', error.message);
     });
  }

  // geocoder options
  // nativeGeocoderOptions: NativeGeocoderOptions = {
  //   useLocale: true,
  //   maxResults: 5
  // };

  // get address using coordinates
  async getAddress(lat,long){
    // if (navigator.geolocation) {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      if (this.platform.is('cordova')) {
        this.nativeGeocoder.reverseGeocode(lat, long, options)
        .then((res: NativeGeocoderReverseResult[]) => {
          this.address = this.pretifyAddress(res[0]);
        })
        .catch((error: any) => {
          console.log('Error getting location'+ JSON.stringify(error));
          // this.getGeoLocation(lat, long);
        });
      }
    // }
  }

  async getGeoLocation(lat: number, lng: number, type?) {
    if (navigator.geolocation) {
      let geocoder = await new google.maps.Geocoder();
      let latlng = await new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };

      await geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          this.zone.run(() => {
            if (result != null) {
              this.address = result.formatted_address;
              if (type === 'reverseGeocode') {
                this.address = result.formatted_address;
              }
            }
          })
        }
      });

    }
  }

  // address
  pretifyAddress(address){
    let obj = [];
    let data = "";
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      data += obj[val]+', ';
    }
    return address.slice(0, -2);
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
