import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public status: string;
  public user: FirebaseObjectObservable<any>;
  public event: FirebaseListObservable<any>;
  public item: FirebaseListObservable<any>;
  public hosting: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
      });

    this.messages = this.af.database.list('messages');
    this.users = this.af.database.list('users');
    this.event = this.af.database.list("events");
    this.item = this.af.database.list("items");
    this.hosting = this.af.database.list("hosting");
    //this.af.auth.getAuth().auth.sendEmailVerification();
  }


addEvent(item){
  this.event.push({
      location: item.location,
      time: item.time,
      note: item.note
    });
}

addHosting(hosting){
  this.hosting.push({
      location: hosting.location,
      time: hosting.time,
      note: hosting.note
    });
}

addItem(item){
  this.item.push({
      location: item.location,
      description: item.description,
      type: item.type
  });

}


  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }
emailVerfication()
{
  return this.af.auth.getAuth().auth.sendEmailVerification();
}

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }

  /**
   *
   */
  addUserInfo(){
    //We saved their auth info now save the rest to the db.
    this.users.push({
      email: this.email,
      displayName: this.displayName
    });
  }

  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  sendMessage(text) {
    var message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now()
    };
    this.messages.push(message);
  }

  /**
   *
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password,status) {
    console.log(email)
    return this.af.auth.createUser({
      email: email,
      password: password,
      status:status
    });


  }

  /**
   *
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email,status) {
    return this.af.database.object('registeredUsers/' + uid).set({
      name: name,
      email: email,
      status: status,
    });
  }

  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password,status) {
    return this.af.auth.login({
        email: email,
        password: password,
        status:status,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

}
