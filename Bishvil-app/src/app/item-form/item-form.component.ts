import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";
import * as firebase from 'firebase';
import {Router} from "@angular/router";
import { TranslateService } from 'app/translation'



@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

    public item : item;

    targetRef:any;
    storageRef:any;

  public NewItem: string;
  public Typeofitem: string;
  public ItemCondition: string;
  public New: string;
  public AlmostNew: string;
  public FineUsed: string;
  public Badly: string;
  public ItemDescription: string;
  public ItemLocation: string;
  public ContactInformation: string;
  public BrowsePhoto: string;
  public ResetForm: string;
  public Phone: string;
  public Email: string;
  public Add: string;



  constructor(public afService : AF, private router: Router,private _translate: TranslateService) { 
      this.storageRef = firebase.storage().ref();
  }

  ngOnInit() {
    this.item = { location: "", cond: "", description: "", type: "" , author : "" ,photoURL :"", phone:"", email:"",};
    firebase.database().ref('/registeredUsers/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
        this.item.author = snapshot.val().name;        
    });
    this.selectLang('EN');
  }

isCurrentLang(lang: string)
  {
      return lang === this._translate.currentLang;
  }
    
    selectLang(lang: string) 
    {
      // set default;
      // console.log(lang);
      this._translate.use(this.afService.choosen_lan);
      this.refreshText();
    }
    
    refreshText() 
    {
      this.NewItem = this._translate.instant('New Item');
      this.Typeofitem = this._translate.instant('Type of item');
      this.ItemCondition = this._translate.instant('Item Condition');
      this.New = this._translate.instant('New');
      this.AlmostNew = this._translate.instant('Almost New');
      this.FineUsed = this._translate.instant('Fine Used');
      this.Badly = this._translate.instant('Badly');
      this.ItemDescription = this._translate.instant('Item Description');
      this.ItemLocation = this._translate.instant('Item Location');
      this.ContactInformation = this._translate.instant('Contact Information');
      this.BrowsePhoto = this._translate.instant('Browse Photo');
      this.ResetForm = this._translate.instant('Reset Form');
      this.Phone = this._translate.instant('Phone');
      this.Email = this._translate.instant('Email');
      this.Add = this._translate.instant('Add item')
      
    }





  //add item to database
  addItem(){

    if(this.item.phone.length != 10)
    {
      alert("Phone must be 10 numbers");
      return;
    }

    for(var i=0 ; i<this.item.phone.length ; i++)
    {
      if (this.item.phone[i] < '0' || this.item.phone[i] > '9')
      {
        alert ("Phone can only contain numbers!");
        return;
      }
    }
 
    /* email regEx validation:
    if( !( this.item.email.match(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/) || this.item.email =="" ) ){
      alert ("Invalid email address!");
      return;
    }*/

    if(confirm("Add Item?"))
    {
      this.item.email = this.afService.email;
      this.afService.addItem(this.item);
      this.router.navigate([""]);
    }
    
    return;
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
            this.item.photoURL=downloadUrl;
            console.log(downloadUrl);
            res(downloadUrl);  
            alert("Photo uploaded!");
          }
        );
      })      
      return promise;
    }
}

//item struct
export class item{
    type : String;
    cond : String;
    description : String;
    location : String;
    author : String;
    photoURL : String;
    phone: String;
    email: String;
}