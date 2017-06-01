import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {

  mail : any; 
  constructor( private router: Router) { }

  ngOnInit() {
  }



  forgotPass(){
      firebase.auth().sendPasswordResetEmail(this.mail).then(function() {
        console.log("Password reset mail has sent!");

      }, function(error) {
      // An error happened.
        if("auth/user-not-found" == error["code"])
          console.log("No such user");
        
      });
        this.router.navigate(['login']);
  }
}
