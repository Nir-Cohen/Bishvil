import { Component, OnInit} from '@angular/core';
import {HostFormComponent} from 'app/host-form/host-form.component';
import {FirebaseListObservable} from "angularfire2";
import {AF} from 'providers/af';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  
})
export class HostComponent implements OnInit {
  
  public hosting: FirebaseListObservable<any>;
  constructor(public afService: AF) { 
    this.hosting = this.afService.hosting;
    console.log("from host"+afService.displayName);
    console.log("from host"+afService.status);
  }




  ngOnInit() {
  }

  

}
