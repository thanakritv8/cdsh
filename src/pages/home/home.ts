import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public googleplus: GooglePlus, private fdb: AngularFireDatabase) {
    this.navCtrl = navCtrl;
    this.fdb.list("/Thung/").subscribe(_data => {
      this.arrData = _data;

      console.log(this.arrData);
    });
  }

  myIcon: string = "bulb";
  myIconColor: string = "yellow";
  myTitleColor: string = "dark";

  arrData = [];
  toggleUpdate(item) {  
    const items = this.fdb.list('/Thung');
    items.update(item.$key, { status: item.status });
  }

  statusLogin: boolean = false;
  email: string = "";
  userId: string = "";
  login(){
    this.googleplus.login({
      'webClientId':'1063869344462-6rc2rsagqsl2vnqmoqenlefacibs2agn.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(user=>{
        this.statusLogin = true;
        this.email = user.email;
        this.userId = user.uid;
        alert("Login SUCCESS" + user.uid)
      })
    }).catch(ns=>{
      this.statusLogin = false;
      alert("NOT SUCCESS")
    })
  }

}
