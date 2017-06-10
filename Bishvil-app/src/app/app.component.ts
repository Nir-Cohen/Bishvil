import { Component } from '@angular/core';
import { AF } from "../providers/af";
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;  
  public lang:string;
  constructor(public afService: AF, private router: Router) {  
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        

        else {
          console.log("Successfully Logged in.");
            //set current user properties
            firebase.database().ref('/registeredUsers/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
                this.afService.currUserName = snapshot.val().name;
                this.afService.currUserID = firebase.auth().currentUser.uid;
                this.afService.currUserCity = snapshot.val().city;
                this.afService.currUserDOB = snapshot.val().dob;
                this.afService.currUserURL =firebase.auth().currentUser.photoURL;
                this.afService.currUserStatus = snapshot.val().status;

              
              })
            .catch((error) => {
              console.log("Cant access database");
            });

          // Set the Display Name and Email so we can attribute messages to them
            if(auth.google) {            
              this.afService.displayName = auth.google.displayName;
              this.afService.email = auth.google.email;
            }
            else {
              this.afService.displayName = firebase.auth().currentUser.displayName;         
              this.afService.email = auth.auth.email;
            }
            if(this.afService.currUserStatus == undefined){//user hasnt been verified yet
              alert("Waiting for admin confirmation!");
              this.isLoggedIn = false;
              //this.afService.logout();
              // auth = null;
              // this.afService.logout();
              //firebase.auth().signOut();
              this.router.navigate(['login']);
              
              //return;
            }
            else{           
              this.isLoggedIn = true;
              this.router.navigate(['']);
            }
          }
      }
    );
    
  }

  logout() {
    this.afService.logout();
  }

  select(key: string)
  {
    console.log(key);
    this.afService.choosen_lan=key;
  }
}


