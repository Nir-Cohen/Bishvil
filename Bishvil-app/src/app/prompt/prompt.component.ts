import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface PromptModel {
  title:string;
  question:string;
}

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
/*
export class PromptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/
export class PromptComponent extends DialogComponent<PromptModel, string> implements PromptModel {
  title: string;
  question: string;
  message: string = '';
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  apply() {
    this.result = this.message;
    this.close();
    console.log(this.result);
  }
}