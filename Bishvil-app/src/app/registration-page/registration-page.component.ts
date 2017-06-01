import { Component } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import * as firebase from 'firebase';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  public error: any;
userType:Array<Object>  = [
       {id: 1, name: "Bat Sherut"},
       {id: 2, name: "Torem"},
     ];
     status: number;
     nameList=[]
  constructor(private afService: AF, private router: Router) { }

  register(event, name, email, password,status) {
    console.log(status);
    if(status == "Bat Sherut")
      this.status=1;
    else
      this.status=2;

      firebase.database().ref("registeredUsers").orderByValue().on("value" ,(data)=>{
      data.forEach((snap) =>{
        this.nameList.push(snap.val().name);
        return false;
      });
    });

  for(var i = 0 ;i <this.nameList.length;i++)
  {
    if(name == this.nameList[i] )
    {
      alert("This username already exists in the system Please select a different username");
       return;
    }
  }

    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email,this.status).then(() => {
          //send Email Verification and return to login page
          firebase.auth().currentUser.sendEmailVerification();
          firebase.auth().currentUser.updateProfile({displayName : name, photoURL : "https://www.drupal.org/files/profile_default.jpg"}).then(function(){console.log("updated!!");},function(error){});
          this.router.navigate(['login']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
        
        
  }
}
