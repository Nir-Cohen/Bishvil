import { Component, OnInit} from '@angular/core';
import {HostFormComponent} from 'app/host-form/host-form.component';
import {AF} from 'providers/af';
import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from "app/confirm/confirm.component";
import { TranslateService } from 'app/translation'

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  
})
export class HostComponent implements OnInit {
  
  confirmResult:boolean = null;
  key:string;
  author:string;
  arrusers=[];
  userArr=[];
  c=[];
  public hosting: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;

  public Date: string;
  public Location: string;
  public Notes: string;
  public Phone: string;
  public Num_Bnut_Sherot: string;
  public Spooken: string;
  public Join: string;
  public Leave: string;
  public Add: string;
  public WhoIsComing: string;

  constructor(private dialogService:DialogService,public afService: AF,public af: AngularFire,private _translate: TranslateService) { 
  this.hosting = this.afService.hosting;
  this.users = this.af.database.list("registeredUsers");

  }
  deleteItem(key : string){
    console.log("Removing "+ key);
    this.hosting.remove(key);
   }



  ngOnInit()
   {
     this.selectLang('EN');
  }

 isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
    }
    
    selectLang(lang: string) {
      // set default;
      this._translate.use(this.afService.choosen_lan);
      this.refreshText();
    }
    
    refreshText() {
      this.Date = this._translate.instant('Date');
      this.Location = this._translate.instant('Location');
      this.Notes = this._translate.instant('Notes');
      this.Phone = this._translate.instant('Phone');
      this.Num_Bnut_Sherot = this._translate.instant('Number Of Bnot Shierut');
      this.Spooken = this._translate.instant('Spoken Language');
      this.Join = this._translate.instant('Join');
      this.Leave = this._translate.instant('Leave');
      this.Add = this._translate.instant('Add Hosting');
      this.WhoIsComing = this._translate.instant('Who is Coming');
    }

leave(key:string)
{
    this.afService.OK_key=key;
    var host = this.af.database.object('/hosting/'+this.afService.OK_key); // How to get value
    host.subscribe(snapshot => {  
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
     this.userArr.splice(i,1);
     this.af.database.object('/hosting/'+this.afService.OK_key).update({userArr : this.userArr});
}



  showConfirm(key: string) {
    
    this.afService.OK_key=key;
    this.dialogService.addDialog(ConfirmComponent, {
      title:'Confirmation',
      message:'Are you sure you want to join this Shabbat?'})
      .subscribe((isConfirmed)=>{
        //Get dialog result
        this.confirmResult = isConfirmed;
    });
  }

  checkIfIn(key: string) {
    var i = 0;

    var host = this.af.database.object('/hosting/'+key); // How to get value
    host.subscribe(snapshot => {  
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
    var host = this.af.database.object('/hosting/'+key); // How to get value
    host.subscribe(snapshot => {  
    this.arrusers = snapshot.userArr;
  });
   this.afService.arrusers=this.arrusers;

  }


}



