import { Component } from '@angular/core';
import { Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, public app: App, private alertCtrl: AlertController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      statusBar.styleLightContent();
      splashScreen.hide();
    });

    platform.registerBackButtonAction(() => {
 
      let nav = app.getActiveNavs()[0];
      let activeView = nav.getActive();                
   
      //this will not work in signed version using Lazy load use activeView.id instead
      if(activeView.component.name === "HomePage") {
   
          // canGoBack check if these's and view in nav stack
          if (nav.canGoBack()){ 
              nav.pop();
          } else {
              let alert = this.alertCtrl.create({
                title: 'Exit Application?',
                message: 'Do you want to exit the application?',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Exit',
                    handler: () => {
                      console.log('Exit clicked');
                    }
                  }
                ]
              });
              alert.present();
          }
      }
    });
  }
}

