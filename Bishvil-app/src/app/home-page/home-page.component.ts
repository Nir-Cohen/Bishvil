import {Component, OnInit } from '@angular/core';
import {AF} from 'providers/af'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  

  constructor(public afService:AF) { 
    console.log("in home page"+this.afService.status);
  }
  
  ngOnInit() { }

}
