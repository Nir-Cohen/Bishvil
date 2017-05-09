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
import { NightComponent } from './night/night.component';
import { NightFormComponent } from './night-form/night-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ProfileComponent } from './profile/profile.component';
import { BoxMessagesComponent } from './box-messages/box-messages.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
//import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { DialogComponent } from './dialog/dialog.component';
import { PromptComponent } from './prompt/prompt.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { AlertComponent } from './alert/alert.component';
import { MessagesComponent } from './messages/messages.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {ProfilesComponent} from './profiles/profiles.component';
import {DropdownModule} from "ng2-dropdown";

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
  { path: 'items', component: ItemsComponent},
  { path: 'night', component: NightComponent},
  { path: 'night-form', component: NightFormComponent},
  { path: 'item-form' , component: ItemFormComponent},
  { path: 'profile' , component: ProfileComponent},
  { path: 'box-messages', component:BoxMessagesComponent},
  { path: 'messages', component:MessagesComponent},
  { path: 'profiles', component:ProfilesComponent}
  
];

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    DatePickerModule,
    BootstrapModalModule,
    Ng2AutoCompleteModule,
    DropdownModule,
    
  ],
  declarations: [
     AppComponent,
     LoginPageComponent,
     HomePageComponent,
     RegistrationPageComponent, 
     ChatComponent, 
     HostComponent, 
     HostFormComponent, 
     ItemsComponent, 
     NightComponent, 
     NightFormComponent, 
     ItemFormComponent, 
     ProfileComponent, 
     BoxMessagesComponent, 
     DialogComponent, 
     PromptComponent, ConfirmComponent, AlertComponent, MessagesComponent,ProfilesComponent ],
  bootstrap: [ AppComponent ],
  providers: [AF],
  entryComponents: [PromptComponent,ConfirmComponent]
})

export class AppModule { }
