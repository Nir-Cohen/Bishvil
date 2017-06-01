import {ChatRoomsService} from '../chat-rooms/chat-rooms.service';
import {NgForm} from '@angular/forms';
import {AF} from "../../providers/af";
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import {ChatRooms} from './chat-rooms';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import * as firebase from 'firebase';
import { Component, OnInit ,Input, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit {
   @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    targetRef:any;
    storageRef:any;
  user:ChatRooms;
  user2;
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

arruserHTML=[];
  chatArr=[];
    users2:any;
   sendtoID : any;
      nameList = [];
  hideDiv : any;
  IDArray =[];
email2;
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
    this.arruserHTML=[];
    console.log(this.name);
    this.name = '';
    this.myMail=false;
    this.mail=true;

  }

    select(user,st: HTMLInputElement){
   for(var i = 0 ; i< this.users.length; i++)
   {
      if(this.users[i].name==this.user2)
      {
        this.email2=this.users[i].email;
      }
   }
   if(this.arruser[0]!=firebase.auth().currentUser.email )
   {
     this.arruser.push(firebase.auth().currentUser.email);
   }
		this.currentUser = user; 
    this.currentUser2 = user; 
     if(this.user2==this.afService.displayName ||this.user2==this.afService.email )
    {
      alert("you already in this group")
       st.value = null;
      return;
    }   
    if(this.user2==undefined)
    {
      alert("Please Select a freind.")
      return;
    }

    for(var i = 0 ; i<this.arruser.length;i++)
    {
      if(this.user2==this.arruser[i])
       {
          alert("You Already Added This Freind.")
          st.value = null;
           return;
        }

          else if(this.email2==this.arruser[i])
       {
        alert("You already in this group");
          st.value = null;
           return;
        }
    }

    this.arruser.push(this.email2);
    for(var i = 1 ; i<this.arruser.length;i++)
    {
      this.arruserHTML[i-1]=this.arruser[i];
    }

    this.user2=undefined;  
    st.value = null;
   
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
    console.log(this.afService.displayName);
     this.storageRef = firebase.storage().ref();
      this.hideDiv = {};
      this.users2 = this.af.database.list('registeredUsers');
      this.sendtoID = "";
      
  }

 ngOnInit() {
    this._groupsService.getUsers()
    .subscribe(users => {this.users = users});
    this._groupsService.getGroups()
    .subscribe(groups => {this.groups = groups});


    //get user's name list for autocomplete
    firebase.database().ref("registeredUsers").orderByValue().on("value" ,(data)=>{
      data.forEach((snap) =>{
        this.nameList.push(snap.val().name);
        return false;
      });
    });
    if(this.afService.currUserStatus == 1)
      this.nameList.unshift("Broadcast");

      //get user's name list that send me message
      firebase.database().ref("privateMessages").orderByValue().on("value" ,(data)=>{
        data.forEach((snap) =>{
              if(snap.val().sentfromID == snap.val().senttoID && snap.val().senttoID == this.afService.currUserID)
                this.IDArray.unshift(snap.val().senttoID);
              else if(this.afService.currUserID == snap.val().sentfromID)
                this.IDArray.unshift(snap.val().senttoID);
              else if(this.afService.currUserID == snap.val().sendtoID)
                this.IDArray.unshift(snap.val().sentfromID);
              return false;
        })
      });

      this.IDArray = Array.from(new Set(this.IDArray));





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
     this.af.database.object('/group/'+key).update({admin : ""});
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




  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getUserID(username) : void{

    this.user2=username;
    console.log(username);

  };





}
