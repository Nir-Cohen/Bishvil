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
              })
              .catch((error) => {
                console.log("Cant access database");
              });
          // Set the Display Name and Email so we can attribute messages to them
          if(auth.google) {
            this.afService.displayName = auth.google.displayName;
            this.afService.email = auth.google.email;
            //this.afService.status = auth.auth.status;
          }
          else {
            this.afService.displayName = auth.auth.email;            
            this.afService.email = auth.auth.email;
          }
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );
  }

  logout() {
    this.afService.logout();
  }
}
