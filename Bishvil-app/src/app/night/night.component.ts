import { Component, OnInit } from '@angular/core';
import { AF } from 'providers/af';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from "app/confirm/confirm.component";
import * as firebase from 'firebase';

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.css']
})
export class NightComponent implements OnInit {

  public users: FirebaseListObservable<any>;
  public events: FirebaseListObservable<any>;
  public UserAreComing = [];
  public comingFromSnap = [];
  confirmResult:boolean = null;

  constructor(public afService: AF, public af: AngularFire,private dialogService:DialogService) 
  {
    this.events = this.afService.event;
    this.users = this.af.database.list("registeredUsers");
  }

  ngOnInit() {
  }

  leave(key: string) 
  {
    this.afService.OK_key = key;
    var event = this.af.database.object('/events/' + this.afService.OK_key); // How to get value
    event.subscribe(snapshot => {
      this.UserAreComing = snapshot.userArr;
    });
    var i = 0;
    for (i = 0; i < this.UserAreComing.length; i++) 
    {
      if (this.afService.displayName == this.UserAreComing[i] || this.afService.email == this.UserAreComing[i]) {
        break;
      }
    }
    this.UserAreComing.splice(i, 1);
    this.af.database.object('/events/' + this.afService.OK_key).update({ userArr: this.UserAreComing });
  }


  checkIfIn(key: string)
  {
    var i = 0;
    var event = this.af.database.object('/events/' + key); // How to get value
    event.subscribe(snapshot =>
     {
      this.comingFromSnap = snapshot.userAreComing;
    });
    for(i=0 ;i<this.comingFromSnap.length; i++)
    {
      if(this.comingFromSnap[i] == this.afService.email || this.comingFromSnap[i] == this.afService.displayName)
      {
        return true;
      }
    }            
    console.log(key);
    return false;
  }

 Join(key: string) 
 {
    this.afService.OK_key=key; 
    var x  = this.comingFromSnap.fill(this.afService.email);
    this.af.database.object('/events/'+this.afService.OK_key).update({userAreComing : x});
    console.log({userAreComing : x});
  }

  delete(key : string){
    this.events.remove(key);
   }
}
