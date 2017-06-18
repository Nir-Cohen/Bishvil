import { Component, OnInit ,Input} from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { DialogService } from "ng2-bootstrap-modal";
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//key is the host
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  public users : FirebaseListObservable<any>;
  cityList = [];
  public filteredList : any;
  check = false;//city
  checkStatus = false;
  model1 : any;
filterType;
  statusList = [];
  public filteredStatusList : any;


  constructor(public afService : AF, public af : AngularFire, private router: Router) {
      this.users = this.af.database.list('registeredUsers');    
         
   }

   getFilteredItems(city){
     this.filteredList = this.getFilteredList(city);
     this.checkFilterType1();   
   };

      getFilteredStatus(status){
     this.filteredStatusList = this.getFilteredStatusList(status); 
     this.checkFilterType3();    
   };

   getFilteredList(city) : Observable<any[]>{
      if(city == undefined || city == "" || city == "(none)")
        return this.af.database.list('registeredUsers');
      else
      {
        return this.af.database.list('registeredUsers').map(_user => _user.filter(user=> user.city == city));
      }   
   };

      getFilteredStatusList(status) : Observable<any[]>{
      if(status == undefined || status == "" || status == "(none)")
      {
        return this.af.database.list('registeredUsers');
      }
      else
      {
          return this.af.database.list('registeredUsers').map(_user => _user.filter(user=> user.status == status));   
      }
   };

   deleteUser(key,name){
     //var user = FirebaseAuth
     if(confirm("Are You sure you want to delete " + name +"?")){
        this.af.database.list("registeredUsers").remove(key);
     }
   };

  statusChanged($event, key){
    if($event.target.value =="Admin"){
      if(confirm("Are you sure to make this user ADMIN?"))
        firebase.database().ref('registeredUsers/'+ key).update({status : "1"});
      else
        window.location.reload();
    }
    if($event.target.value =="User")
      if(confirm("Are you sure to make this user USER?"))
        firebase.database().ref('registeredUsers/'+ key).update({status : "0"});
      else
        window.location.reload();
   };

    clearInput(){
      this.model1 = "";
      this.getFilteredItems(""); 
    };
    
    ngOnInit() {
       this.statusList.push("(none)");
      firebase.database().ref("registeredUsers/").orderByValue().on("value" ,(data)=>{
        data.forEach((snap) =>{

          if(snap.val().status != "" && snap.val().status != undefined)
          {
           
            for(var i = 0 ; i < this.statusList.length ; i++)
            {
              if(this.statusList[i] == snap.val().status)
              {
                  this.checkStatus = true;
              }
              
            }
            if(this.checkStatus == false)
            {
              this.statusList.push(snap.val().status);  
            }
            this.checkStatus = false;
          return false;
          }

        });
      });
      this.getFilteredStatus(""); 

      this.cityList.push("(none)");
      firebase.database().ref("registeredUsers/").orderByValue().on("value" ,(data)=>{
        data.forEach((snap) =>{
          
          if(snap.val().city != "" && snap.val().city != undefined)
          {
            for(var i = 0 ; i < this.cityList.length ; i++)
            {
              if(this.cityList[i] == snap.val().city)
                this.check = true;
            }
            if(this.check == false)
            {
              this.cityList.push(snap.val().city);
            }
             this.check= false;
          return false;
          }
        });
      });
      this.getFilteredItems(""); 


    }

    checkFilterType1()
    {
        this.filterType="1";
    }  
    checkFilterType3()
    {
        this.filterType="2";
    }

}