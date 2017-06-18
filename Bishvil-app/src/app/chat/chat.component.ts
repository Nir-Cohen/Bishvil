import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
  nameof:string;
  public group: FirebaseListObservable<any>;
  public registeredUsers: FirebaseListObservable<any>;

  constructor(public afService: AF) {
    this.messages = this.afService.messages;
    this.group = this.afService.group;
    this.registeredUsers = this.afService.registeredUsers;
    this.nameof=this.afService.nameOfGroup;
    this.afService.nameOfGroup="~general Chat~";
  }

  ngOnInit() {
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage(){
    if (this.newMessage == null || this.newMessage == "")
      return;

    this.afService.sendMessage(this.newMessage, this.nameof);
    
    this.newMessage = '';
  }

  isYou(email) {
    if(email == this.afService.email)
      return true;
    else
      return false;
  }

  isMe(email) {
    if(email == this.afService.email)
      return false;
    else
      return true;
  }



}
