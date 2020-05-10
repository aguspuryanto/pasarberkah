import { Component } from '@angular/core';
import { Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, public app: App, private alertCtrl: AlertController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      statusBar.styleLightContent();
      splashScreen.hide();
    });

    platform.registerBackButtonAction(() => { 
      let nav = app._appRoot._getActivePortal() || app.getActiveNav();
      let activeView = nav.getActive().instance;

      if (activeView != null) {
        if (nav.canGoBack()) {
            if (activeView instanceof HomePage) {
              // do something
              this.confirmExit();
            } else {
	           nav.pop();
            }
        } else if (activeView.isOverlay) {
          activeView.dismiss();
        } else {          
          this.confirmExit();
        }
      }
    });
  }

  confirmExit(){
    // navigator['app'].exitApp();
    let alert = this.alertCtrl.create({
      title: 'Ionic App',
      message: 'Do you want to close the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      },
      {
        text: 'Close',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
    alert.present();
  }
}

