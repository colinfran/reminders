// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';


var firebaseConfig = {
  apiKey: "AIzaSyCtgzi-CiZvfh2BNGIwsfhdQAolPZ9X9co",
  authDomain: "reminders-26cb2.firebaseapp.com",
  databaseURL: "https://reminders-26cb2.firebaseio.com",
  projectId: "reminders-26cb2",
  storageBucket: "reminders-26cb2.appspot.com",
  messagingSenderId: "1036503965333",
  appId: "1:1036503965333:web:fb6dd85f0bb5e3a9"

};

export let app = firebase.initializeApp(firebaseConfig);

export function addUser(email, password, fname, lname){
  app.auth().createUserWithEmailAndPassword(email, password).then(data => {
    console.log("successful");
    console.log("User ID :- ", data.user.uid);
    localStorage.setItem('userId', data.user.uid);
    localStorage.setItem('alreadySignedIn', 'true');
    app.database().ref('users/' + data.user.uid).set({
      firstName: fname,
      lastName: lname,
      email: email,
      reminders: {}
    });
   })
   .catch(error => {
     console.log(error.code);
     console.log(error.message);
     return false;
   });
   return true;
}

export function addPushToken(token){
  var userRef = app.database().ref("users/" + localStorage.getItem('userId'));

  userRef.update ({
     pushToken: token
  });

}

export function addNewReminder(title, description, on, time){
  var ref = app.database().ref('users/' + localStorage.getItem('userId') + '/reminders/').push();
  ref.set({
    title: title,
    description: description,
    on: on,
    time: time
  });
}

export function editReminder(key, title, description, on, time){
  app.database().ref('users/' + localStorage.getItem('userId') + '/reminders/' + key).set({
    title: title,
    description: description,
    on: on,
    time: time
  });
}

export function getReminders(){
  console.log("here");
  var val = {};
  var ref = app.database().ref('/users/' + localStorage.getItem('userId') + '/reminders/');
  ref.on('value', function(snapshot) {
    console.log(snapshot.val())
    val = snapshot.val();
    return val;
  });
  return val;
}

export function logoutUser(){
  app.auth().signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened
    });
}
