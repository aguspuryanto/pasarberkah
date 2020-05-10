import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicImageCacheModule } from 'ionic3-image-cache';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { ChatPage } from '../pages/chat/chat';
import { CheckoutPage } from '../pages/checkout/checkout';
import { SettingPage } from '../pages/setting/setting';
import { TransaksiPage } from '../pages/transaksi/transaksi';

import { CartService } from '../providers/cart.service';
import { ProductService } from '../providers/product.service';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductDetailPage,
    ShoppingCartPage,
    ChatPage,
    CheckoutPage,
    SettingPage,
    TransaksiPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    // HttpClientModule,
    HttpModule,
    IonicImageCacheModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductDetailPage,
    ShoppingCartPage,
    ChatPage,
    CheckoutPage,
    SettingPage,
    TransaksiPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CartService,
    ProductService,
    Geolocation,
    NativeGeocoder,
    {provide: "apiUrl", useValue :"http://localhost/evoush/"},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
