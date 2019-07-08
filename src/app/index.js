import React from 'react';
import './index.css';
import Home from '../home';
import Login from '../login';
import SignUp from '../signup';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import {logoutUser} from '../api'
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loginBool: false,
      signupBool: false
    };
  }

  componentWillMount(){
    var boolAlreadySignedIn = localStorage.getItem('alreadySignedIn') === "true";
    if (boolAlreadySignedIn) this.setState({loginBool: true, signupBool: true});
  }

  updateLogin = () =>{ this.setState({loginBool: !this.state.loginBool})}
  updateSignUp = () =>{ this.setState({signupBool: !this.state.signupBool})}

  logout = () => {
    this.setState({loginBool: false, signupBool: false});
    localStorage.removeItem('alreadySignedIn');
    localStorage.removeItem('userId');
    logoutUser();
  }


  renderLogin = () => {
   if (this.state.loginBool) {
     return <Redirect to='/reminders' />
   }
   else{
     return <Login updateLogin={this.updateLogin}/>;
   }
 }

  renderSignUp = () => {
    if (this.state.signupBool) {
      return <Redirect to='/reminders' />
    }
    else{
      return <SignUp updateSignUp={this.updateSignUp}/>;
    }
  }

  renderReminders = () => {
    if (this.state.signupBool || this.state.loginBool) {
      return <Home logout={this.logout}/>;
    }
    else{
      return <Redirect to='/' />;
    }
  }

  render(){
    return (
      <div className="App">
        <div>
          <Router>
            <Route exact path="/" component={this.renderLogin} />
            <Route path="/signup" component={this.renderSignUp} />
            <Route path="/reminders" component={this.renderReminders} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
