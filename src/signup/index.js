import React from 'react';
import './index.css';
import SignUpUser from './SignUpUser';
import { withRouter } from 'react-router';

class SignUp extends React.Component {

  updateSignUp = () => {
    this.props.updateSignUp();
  }

  render(){
    return (
      <div>
        <div>
          <SignUpUser updateSignUp={this.updateSignUp}/>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
