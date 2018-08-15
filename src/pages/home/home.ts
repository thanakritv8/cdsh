import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  itemRef: AngularFireObject<any>;
  arrData: Observable<any>;
  constructor(public navCtrl: NavController,public googleplus: GooglePlus, private fdb: AngularFireDatabase) {
    //this.navCtrl = navCtrl;
    this.arrData = fdb.object('Thung').valueChanges();
    console.log(this.arrData);
    /*this.fdb.list("/Thung/").subscribe(_data => {
      this.arrData = _data;

      console.log(this.arrData);
    });*/
    this.itemRef = fdb.object('Thung');
    this.itemRef.snapshotChanges().subscribe(action => {
    console.log(action.type);
    console.log(action.key)
    console.log(action.payload.val().IO1.name)
});
  }

  myIcon: string = "bulb";
  myIconColor: string = "yellow";
  myTitleColor: string = "dark";

  //arrData = [];
  toggleUpdate(item) {  
    const items = this.fdb.list('/Thung');
    items.update(item.$key, { status: item.status });
  }

  statusLogin: boolean = true;
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

  /*logout(){
    let nav = this.navCtrl;
    let env = this;
    this.googleplus.logout()
    .then(function (response) {
      env.nativeStorage.remove('user');
      nav.push(LoginPage);
    },function (error) {
      console.log(error);
    })
  }*/

}
