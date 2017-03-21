import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'app/user.interface'
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.css']
})
export class HostFormComponent implements OnInit {
  public user: User;
  date: DateModel;
  options: DatePickerOptions;

  constructor() {
    this.options = new DatePickerOptions();
  }
  ngOnInit() {
    this.user = {
      name: '',
      address: {
        street: '',
        postcode: '8000'
      }
    };
  }
  save(model: User, isValid: boolean) {
    console.log(model, isValid);
  }

  goSubmit()
  {
    alert("save the info");
  }
}