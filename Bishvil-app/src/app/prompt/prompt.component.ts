import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";


export interface PromptModel {
  title:string;
  question:string;
}

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})


export class PromptComponent extends DialogComponent<PromptModel, string> implements PromptModel {
  title: string;
  question: string;
  message: string = '';

  public news: news;

  ngOnInit() {
    this.news = { message: "" };
  }

  constructor(dialogService: DialogService, public afService: AF) {
    super(dialogService);
  }

  apply() {
    /*
    this.result = this.message;
    console.log(this.result);

    this.afService.addNews(this.result);

    this.close();
    */

    this.news.message = this.message;
    console.log(this.message);
    this.afService.addNews(this.news);
    this.close();
  }
}

export class news{
  message: string;
}