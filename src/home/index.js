import React from 'react';
import './index.css';
import AppContainer from '../appcontainer';
import { messaging } from "../init-fcm";
import {addPushToken} from '../api'

class Home extends React.Component {

  logout = () =>{
    this.props.logout();
  }

  async componentDidMount() {
    messaging.requestPermission()
      .then(async function() {
        const token = await messaging.getToken();
        localStorage.setItem('pushToken', token);
        addPushToken(token);
        console.log(token);
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  }


  render(){
    return (
      <div>
        <AppContainer logout={this.logout}/>
      </div>
    );
  }
}

export default Home;
