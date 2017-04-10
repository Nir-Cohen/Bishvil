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
    this.item = { location: "", description: "", type: "" , author : "" ,photoURL :""};
  }

  addItem(){
    //this.item.photoURL= photoURL;
    this.afService.addItem(this.item);
  }



  upload(event:any){
         let targetFile = event.srcElement.files[0];
         //let uploader = document.getElementById("btnUpload");
         let fbsPath = 'images/' + targetFile.name;
         console.log("The Path:" +fbsPath);
          this.uploadFile(fbsPath,targetFile);

  }

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

export class item{
    type : String;
    description : String;
    location : String;
    author : String;
    photoURL : String;

}