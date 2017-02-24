import React, {Component} from 'react';
import AuthService from './authservice';

export default class LoginPage extends Component {

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="logo"></div>
          <div className="button" onClick={this._login}>Log in</div>
        </div>
      </div>
    )
  }

  _login() {
    AuthService.login();
  }
}