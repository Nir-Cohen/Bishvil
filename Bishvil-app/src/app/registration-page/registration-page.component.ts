import { Component } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";

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

  constructor(private afService: AF, private router: Router) { }

  register(event, name, email, password,status) {
    console.log(status);
  if(status == "Bat Sherut")
    this.status=1;
  else
    this.status=2;
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {//,"1").then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email,this.status).then(() => {
        this.router.navigate(['']);
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
