/**
 * Adds timer integration. 
 * Wait times in milliseconds and cumulative
 * Press button to start, then alerts at auto intervals
 */
function startTime(){
  window.setTimeout(notifyPomo(),1000);
  window.setTimeout(notifySB(),4000);
  window.setTimeout(notifyPomo(),5000);
  window.setTimeout(notifySB(),8000);
  window.setTimeout(notifyLB(),9000);
  window.setTimeout(notifyEnd(),11000);
}

function notifyPomo() {
    //check if the browser supports notifications
    let options = {
      silent: true
    }
    if (!("Notification" in window)) {
     alert("This browser does not support desktop notifications.");
   }
 
   // Let's check whether notification permissions have already been granted
   else if (Notification.permission === "granted") {
     // If it's okay let's create a notification
     var notification = new Notification("Time to start the next work session!",options);
     var audio = document.getElementById("audio");
     audio.play();
   }
 
   // Otherwise, we need to ask the user for permission
   else if (Notification.permission !== "denied") {
     Notification.requestPermission().then(function (permission) {
       // If the user accepts, let's create a notification
       if (permission === "granted") {
         var notification = new Notification("Time to start the next work session!",options);
         var audio = document.getElementById("audio");
         audio.play();
       }
     });
   }
 
 }

function notifySB() {
   //check if the browser supports notifications
   let options = {
    silent: true
  }
   if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Time for a short break!",options);
    var audio = document.getElementById("audio");
    audio.play();
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Time for a short break!",options);
        var audio = document.getElementById("audio");
        audio.play();
      }
    });
  }

}

function notifyLB() {
    //check if the browser supports notifications
    let options = {
      silent: true
    }
    if (!("Notification" in window)) {
     alert("This browser does not support desktop notifications.");
   }
 
   // Let's check whether notification permissions have already been granted
   else if (Notification.permission === "granted") {
     // If it's okay let's create a notification
     var notification = new Notification("Time for a long break!",options);
     var audio = document.getElementById("audio");
     audio.play();
   }
 
   // Otherwise, we need to ask the user for permission
   else if (Notification.permission !== "denied") {
     Notification.requestPermission().then(function (permission) {
       // If the user accepts, let's create a notification
       if (permission === "granted") {
         var notification = new Notification("Time for a long break!",options);
         var audio = document.getElementById("audio");
        audio.play();
       }
     });
   }
 
 }

 function notifyEnd() {
    //check if the browser supports notifications
    let options = {
      silent: true
    }
    if (!("Notification" in window)) {
     alert("This browser does not support desktop notifications.");
   }
 
   // Let's check whether notification permissions have already been granted
   else if (Notification.permission === "granted") {
     // If it's okay let's create a notification
     var notification = new Notification("All tasks completed. Good work!",options);
     var audio = document.getElementById("audio");
     audio.play();
   }
 
   // Otherwise, we need to ask the user for permission
   else if (Notification.permission !== "denied") {
     Notification.requestPermission().then(function (permission) {
       // If the user accepts, let's create a notification
       if (permission === "granted") {
         var notification = new Notification("All tasks completed. Good work!",options);
         var audio = document.getElementById("audio");
         audio.play();
       }
     });
   }
 
 }
