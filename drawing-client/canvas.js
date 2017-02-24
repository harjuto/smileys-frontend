
var CanvasFactory = (function() {

  var colors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#000000"
  ];

  function SmileyCanvas() {
    var canvas = document.getElementsByClassName('smiley-canvas')[0];
    var canvasSize = Math.min(Math.min(window.innerWidth, window.innerHeight), 600);
    canvas.width  = canvasSize;
    canvas.height = canvasSize;
    var color = colors[Math.floor(Math.random()*colors.length)];
    var context = canvas.getContext("2d");
    var mouseDown = false;
    var userProfile;

    var lastX, lastY;
    var smoothedVelocity = 0, velocity = 0;
    function draw(x,y, drawing) {
      x = Math.round(x);
      y = Math.round(y);
      if(lastX && lastY) {
        velocity = Math.min(Math.abs(Math.sqrt((lastX - x) * (lastX - x) + (lastY - y) * (lastY - y))), 15);
        smoothedVelocity += velocity * 0.1;
        smoothedVelocity = Math.min(smoothedVelocity, velocity);
      }
      if (drawing) {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = Math.max(smoothedVelocity, 2);
        context.lineJoin = "round";
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
      }
      lastX = x;
      lastY = y;
    }
    function createUserEvents() {

      var press = function (e) {
          // Mouse down location
          var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
          var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
          mouseDown = true;
          window.requestAnimationFrame( function () {
            draw(mouseX, mouseY, false)
          });
          window.requestAnimationFrame( function () {
            draw(mouseX - 1, mouseY - 1, true)
          });


      };
      var drag = function (e) {
          if (!mouseDown) return;
          var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
            mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
          window.requestAnimationFrame( function () {
            draw(mouseX - 1, mouseY - 1, true)
          });
          // Prevent the whole page from dragging if on mobile
          e.preventDefault();
        };

      // Add mouse event listeners to canvas element
      canvas.addEventListener("mousedown", press, false);
      canvas.addEventListener("mouseup", function() {mouseDown = false}, false);
      canvas.addEventListener("mousemove", drag, false);
      canvas.addEventListener("mouseout", function() {mouseDown = false}, false);

      // Add touch event listeners to canvas element
      canvas.addEventListener("touchstart", press, false);
      canvas.addEventListener("touchend", function() {mouseDown = false}, false);
      canvas.addEventListener("touchmove", drag, false);
      canvas.addEventListener("touchleave", function() {mouseDown = false}, false);
      canvas.addEventListener("touchcancel", function() {mouseDown = false}, false);

    }

    return {
      init: function (profile) {
        document.getElementById('container').setAttribute('class', 'logged-in');
        document.getElementsByClassName('profile-picture')[0].src = profile.picture;
        userProfile = profile;
        createUserEvents();
      },
      serializeImage: function() {
        var smallCanvas = document.createElement("canvas");
        smallCanvas.width = 160;
        smallCanvas.height = 160;
        var smallCtx = smallCanvas.getContext('2d');
        smallCtx.drawImage(canvas, 0, 0, 160, 160);
        var dataurl = smallCanvas.toDataURL("image/png");

        return JSON.stringify({
          image: dataurl,
          name: userProfile.name
        });
      },
      clear: function (){
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

  }

  return {
    create: function() {
      return new SmileyCanvas();
    }
  }
})();