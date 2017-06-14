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
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { ChatRoomsService } from './chat-rooms/chat-rooms.service';
import { ChatRoomsSonComponent } from './chat-rooms-son/chat-rooms-son.component';
import { DropdownModule } from 'ng2-dropdown';
import { HostProfilesComponent } from './host-profiles/host-profiles.component';
import { ChatProfilesComponent } from './chat-profiles/chat-profiles.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { Confirm2Component } from './confirm2/confirm2.component';
import { NightProfilesComponent } from './night-profiles/night-profiles.component';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translation';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


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
  { path: 'profiles', component:ProfilesComponent},
  { path: 'chat-rooms', component:ChatRoomsComponent},
  { path: 'host-profiles', component:HostProfilesComponent},
  { path: 'chat-profiles', component:ChatProfilesComponent},
  { path: 'forget-pass', component:ForgetPassComponent},
  { path: 'night-profiles', component:NightProfilesComponent},
  { path: 'user-verify', component:VerifyUserComponent},
  { path: 'contact-us', component:ContactUsComponent},
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
     PromptComponent, ConfirmComponent,Confirm2Component, AlertComponent, MessagesComponent,ProfilesComponent, ChatRoomsComponent, ChatRoomsSonComponent, HostProfilesComponent, ChatProfilesComponent, ForgetPassComponent, Confirm2Component, NightProfilesComponent, VerifyUserComponent, WaitForConfirmComponent, ContactUsComponent ],
  bootstrap: [ AppComponent ],
  providers: [AF,ChatRoomsService,TRANSLATION_PROVIDERS, TranslateService],
  entryComponents: [PromptComponent,ConfirmComponent,Confirm2Component]
})

export class AppModule { }
