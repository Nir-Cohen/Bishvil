import {Component, OnInit } from '@angular/core';
import {AF} from 'providers/af'
import { PromptComponent } from 'app/prompt/prompt.component';
import { DialogService } from "ng2-bootstrap-modal";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  

  constructor(public afService:AF,private dialogService:DialogService) { 
    
  }
  
  ngOnInit() { }


  confirmResult:boolean = null;
  promptMessage:string = '';

 showPrompt() {
    this.dialogService.addDialog(PromptComponent, {
      title:'Name dialog',
      question:'What is your name?: '})
      .subscribe((message)=>{
        //We get dialog result
        this.promptMessage = message;
      });
  }




}
