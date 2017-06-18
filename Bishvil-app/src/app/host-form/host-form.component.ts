import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {Router} from "@angular/router";
import {AF} from 'providers/af'
import * as firebase from 'firebase';
import { TranslateService } from 'app/translation'




@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.css']
})
export class HostFormComponent implements OnInit {
  public host: host;
    targetRef:any;
    storageRef:any;

  public Date: string;
  public Location: string;
  public Notes: string;
  public Phone: string;
  public Num_Bnut_Sherot: string;
  public Spooken: string;
  public Join: string;
  public Leave: string;
  public Add: string;
  public PeopleAmount: string;
  public FirstName: string;
  public LastName: string;
  public shbbat: string;


userType:Array<Object>  = [
       {id: 1, name: "Bat Sherut"},
       {id: 2, name: "French"},
       {id: 3, name: "English"},
       {id: 4, name: "Moroccan"},
       {id: 5, name: "Arabic"},
     ];
selectedValue = null;
  constructor(public afService: AF, private router: Router,private _translate: TranslateService) { 
     this.storageRef = firebase.storage().ref();
   }

  ngOnInit() {
    this.host = { 
      location: "",
      time: "",
      note: "",
      author:"",
      lastName:"",
      firstName:"",
      phoneOne:"",
      phoneTwo:"",
      lang:"",
      numberHost:"",
      photoURL:"",
    };
    this.selectLang('en');
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
      this.Date = this._translate.instant('Date');
      this.Location = this._translate.instant('Location');
      this.Notes = this._translate.instant('Notes');
      this.Phone = this._translate.instant('Phone');
      this.Num_Bnut_Sherot = this._translate.instant('Number Of Bnot Shierut');
      this.Spooken = this._translate.instant('Spoken Language');
      this.Join = this._translate.instant('Join');
      this.Leave = this._translate.instant('Leave');
      this.Add = this._translate.instant('Add Hosting');
      this.PeopleAmount = this._translate.instant('Host people');
      this.FirstName = this._translate.instant('First Name');
      this.LastName = this._translate.instant('Last Name');
      this.shbbat = this._translate.instant('Host in Shabat');
      
    }


  addHosting(){

    //VALIDATION:
    if(this.host.phoneOne.length != 10)
    {
      alert("Phone must be 10 numbers");
      return;
    }

    for(var i=0 ; i<this.host.phoneOne.length ; i++)
    {
      if (this.host.phoneOne[i] < '0' || this.host.phoneOne[i] > '9')
      {
        alert ("Phone can only contain numbers!");
        return;
      }
    }

    for(var i=0 ; i<this.host.numberHost.length ; i++)
    {
      if (this.host.numberHost[i] < '0' || this.host.numberHost[i] > '9')
      {
        alert ("Host people can only contain numbers!");
        return;
      }
    }

    if (this.host.numberHost == "0")
    {
      alert ("Host people can't be zero!");
      return;
    }

    var now = new Date();
    var d = new Date(this.host.time);
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
      this.afService.addHosting(this.host);
    }

    this.router.navigate([""]);
  }


  //setup path to upload
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
            this.host.photoURL=downloadUrl;
            console.log(downloadUrl);
            res(downloadUrl);  
            alert("Photo uploaded!");
          }
        );
      })      
      return promise;
    }
    

}

export class host{
  location: string;
  time: string;
  note: string;
  author: string;
  firstName: string;
  lastName: string;
  phoneOne:string;
  phoneTwo:string;
  lang: string;
  numberHost:string;
  photoURL:any;
}

