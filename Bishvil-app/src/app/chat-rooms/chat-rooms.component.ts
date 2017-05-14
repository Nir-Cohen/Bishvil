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

  constructor(private _groupsService: ChatRoomsService,public af:AngularFire,public afService: AF) { }

 ngOnInit() {
    this._groupsService.getUsers()
    .subscribe(users => {this.users = users});
    this._groupsService.getGroups()
    .subscribe(groups => {this.groups = groups});
    console.log(this.groups);
  }

}
