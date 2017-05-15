
var controller = Leap.loop({enableGestures: true}, function(frame){
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              //console.log("Circle Gesture");
              break;
          case "keyTap":
              //console.log("Key Tap Gesture");
              break;
          case "screenTap":
              //console.log("Screen Tap Gesture");
              break;
          case "swipe":
              //console.log("Swipe Gesture");
              break;
        }
    });
  }
});

var controller = Leap.loop({enableGestures: true}, function(frame){
  //... handle frame data
});

controller.on("gesture", function(gesture){
  //... handle gesture object
});

var controllerOptions = {enableGestures: true};

Podium = {};
Podium.keydown = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.dispatchEvent(oEvent);
}

Leap.loop(controllerOptions, function(frame) {

  // Display Gesture object data
  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      if(gesture.type == "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  swipeDirection = "right";
                  Podium.keydown(39);
              } else {
                  swipeDirection = "left";
                  Podium.keydown(37);
              }
          } else { //vertical
              if(gesture.direction[1] > 0){
                  swipeDirection = "up";
                  Podium.keydown(38);
              } else {
                  swipeDirection = "down";
                  Podium.keydown(40);
              }                  
          }
          //console.log(swipeDirection)
       }
     }
  }
  var directionOutput = document.getElementById("directionData");

  var directionString = "Gesture Direction: " + swipeDirection + "<br />";
  directionOutput.innerHTML = "<div style='width:300px; float:left; padding:5px'>" + directionString + "</div>";

});




