import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";
import * as firebase from 'firebase';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

    public item : item;

    targetRef:any;
    storageRef:any;

  constructor(public afService : AF) { 
      this.storageRef = firebase.storage().ref();
  }

  ngOnInit() {
    this.item = { location: "", description: "", type: "" , author : "" ,photoURL :"", phone:"", email:""};
    firebase.database().ref('/registeredUsers/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
        this.item.author = snapshot.val().name;        
    });
  }

  //add item to database
  addItem(){
    console.log(this.item);
    if(this.item.author=="" ||this.item.description=="" ||this.item.email=="" ||this.item.location=="" ||this.item.type=="")
    {
      alert("the fields its requried");
      return;
    }
    
for(var i = 0 ; i<this.item.phone.length; i++ )
{
  if(this.item.phone[i]<"0"||this.item.phone[i]>"9")
  {
      alert("phone need to be numbers");
      return;
  }
}
    this.afService.addItem(this.item);
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
    description : String;
    location : String;
    author : String;
    photoURL : String;
    phone: String;
    email: String;
}