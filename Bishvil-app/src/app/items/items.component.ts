import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import * as firebase from 'firebase';
import { TranslateService } from 'app/translation'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],  
})
export class ItemsComponent implements OnInit {

  public items : FirebaseListObservable<any>;
  public users : FirebaseListObservable<any>;
  selected : any;

  onclick : Function;
  selectedRow : Number;

 
  public Publisher: string;
  public Email: string;
  public Contact_info: string;
  public Type: string;
  public AddItem: string;
  public Location: string;




  constructor(public afService : AF,public af: AngularFire,private _translate: TranslateService) {     
      this.items = this.afService.item; 
      this.users = this.af.database.list("registeredUsers");
  }

   //remove item ONLY AUTHOR ALLOW TO DELETE
   deleteItem(key : string){
    console.log("Removing "+ key);
    this.items.remove(key);
   }



  ngOnInit(){
    this.onclick = function(event : MouseEvent,i : any){
      console.log(event.target);
      this.selectedRow = i;
    };
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
      this.Publisher = this._translate.instant('Publisher');
      this.Email = this._translate.instant('Email');
      this.Contact_info = this._translate.instant('Contact info');
      this.Type = this._translate.instant('Type');
      this.AddItem = this._translate.instant('Add item');
      this.Location = this._translate.instant('Location');
      
      
    }

}
