import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import firebase from 'firebase';

export const firebaseConfig={
  apiKey: "AIzaSyAMPj_B78mGX8e8Hy7KfOdzDJPMbH5N9C8",
  authDomain: "cdsh-37b7f.firebaseapp.com",
  databaseURL: "https://cdsh-37b7f.firebaseio.com",
  projectId: "cdsh-37b7f",
  storageBucket: "cdsh-37b7f.appspot.com",
  messagingSenderId: "1063869344462"
}
firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus
  ]
})
export class AppModule {}
