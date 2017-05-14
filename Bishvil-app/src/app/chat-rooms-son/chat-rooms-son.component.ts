import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AF} from "../../providers/af"
import {ChatRoomsService} from '../chat-rooms/chat-rooms.service';
import {NgForm} from '@angular/forms';
import { FirebaseListObservable, AngularFire } from "angularfire2";
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat-rooms-son',
  templateUrl: './chat-rooms-son.component.html',
  styleUrls: ['./chat-rooms-son.component.css'],
  inputs:['user']
})
export class ChatRoomsSonComponent implements OnInit {
  
  @Output() deleteEvent = new EventEmitter<ChatRoomsSonComponent>();
  @Output() selectEvent = new EventEmitter<ChatRoomsSonComponent>();

  user:ChatRoomsSonComponent;
  isSelectUser=true;

  sendcancel(){
  this.deleteEvent.emit(this.user);
  this.isSelectUser=true;
}

sendselect(){
  this.selectEvent.emit(this.user);
  this.isSelectUser=false;
}

  constructor() { }

  ngOnInit() {
  }

}
