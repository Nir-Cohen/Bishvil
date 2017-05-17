import { Component, OnInit} from '@angular/core';
import {HostFormComponent} from 'app/host-form/host-form.component';
import {AF} from 'providers/af';
import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from "app/confirm/confirm.component";

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  
})
export class HostComponent implements OnInit {
  
  confirmResult:boolean = null;
  key:string;
  author:string;
  arrusers=[];

  public hosting: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  constructor(private dialogService:DialogService,public afService: AF,public af: AngularFire) { 
  this.hosting = this.afService.hosting;
  this.users = this.af.database.list("registeredUsers");
  }
  deleteItem(key : string){
    console.log("Removing "+ key);
    this.hosting.remove(key);
   }



  ngOnInit() {
  }

  showConfirm(key: string) {
    
    this.afService.OK_key=key;
    console.log(this.afService.OK_key);
    this.dialogService.addDialog(ConfirmComponent, {
      title:'Confirmation',
      message:'Are you sure you want to join this Shabbat?'})
      .subscribe((isConfirmed)=>{
        //Get dialog result
        this.confirmResult = isConfirmed;
    });
    console.log(this.confirmResult);
  }
  
  show(key: string) {
    this.afService.OK_key=key;  
    var host = this.af.database.object('/hosting/'+key); // How to get value
    host.subscribe(snapshot => {  
    this.arrusers = snapshot.userArr;
  });
   this.afService.arrusers=this.arrusers;

  }

  showPeople(info:string)
  {
    /*
    var host = this.af.database.object('/hosting/'+info,{ preserveSnapshot: true}); // How to get value
    host.subscribe(snapshot => {          
    this.author = snapshot.val().author;   
  });
    console.log(this.author);
    */
  }
}



