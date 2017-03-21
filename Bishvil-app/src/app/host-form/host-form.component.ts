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
  date_s: DateModel; //Choose from when.
  date_f:DateModel;
  options: DatePickerOptions;

  constructor() {
    this.options = new DatePickerOptions();
  }
  ngOnInit() {
    this.user = {
      name: '',
      data: '',
      date_start:new DateModel(), //TODO: need to decalre a new date each time.
      date_finish:new DateModel(),
    };
  }
  save(model: User, isValid: boolean) {
    console.log(model, isValid);
  }

  goSubmit()
  {
    alert("User information:");
    console.log(this.user.name,this.user.data,this.user.date_start,this.user.date_finish);
  }
}