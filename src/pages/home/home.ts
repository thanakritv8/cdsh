import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
//import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  arrData = [{'name':'TEST1', 'status':'true'},{'name':'TEST2', 'status': 'false'}];
  itemRef: AngularFireObject<any>;
  //arrData: Observable<any>;
  constructor(public navCtrl: NavController,public googleplus: GooglePlus, public fdb: AngularFireDatabase) {
    //if(this.statusLogin == true){
    /*this.itemRef = fdb.object('device/'+ this.userId);
    this.itemRef.snapshotChanges().subscribe(action => {
        //this.arrData = action.payload.val()
      console.log(action.payload.val())
          //console.log(action.type);
          //console.log(action.key)
          //console.log(action.payload.val().IO1.name)
    });
    //}*/
    //this.roundGet();
  }

  myIcon: string = "bulb";
  myIconColor: string = "yellow";
  myTitleColor: string = "dark";

  
  toggleUpdate(item) {  
    const items = this.fdb.list('device');
    items.update(item.$key, { status: item.status });
  }

  createUserId() {
    this.itemRef = this.fdb.object('device/'+ this.userId);
    this.itemRef.snapshotChanges().subscribe(action => {
      if(action.payload.val() == null){
        this.itemRef.set({ email: this.email });
      }
    });
  }

  //arrData = [];
  getChanges(){
    this.itemRef = this.fdb.object('device/'+ this.userId);
    this.itemRef.snapshotChanges().subscribe(action => {
      //this.arrData = action.payload.val();
      console.log(action.payload);
    });
  }

  statusLogin: boolean = false;
  email: string = "";
  userId: string = "";
  loginGoogle(){
    this.googleplus.login({
      'webClientId':'1063869344462-6rc2rsagqsl2vnqmoqenlefacibs2agn.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(user=>{
        this.statusLogin = true;
        this.email = user.email;
        this.userId = user.uid;
        this.createUserId();
        this.getChanges();
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
