import { Component, OnInit} from '@angular/core';
import {NightFormComponent} from 'app/night-form/night-form.component';
import {AF} from 'providers/af';
import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import { DialogService } from "ng2-bootstrap-modal";
import { Confirm2Component } from "app/confirm2/confirm2.component";

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.css'],
  
})
export class NightComponent implements OnInit {
  
  confirmResult:boolean = null;
<<<<<<< HEAD
  key:string;
  author:string;
  arrusers=[];
  userArr=[];
  c=[];
  public events: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  constructor(private dialogService:DialogService,public afService: AF,public af: AngularFire) { 
  this.events = this.afService.events;
  this.users = this.af.database.list("registeredUsers");
=======

  constructor(public afService: AF, public af: AngularFire,private dialogService:DialogService) 
  {
    this.events = this.afService.event;
    this.users = this.af.database.list("registeredUsers");
  }
>>>>>>> db3bc79d0ae4c931c2470bc8dae6c05d3431c2d3

  }
<<<<<<< HEAD
  deleteItem(key : string){
    console.log("Removing "+ key);
    this.events.remove(key);
   }

=======

  leave(key: string) 
  {
    this.afService.OK_key = key;
    var event = this.af.database.object('/events/' + this.afService.OK_key); // How to get value
    event.subscribe(snapshot => {
      this.UserAreComing = snapshot.userArr;
    });
    var i = 0;
    for (i = 0; i < this.UserAreComing.length; i++) 
    {
      if (this.afService.displayName == this.UserAreComing[i] || this.afService.email == this.UserAreComing[i]) {
        break;
      }
    }
    this.UserAreComing.splice(i, 1);
    this.af.database.object('/events/' + this.afService.OK_key).update({ userArr: this.UserAreComing });
  }
>>>>>>> db3bc79d0ae4c931c2470bc8dae6c05d3431c2d3


  ngOnInit() {
  }

leave(key:string)
{
    this.afService.OK_key=key;
    var event = this.af.database.object('/events/'+this.afService.OK_key); // How to get value
    event.subscribe(snapshot => {  
    this.userArr = snapshot.userArr;
  });
  var i = 0; 
  for(i = 0 ;i <this.userArr.length;i++)
  {
<<<<<<< HEAD
    if(this.afService.displayName == this.userArr[i] ||this.afService.email == this.userArr[i])
    {
       break;
    }
=======
    var i = 0;
    var event = this.af.database.object('/events/' + key); // How to get value
    event.subscribe(snapshot =>
     {
      this.comingFromSnap = snapshot.userAreComing;
    });
    for(i=0 ;i<this.comingFromSnap.length; i++)
    {
      if(this.comingFromSnap[i] == this.afService.email || this.comingFromSnap[i] == this.afService.displayName)
      {
        return true;
      }
    }            
    console.log(key);
    return false;
>>>>>>> db3bc79d0ae4c931c2470bc8dae6c05d3431c2d3
  }
    console.log( this.userArr);
     this.userArr.splice(i,1);
     console.log( this.userArr);
     this.af.database.object('/events/'+this.afService.OK_key).update({userArr : this.userArr});
}

<<<<<<< HEAD


  showConfirm(key: string) {
    
    this.afService.OK_key=key;
    console.log(this.afService.OK_key);
    this.dialogService.addDialog(Confirm2Component, {
      title:'Confirmation',
      message:'Are you sure you want to join this Night?'})
      .subscribe((isConfirmed)=>{
        //Get dialog result
        this.confirmResult = isConfirmed;
    });
    console.log(this.confirmResult);
  }

  checkIfIn(key: string) {
    var i = 0;

    var event = this.af.database.object('/events/'+key); // How to get value
    event.subscribe(snapshot => {  
    this.c = snapshot.userArr;
  });


     for(i=0;i<this.c.length;i++)
     {
        if(this.afService.displayName==this.c[i]||this.afService.email==this.c[i])
        {
          return true;
        }
     }
     return false;
  }
  
  show(key: string) {
    this.afService.OK_key=key;  
    var event = this.af.database.object('/events/'+key); // How to get value
    event.subscribe(snapshot => {  
    this.arrusers = snapshot.userArr;
  });
   this.afService.arrusers=this.arrusers;

  }


}



=======
 Join(key: string) 
 {
    this.afService.OK_key=key; 
    var x  = this.comingFromSnap.fill(this.afService.email);
    this.af.database.object('/events/'+this.afService.OK_key).update({userAreComing : x});
    console.log({userAreComing : x});
  }

  delete(key : string){
    this.events.remove(key);
   }
}
>>>>>>> db3bc79d0ae4c931c2470bc8dae6c05d3431c2d3
