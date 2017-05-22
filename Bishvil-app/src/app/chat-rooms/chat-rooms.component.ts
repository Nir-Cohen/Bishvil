import { Component, OnInit } from '@angular/core';
import {ChatRoomsService} from '../chat-rooms/chat-rooms.service';
import {NgForm} from '@angular/forms';
import {AF} from "../../providers/af";
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import {ChatRooms} from './chat-rooms';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit {
    targetRef:any;
    storageRef:any;
  user:ChatRooms;
  mail;
  myMail;
  public myName;
  public name:string;
  groups;
  ifClicked;
  ifClicked1;
  arruser=[];
  saveGroupName;
  users;
  currentUser;
  currentUser2;
  public group:string;
  nameOfGroup="-1";
  chatArr=[];
  

  getMyMail(){  
    this.mail=true;
      this.myName =firebase.auth().currentUser.email;
      this.ifClicked1=true;
      this.ifClicked=false;
      console.log(this.myName);
      console.log(this.groups[0].userArr);
  }
  addMymail(){
        this.myMail=true;
      this.myName =firebase.auth().currentUser.email;
      this.ifClicked=true;
      this.ifClicked1=false;
  }

   addGroup(){
    if(this.name==""||this.name==null){
    alert("please enter group name");
      return;
    }
      for(var i = 0 ; i<100;i++)
      {
        if(this.groups[i] != undefined)
        { 
        if(this.name == this.groups[i].name)
        {
            alert("This group name is not available");
            return;
        }
        }
      }
    this.afService.addGroup(this.name,this.arruser);
    this.saveGroupName=this.name;
    this.arruser=[];
    console.log(this.name);
    this.name = '';
    this.myMail=false;
    this.mail=true;

  }

    select(user,group){
   if(this.arruser[0]!=firebase.auth().currentUser.email )
   {
     this.arruser.push(firebase.auth().currentUser.email);
   }
		this.currentUser = user; 
    this.currentUser2 = user; 
    this.arruser.push(user.email);
    console.log(this.arruser);
   console.log(user);
 }

 cancel(user){
 var i=0;
 for(i = 0;i<this.arruser.length; i++)
 {
    if(user.email==this.arruser[i])
      break;
 }
   this.arruser.splice(i,1);
   console.log(this.arruser);
   console.log(this.arruser.length);
 }

 deleteUsers(key,u){
    console.log(u);
   this.af.database.object('/group/' + key).remove();
  }

  select2(group){
    this.currentUser2 = group; 
    this.nameOfGroup=this.currentUser2.name;
    this.afService.nameOfGroup=this.nameOfGroup;
   console.log(this.currentUser2.name);
 }

  constructor(private _groupsService: ChatRoomsService,public af:AngularFire,public afService: AF) { 
     this.storageRef = firebase.storage().ref();
  }

 ngOnInit() {
    this._groupsService.getUsers()
    .subscribe(users => {this.users = users});
    this._groupsService.getGroups()
    .subscribe(groups => {this.groups = groups});
    console.log(this.groups);
  }


  show(group) {
   this.afService.chatArrusers=group.userArr;
  }



  leave(group,key)
{

   this.chatArr=group.userArr;
  var i = 0; 
  for(i = 0 ;i <this.chatArr.length;i++)
  {
    if(this.afService.displayName == this.chatArr[i] ||this.afService.email == this.chatArr[i])
    {
       break;
    }
  }
    console.log( this.chatArr);
     this.chatArr.splice(i,1);
     console.log( this.chatArr);
     this.af.database.object('/group/'+key).update({userArr : this.chatArr});
}




  //setup path to upload
  upload(event:any,key:string){
    console.log(key);
      let targetFile = event.srcElement.files[0];
      let fbsPath = 'images/items/' + targetFile.name;
      this.uploadFile(fbsPath,targetFile,key);
  }

  //upload to firebase
  uploadFile(fbsPath,targetFile,key) {
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
            this.af.database.object('/group/'+key).update({photoURL :downloadUrl});
            console.log(downloadUrl);
            res(downloadUrl);  
            alert("Photo uploaded!");
          }
        );
      })      
      return promise;
    }







}
