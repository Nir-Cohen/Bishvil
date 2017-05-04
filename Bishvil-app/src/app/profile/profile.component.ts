import { Component, OnInit ,Input} from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { DialogService } from "ng2-bootstrap-modal";
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    
    public userinfo :userInfo;

    targetRef:any;
    storageRef:any;
    public user : any;
    public name : any;
    public email : any;
    public photo : any;
    public maxDate : String;
    

    public users : FirebaseListObservable<any>;

  
  constructor(public afService: AF, private router: Router, private dialog : DialogService, public af :AngularFire) {
    this.storageRef = firebase.storage().ref();
    this.users = this.afService.users;
    this.maxDate = new Date((new Date().getFullYear()-18),new Date().getMonth(),new Date().getDate()).toJSON().split('T')[0];
    //retrieve current user from firebase
  }
 
  updateProfile(){
      if(confirm("Save changes?")){
        if(this.userinfo.city!= "")
          firebase.database().ref('registeredUsers/'+ this.user.uid).update({city : this.userinfo.city});
        if(this.userinfo.dob != "")
          firebase.database().ref('registeredUsers/'+ this.user.uid).update({dob : this.userinfo.dob});
      }
      this.router.navigate([""]);
  }

  upload(event:any){
         let targetFile = event.srcElement.files[0];
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
            console.log(downloadUrl);
            res(downloadUrl);
            this.user.updateProfile({displayName : this.user.displayName,photoURL: downloadUrl}).then(function(){console.log("updated!!");},function(error){});
            this.af.database.object('registeredUsers/' + this.afService.currUserID).update({photoURL : downloadUrl});
            alert("Photo Changed!");
          }
        );
      })      
      return promise;
    }

  ngOnInit() {
    this.userinfo = {city : this.afService.currUserCity, dob : this.afService.currUserDOB ,name : this.afService.currUserName};
     
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
        }
        else{
              this.user = firebase.auth().currentUser;
              this.email = this.user.email;
              this.photo = this.user.photoURL;
        }}); 
  }
}

export class userInfo{
    name : String;
    city : String;
    dob : String;
}