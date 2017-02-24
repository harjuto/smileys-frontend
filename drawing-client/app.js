window.app = (function() {
  // var SERVER_URL = 'http://smileys-dev.eu-central-1.elasticbeanstalk.com';
  var SERVER_URL = 'http://localhost:9000';
  var SmileyCanvas;
  var auth0Options = {
    auth: {
      params: {
        scope: 'openid app_metadata'
      }
    }
  };
	var lock = new Auth0Lock('F8KK8WHxXHWRSQ58k90vAeAhAXJXZuWg', 'smileyboard.eu.auth0.com', auth0Options);
  lock.on("authenticated", function(authResult) {
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);
    getProfileAndStart();
  });
  lock.on('unrecoverable_error', function(error) {
    console.error(error);
    alert("Unable to login")
  });

  getProfileAndStart();

  function getProfileAndStart() {
    var idToken = localStorage.getItem('id_token');
    var accessToken = localStorage.getItem('access_token');
    if (idToken && accessToken) {
      lock.getUserInfo(accessToken, function(error, profile) {
        if (error) {
          signOut();
          return;
        }
        SmileyCanvas = CanvasFactory.create();
        SmileyCanvas.init(profile);
      });
    }
  }

  function clearCanvas() {
    SmileyCanvas.clear();
  }
  function signOut() {
    document.getElementById('container').setAttribute('class', '');
    localStorage.removeItem("access_token");
    window.location.href = "/";
  }
  return {
    signIn: function() {
			lock.show();
    },
    signOut: signOut,
    sendImage: function() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST',SERVER_URL + '/api/', true);
      xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('id_token'));
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
          clearCanvas();
          alert("Thanks");
        }
      };

      xhr.send(SmileyCanvas.serializeImage());

    },
    clear: clearCanvas
  };




})();

