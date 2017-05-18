import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import * as firebase from 'firebase';

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
  public news: FirebaseListObservable<any>;
  public group: FirebaseListObservable<any>;
  public nameOfGroup="~general Chet~";
  public arrusers = [];
  public groups: FirebaseListObservable<any>;
  public registeredUsers: FirebaseListObservable<any>;
  public privateMessages : FirebaseListObservable<any>;


  public OK_key:string;
  public storageRef : any;
  public targetRef : any;

  public currUserName : any;
  public currUserID : any;
  public currUserCity : any;
  public currUserDOB : any;
  public currUserURL : any;
  public currUserStatus : any;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
      });

    this.targetRef = firebase.storage().ref();
    this.messages = this.af.database.list("messages");
    this.users = this.af.database.list("users");
    this.event = this.af.database.list("events");
    this.item = this.af.database.list("items");
    this.hosting = this.af.database.list("hosting");
    this.status = "1";
    this.news = this.af.database.list("news");

    this.group = this.af.database.list("group");

    this.privateMessages = this.af.database.list("privateMessages")
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
      note: hosting.note,
      author: this.displayName,
      counter: 0,
      firstName: hosting.firstName,
      lastName: hosting.lastName,
      phoneOne:hosting.phoneOne,
      phoneTwo:hosting.phoneTwo,
      numberHost:hosting.numberHost,
      userArr: [""] ,
      photoURL: hosting.photoURL,
    });
    console.log(hosting);
}

removeHosting(hosting)
{
  this.hosting.remove();
  
}
addItem(item){
  this.item.push({
      location: item.location,
      description: item.description,
      type: item.type,
      author : item.author,
      photoURL : item.photoURL
  });

}



addNews(news){
  this.news.push({
    message: news.message

  });

}

/*
  uploadFile(fbsPath,targetFile) {
      let promise = new Promise((res,rej) => {
        this.targetRef =this.storageRef.child(fbsPath);
        let task=this.targetRef.put(targetFile);
        task.on('state_changed',
          (snapshot:any) => {
            console.log(snapshot.state);
          },
          (error:any) => {
            console.log(error.code);
            rej(error);
          },
          () => {
            let downloadUrl = task.snapshot.downloadURL;
            //this.url = downloadUrl;
            console.log(downloadUrl);
            res(downloadUrl);
          }
        );
      })
      return promise;
    }
*/
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
      return this.af.database.object('registeredUsers/' + firebase.auth().currentUser.uid).update({
        name: this.displayName,
        email: this.email,
        status:this.status,
        photoURL : firebase.auth().currentUser.photoURL
        /*city : "",//removes itself every time
        dob : ""*/
      });

  }

  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  sendMessage(text,nameofgroup) {
    var message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now(),
      nameOfGroup: nameofgroup,
    };
    this.messages.push(message);
  }


  /**
   *
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password){//,status) {
    console.log(email);
    console.log(status);
    return this.af.auth.createUser({
      email: email,
      password: password,
      //status:status,
    });


  }

  /**
   *
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email,status) {
    
    return this.af.database.object('registeredUsers/' + uid).update({
      name: name,
      email: email,
      status:status,
      photoURL : firebase.auth().currentUser.photoURL,
      
    });
    
  }

  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password){//,status) {
    return this.af.auth.login({
        email: email,
        password: password,
        //status:status,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  addGroup(text,arr){
    var details = {
      name: text,
      displayName: this.displayName,
      email: this.email,
      userArr:arr,
      admin:arr[0]
    };
    this.group.push(details);
  }

}
