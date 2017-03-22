import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public items : FirebaseListObservable<any>;

  constructor(public afService : AF) {

      this.items = this.afService.item;
   }

   myFunc(){
     console.log(this.items);
     for(let item1 in this.items){
        console.log( "  dasda  ");
     }
   }

  ngOnInit() {
  }

}
