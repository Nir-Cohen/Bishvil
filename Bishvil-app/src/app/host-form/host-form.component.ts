import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {AF} from 'providers/af'
import * as firebase from 'firebase';
@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.css']
})
export class HostFormComponent implements OnInit {
  public host: host;
    targetRef:any;
    storageRef:any;

userType:Array<Object>  = [
       {id: 1, name: "Bat Sherut"},
       {id: 2, name: "French"},
       {id: 3, name: "English"},
       {id: 4, name: "Moroccan"},
       {id: 5, name: "Arabic"},
     ];
selectedValue = null;
  constructor(public afService: AF) { 
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
  }

  addHosting(){
      if(confirm("Save changes?")){
        if(this.host.firstName!= "" && this.host.lastName != "")
           this.afService.addHosting(this.host);
      }
  
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
  phoneOne:any;
  phoneTwo:any;
  lang:any;
  numberHost:any;
  photoURL:any;
}

