function notifyPomo() {
    //check if the browser supports notifications
   if (!("Notification" in window)) {
     alert("This browser does not support desktop notifications.");
   }
 
   // Let's check whether notification permissions have already been granted
   else if (Notification.permission === "granted") {
     // If it's okay let's create a notification
     var notification = new Notification("Time to start the next work session!");
     var audio = document.getElementById("audio");
     audio.play();
   }
 
   // Otherwise, we need to ask the user for permission
   else if (Notification.permission !== "denied") {
     Notification.requestPermission().then(function (permission) {
       // If the user accepts, let's create a notification
       if (permission === "granted") {
         var notification = new Notification("Time to start the next work session!");
         var audio = document.getElementById("audio");
         audio.play();
       }
     });
   }
 
 }

function notifySB() {
   //check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Time for a short break!");
    var audio = document.getElementById("audio");
    audio.play();
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Time for a short break!");
        var audio = document.getElementById("audio");
        audio.play();
      }
    });
  }

}

function notifyLB() {
    //check if the browser supports notifications
   if (!("Notification" in window)) {
     alert("This browser does not support desktop notifications.");
   }
 
   // Let's check whether notification permissions have already been granted
   else if (Notification.permission === "granted") {
     // If it's okay let's create a notification
     var notification = new Notification("Time for a long break!");
     var audio = document.getElementById("audio");
     audio.play();
   }
 
   // Otherwise, we need to ask the user for permission
   else if (Notification.permission !== "denied") {
     Notification.requestPermission().then(function (permission) {
       // If the user accepts, let's create a notification
       if (permission === "granted") {
         var notification = new Notification("Time for a long break!");
         var audio = document.getElementById("audio");
        audio.play();
       }
     });
   }
 
 }

 function notifyEnd() {
    //check if the browser supports notifications
   if (!("Notification" in window)) {
     alert("This browser does not support desktop notifications.");
   }
 
   // Let's check whether notification permissions have already been granted
   else if (Notification.permission === "granted") {
     // If it's okay let's create a notification
     var notification = new Notification("All tasks completed. Good work!");
     var audio = document.getElementById("audio");
     audio.play();
   }
 
   // Otherwise, we need to ask the user for permission
   else if (Notification.permission !== "denied") {
     Notification.requestPermission().then(function (permission) {
       // If the user accepts, let's create a notification
       if (permission === "granted") {
         var notification = new Notification("All tasks completed. Good work!");
         var audio = document.getElementById("audio");
         audio.play();
       }
     });
   }
 
 }
