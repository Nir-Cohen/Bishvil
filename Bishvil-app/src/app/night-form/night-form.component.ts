import { Component, OnInit, Input } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable,AngularFire} from "angularfire2";
import * as firebase from 'firebase';
import {Router} from "@angular/router";
import { TranslateService } from 'app/translation'

@Component({
  selector: 'app-night-form',
  templateUrl: './night-form.component.html',
  styleUrls: ['./night-form.component.css']
})
export class NightFormComponent implements OnInit {

  public ComingUsers: [""];
  public event: event;
  targetRef:any;
  storageRef:any;

 
  public Meetings: string;
  public Location: string;
  public When: string;
  public KindofMeeting: string;
  public Notes: string;
  public Coffe: string;
  public Learning: string;
  public Bar: string;
  public Party: string;
  public Other: string;
  public ResetForm: string;
  public BrowsePhoto: string;
  public AddMeetings:string;





  constructor(public afService: AF,public af:AngularFire, private router: Router,private _translate: TranslateService) { 
    this.storageRef = firebase.storage().ref();
   }

  ngOnInit() {
    this.event = { location: "", time: "", note: "", type: "", photoURL: "",numberOfJoin:"" };
    this.selectLang('EN');
  }

  addEvent(){

    //VALIDATION:
    var now = new Date();
    var d = new Date(this.event.time);
    if(now > d)
    {
      alert("Date is pass");
      return;
    }

    if(!d.getFullYear())
    {
      alert("Date is illegal");
      return;
    }


    //CONFIRM:
    if(confirm("Add Event?"))
    {
      this.afService.addEvent(this.event);
    }
    
    this.router.navigate([""]);
  }

  isCurrentLang(lang: string)
  {
      return lang === this._translate.currentLang;
  }
    
    selectLang(lang: string) 
    {
      // set default;
      this._translate.use(this.afService.choosen_lan);
      this.refreshText();
    }
    
    refreshText() 
    {
      this.Meetings = this._translate.instant('Meetings');
      this.Location = this._translate.instant('Location');
      this.When = this._translate.instant('When');
      this.KindofMeeting = this._translate.instant('Kind of Meeting');
      this.Notes = this._translate.instant('Notes');
      this.Coffe = this._translate.instant('Coffe');
      this.Learning = this._translate.instant('Learning');
      this.Bar = this._translate.instant('Bar');
      this.Party = this._translate.instant('Party');
      this.Other = this._translate.instant('Other');
      this.ResetForm = this._translate.instant('Reset Form');
      this.BrowsePhoto = this._translate.instant('Browse Photo');
      this.AddMeetings = this._translate.instant('Add Meeting');
    
    }

 upload(event:any){
      let targetFile = event.srcElement.files[0];
      let fbsPath = 'images/items/' + targetFile.name;
      this.uploadFile(fbsPath,targetFile);
  }

  //upload to firebase
  uploadFile(fbsPath,targetFile) {
      let promise = new Promise((res,rej) => {
        this.targetRef =this.storageRef.child(fbsPath);
        let task=this.targetRef.put(targetFile);
        task.on('state_changed',
          (snapshot:any) => {
            console.log(snapshot.state);
          },
          (error:any) => {
            console.log(error.code);
            rej(error);
          },
          () => {
            let downloadUrl = task.snapshot.downloadURL;
            this.event.photoURL=downloadUrl;
            console.log(downloadUrl);
            res(downloadUrl);  
            alert("Photo uploaded!");
          }
        );
      })      
      return promise;
    }
}






export class event{
  location: string;
  time: string;
  note: string;
  type: string;
  photoURL:string;
  numberOfJoin:string; 
}

