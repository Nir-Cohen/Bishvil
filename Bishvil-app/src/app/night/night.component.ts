import { Component, OnInit} from '@angular/core';
import {NightFormComponent} from 'app/night-form/night-form.component';
import {AF} from 'providers/af';
import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import { DialogService } from "ng2-bootstrap-modal";
import { Confirm2Component } from "app/confirm2/confirm2.component";
import { TranslateService } from 'app/translation'

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.css'],
  
})
export class NightComponent implements OnInit {
  
  confirmResult:boolean = null;
  key:string;
  author:string;
  arrusers=[];
  userArr=[];
  c=[];
  public events: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;

  public AddMeet:string;
  public Date:string;
  public NumOfGirls:string;
  public Join:string;
  public Notes:string;
  public Leave:string;
  public WhoComes:string;
  public Location:string;

  constructor(private dialogService:DialogService,public afService: AF,public af: AngularFire,private _translate: TranslateService) { 
  this.events = this.afService.events;
  this.users = this.af.database.list("registeredUsers");

  }
  deleteItem(key : string){
    console.log("Removing "+ key);
    this.events.remove(key);
   }



  ngOnInit() {
    this.selectLang('EN');
  }

isCurrentLang(lang: string)
  {
      return lang === this._translate.currentLang;
  }
    
    selectLang(lang: string) 
    {
      // set default;
      
      console.log(lang);
      this._translate.use(this.afService.choosen_lan);
      this.refreshText();
    }
    
    refreshText() 
    {
      this.Location = this._translate.instant('Location');
      this.AddMeet = this._translate.instant('Add Meeting');
      this.Date = this._translate.instant('Date');
      this.NumOfGirls = this._translate.instant('Number Of Bnot Shierut');
      this.Join = this._translate.instant('Join');
      this.Notes = this._translate.instant('Notes');
      this.Leave = this._translate.instant('Leave');
      this.WhoComes = this._translate.instant('Who is Coming');
      
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
    if(this.afService.displayName == this.userArr[i] ||this.afService.email == this.userArr[i])
    {
       break;
    }
  }
    console.log( this.userArr);
     this.userArr.splice(i,1);
     console.log( this.userArr);
     this.af.database.object('/events/'+this.afService.OK_key).update({userArr : this.userArr});
}



  showConfirm(key: string) {
    
    this.afService.OK_key=key;
    console.log(this.afService.OK_key);
    this.dialogService.addDialog(Confirm2Component, {
      title:'Confirmation',
      message:'Are you sure you want to join this Shabbat?'})
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



