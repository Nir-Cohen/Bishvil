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

  public users : Observable<any>;
  cityList = [];
  public filteredList : Observable<any>;
  check = false;//city
  checkStatus = false;
  model1 : any;
filterType;
  statusList = [];
  public filteredStatusList : any;
  edited;
  hideDivs;
  message;

  constructor(public afService : AF, public af : AngularFire, private router: Router) {
      this.filteredList = this.af.database.list("registeredUsers/").map(_user => _user.filter(user=> (user.status != undefined)));
        this.filteredList.subscribe(t=>{console.log(t);}
      );
      this.hideDivs = {};
      this.message ="";
  
  }

   getFilteredItems(city){
     this.filteredList = this.getFilteredList(city);
     this.checkFilterType1();   
   };

  getFilteredStatus(status){
     this.filteredList = this.getFilteredStatusList(status); 
     this.checkFilterType3();    
   };

   getFilteredList(city) : Observable<any[]>{
      if(city == undefined || city == "" || city == "(none)")
        return this.af.database.list('registeredUsers').map(_user=> _user.filter(user=> user.status != undefined));
      else
        return this.af.database.list('registeredUsers').map(_user => _user.filter(user=> user.city == city && user.status != undefined));
         
   };

    getFilteredStatusList(status) : Observable<any[]>{
      if(status == undefined || status == "" || status == "(none)")
      {
        return this.af.database.list('registeredUsers').map(_user => _user.filter(user=> user.status != undefined));
      }
      else if(status == "Bat-Sherut")
      {
          return this.af.database.list('registeredUsers').map(_user => _user.filter(user=> user.status == 0))
      }
       else if(status == "Admin")
      {
          return this.af.database.list('registeredUsers').map(_user => _user.filter(user=> user.status == 1))
      }
       else if(status == "Donor")
      {
          return this.af.database.list('registeredUsers').map(_user => _user.filter(user=> user.status == 2))
      }
   };



  sendMess(sendTo,sendToID){
    if(this.message =="")
      return;
    var ref = firebase.database().ref("privateMessages/");
    var messageToPush = {
      message: this.message,
      sentfromID: this.afService.currUserID,        
      sentfromName :this.afService.currUserName,
      senttoID : sendToID,
      senttoName : sendTo,
      timestamp: Date.now(),
      order : -1 * new Date().getTime()
    };
    ref.push(messageToPush);
    this.message = "";
    console.log("Message sent to "+ sendTo);
   }

  


   showDiv(key) : void{
    this.message = "";
     if(this.hideDivs[key]){
        this.hideDivs[key] = false;
        return;
     }
     Object.keys(this.hideDivs).forEach(h => {
       this.hideDivs[h] = false;
     })
     this.hideDivs[key] = true;
   }


   deleteUser(key,name){
     if(confirm("Are You sure you want to delete " + name +"?")){
        this.af.database.list("registeredUsers").remove(key);
     }
   };

  statusChanged($event, key){
    if($event.target.value =="Bat-Sherut")
      if(confirm("Are you sure to make this user Bat-Sherut?"))
        firebase.database().ref('registeredUsers/'+ key).update({status : "0"});
      else
        window.location.reload();

    if($event.target.value =="Admin")
      if(confirm("Are you sure to make this user ADMIN?"))
        firebase.database().ref('registeredUsers/'+ key).update({status : "1"});
      else
        window.location.reload();

    if($event.target.value =="Donor")
      if(confirm("Are you sure to make this user Donor?"))
        firebase.database().ref('registeredUsers/'+ key).update({status : "2"});
      else
        window.location.reload();        
   };

    clearInput(){
      this.model1 = "";
      this.getFilteredItems(""); 
    };
    
    ngOnInit() {
       this.statusList.push("(none)");
       this.statusList.push("Admin");
       this.statusList.push("Bat-Sherut");
       this.statusList.push("Donor");

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