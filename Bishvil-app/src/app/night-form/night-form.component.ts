import { Component, OnInit, Input } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-night-form',
  templateUrl: './night-form.component.html',
  styleUrls: ['./night-form.component.css']
})
export class NightFormComponent implements OnInit {

  
  public event: event;
  targetRef:any;
  storageRef:any;

  constructor(public afService: AF) {  }

  ngOnInit() {
    this.event = { location: "", time: "", note: "", type: "", photoURL: "" };
  }

  addEvent(){
    this.afService.addEvent(this.event);
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
}

