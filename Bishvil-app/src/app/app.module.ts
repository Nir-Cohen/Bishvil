import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule, Routes} from "@angular/router";
import {AF} from "../providers/af";
import { HomePageComponent } from './home-page/home-page.component';
import {FormsModule} from "@angular/forms";
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ChatComponent } from './chat/chat.component';
import { HostComponent } from './host/host.component';
import { HostFormComponent } from './host-form/host-form.component';
import { DatePickerModule } from 'ng2-datepicker';
import { ItemsComponent } from './items/items.component';


export const firebaseConfig = {
    apiKey: "AIzaSyCjyJqa4ix5ZFAfQIPfNCLZfcV6dOpLX18",
    authDomain: "test-f29de.firebaseapp.com",
    databaseURL: "https://test-f29de.firebaseio.com",
    storageBucket: "test-f29de.appspot.com",
    messagingSenderId: "808339653368"
};

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'host', component: HostComponent},
  { path: 'host-form', component: HostFormComponent},
  
];

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    DatePickerModule 
  ],
  declarations: [ AppComponent, LoginPageComponent, HomePageComponent, RegistrationPageComponent, ChatComponent, HostComponent, HostFormComponent, ItemsComponent ],
  bootstrap: [ AppComponent ],
  providers: [AF]
})

export class AppModule { }