import { Component, OnInit ,Input} from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    



  
  constructor(public afService: AF, private router: Router) {
    this.storageRef = firebase.storage().ref();
     
  }

    targetRef:any;
    storageRef:any;

    public user = firebase.auth().currentUser;
    public url;
    email = this.user.email;
    UserName = this.user.displayName;
    photo = this.user.photoURL;
    

 
  updateProfile(event, name, city, phoneNum, DOB){

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
            this.url = downloadUrl;
            console.log(downloadUrl);
            res(downloadUrl);
            this.user.updateProfile({displayName : this.user.displayName,photoURL: downloadUrl}).then(function(){console.log("updated!!");},function(error){});
            alert("Photo Changed!");
          }
        );
      })      
      return promise;
    }

  ngOnInit() {
  }



}
