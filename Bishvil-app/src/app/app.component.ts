import { Component } from '@angular/core';
import { AF } from "../providers/af";
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { FirebaseListObservable, AngularFire } from "angularfire2";
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;  
  public lang:string;

  user;
  constructor(public afService: AF, private router: Router, public af : AngularFire) {  
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    
    //this.afService.getUserInfo();
    //alert(this.afService.currUserStatus);
    
      this.subscribeUser();

  }
  subscribeUser(){
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        

        else {
          console.log("Successfully Logged in.");

          this.af.database.object('registeredUsers/'+ firebase.auth().currentUser.uid,{ preserveSnapshot: true }).subscribe(snap=>{
            this.afService.currUserName = snap.val().name;
            this.afService.currUserID = firebase.auth().currentUser.uid;
            this.afService.currUserCity = snap.val().city;
            this.afService.currUserDOB = snap.val().dob;
            this.afService.currUserURL =firebase.auth().currentUser.photoURL;
            this.afService.currUserStatus = snap.val().status;
          });
         
            if(this.afService.currUserStatus == undefined){//user hasnt been verified yet
              //alert(this.afService.currUserStatus);
              //alert("Waiting for admin confirmation!");

              //this.router.navigate(['login']);
              //alert(false);
             // return;
            }
                     
          // Set the Display Name and Email so we can attribute messages to them
            if(auth.google) {            
              this.afService.displayName = auth.google.displayName;
              this.afService.email = auth.google.email;
            }
            else {
              this.afService.displayName = firebase.auth().currentUser.displayName;         
              this.afService.email = auth.auth.email;
            }
            
            this.isLoggedIn = true;
            this.router.navigate(['']);
            //alert(true);
            
          }
      }
    );
  }
  
/*
  getUserInfo(){

    this.afService.af.auth.subscribe(auth=>{
    if(auth != null){
      alert("DDD");
    firebase.database().ref('/registeredUsers/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
                this.afService.currUserName = snapshot.val().name;
                this.afService.currUserID = firebase.auth().currentUser.uid;
                this.afService.currUserCity = snapshot.val().city;
                this.afService.currUserDOB = snapshot.val().dob;
                this.afService.currUserURL =firebase.auth().currentUser.photoURL;
                this.afService.currUserStatus = snapshot.val().status;
                // setTimeout(() => { }, 5000);
                //alert(snapshot.val().status);
                //public void =onComplete
                
              })
            .catch((error) => {
              console.log("Cant access database");
            });
    return true;
  }
  else
    return false;
  });*/
   /* return this.af.database.list("registeredUsers/" + firebase.auth().currentUser.uid).subscribe(_item => _item.forEach(item=> {
              if(item.$key == 'status')
                this.afService.currUserStatus = item.$value;
              console.log(this.afService.currUserStatus);
           }
          //  console.log(item.$key)
           )
           .catch(error=>{

           }
           );*/
  

  logout() {
    this.afService.logout();
  }

  select(key: string)
  {
    console.log(key);
    this.afService.choosen_lan=key;
  }
}


