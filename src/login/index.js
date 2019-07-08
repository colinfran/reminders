import React from 'react';
import './index.css';
import SignInSide from './SignInSide';

class Login extends React.Component {

  updateLogin = () => {
    this.props.updateLogin();
  }

  render(){
    return (
      <div>
        <div>
          <SignInSide updateLogin={this.updateLogin} />
        </div>
      </div>
    );
  }
}

export default Login;
