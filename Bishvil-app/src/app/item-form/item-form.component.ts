import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

    public item : item;

  constructor(public afService : AF) { }

  ngOnInit() {
    this.item = { location: "", description: "", type: "" };
  }

  addItem(){
    this.afService.addItem(this.item);
  }

}

export class item{
    type : string;
    description : string;
    location : string;
}