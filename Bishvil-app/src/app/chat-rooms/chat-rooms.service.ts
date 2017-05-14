import { Injectable } from '@angular/core';
import {AngularFire,FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class ChatRoomsService {

  usersObservable;
  groupsObservable;

  getUsers(){
   this.usersObservable = this.af.database.list('/registeredUsers');
   return this.usersObservable;    
  }
  getGroups(){
    this.groupsObservable = this.af.database.list('/group');
    return this.groupsObservable;   
  }


  constructor(private af:AngularFire) { }

}
