import {Component, OnInit } from '@angular/core';
import {AF} from 'providers/af'
import { PromptComponent } from 'app/prompt/prompt.component';
import { DialogService } from "ng2-bootstrap-modal";
import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import { TranslateService } from 'app/translation';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public translatedText: string;
  public translatedText2: string;
  public supportedLanguages: any[];


  public news: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;

  constructor(public afService:AF,private dialogService:DialogService, public af: AngularFire,private _translate: TranslateService) { 
    this.news = this.afService.news;
    this.users = this.af.database.list("registeredUsers");
  }
  
  ngOnInit() 
  {
    this.supportedLanguages = [
        { display: 'English', value: 'EN' },
        { display: 'HE', value: 'HE' },
       
      ];
      this.selectLang('EN');
   }

 isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
    }
    
    selectLang(lang: string) {
      // set default;
      console.log(lang);
      this._translate.use(lang);
      this.refreshText();
    }
    
    refreshText() {
      this.translatedText = this._translate.instant('hello world');
      this.translatedText2 = this._translate.instant('date');
    }

  confirmResult:boolean = null;
  promptMessage:string = '';

 AddMessage() {
    this.dialogService.addDialog(PromptComponent, {
      title:'News messages',
      question:'Please enter your message:'})
      .subscribe((message)=>{
        //We get dialog result
        this.promptMessage = message;
      });
  }

  deleteItem(key : string){
    console.log("Removing "+ key);
    this.news.remove(key);
  }

}
