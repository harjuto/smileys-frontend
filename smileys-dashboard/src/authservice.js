import Auth0Lock from 'auth0-lock';
import Profile from './profile';
const cid = "F8KK8WHxXHWRSQ58k90vAeAhAXJXZuWg";
const domain = "smileyboard.eu.auth0.com";

class AuthService {
  constructor() {
    var auth0Options = {
      auth: {
        params: {
          scope: 'openid app_metadata'
        }
      }
    };
    this.lock = new Auth0Lock(cid, domain, auth0Options);
    this.lock.on("authenticated", (authResult) => {
      this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        window.location.href = "/";
      });
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.location.href = "/"
  }

  getUserProfile() {
    // Check if token exists
    if (localStorage.getItem('profile')) {
      return new Profile(JSON.parse(localStorage.getItem('profile')));
    }
  }
}


export default new AuthService()
