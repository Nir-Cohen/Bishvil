import { Component, OnInit ,EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.css']
})
export class HostFormComponent implements OnInit {
  user = {mail: '', password: ''};

  onsubmit(form)
  {
    this.user.mail = form.value['email'];
    this.user.password = form.controls['password'].value;
  }

    constructor() { }

    ngOnInit() 
    {
    }
   
}
