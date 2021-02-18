/**
 * Sends web notifications to the user representing the state of the timer.
 * @param n_state number denoting the state of the timer. 
 * See timerContainer.js for timer state values.
 */
function notify(n_state){
  let o_options = {
    silent: true
  }

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
  }
  
  if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission !== "granted") {
        alert("Please enable notifictaions.");
      }
      
      else if(Notification.permission !== "denied"){
        
        if(n_state==0){
          var o_notification = new Notification("Time to start the next work session!",o_options);
          var o_audio = document.getElementById("audio");
          o_audio.play();
        }
        
        else if(n_state==1){
          var o_notification = new Notification("Time for a short break!",o_options);
          var o_audio = document.getElementById("audio");
          o_audio.play();
        }
        
        else if(n_state==2){
          var o_notification = new Notification("Time for a long break!",o_options);
          var o_audio = document.getElementById("audio");
          o_audio.play();
        }
      
        else{
          var o_notification = new Notification("All tasks completed. Good work!",o_options);
          var o_audio = document.getElementById("audio");
          o_audio.play();
        }
      }
    });
  }
} 
  /*if(n_state==0){
    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var o_notification = new Notification("Time to start the next work session!",o_options);
      var o_audio = document.getElementById("audio");
      o_audio.play();
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var o_notification = new Notification("Time to start the next work session!",o_options);
          var o_audio = document.getElementById("audio");
          o_audio.play();
        }
      });
    }
  }

  else if(n_state==1){
    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var o_notification = new Notification("Time for a short break!",o_options);
      var o_audio = document.getElementById("audio");
      o_audio.play();
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var o_notification = new Notification("Time for a short break!",o_options);
          var o_audio = document.getElementById("audio");
          o_audio.play();
        }
      });
    }  
  }

  else if(n_state==2){
    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var o_notification = new Notification("Time for a long break!",o_options);
      var o_audio = document.getElementById("audio");
      o_audio.play();
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var o_notification = new Notification("Time for a long break!",o_options);
          var o_audio = document.getElementById("audio");
          o_audio.play();
        }
      });
    }  
  }
  
  else{
    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var o_notification = new Notification("All tasks completed. Good work!",o_options);
      var o_audio = document.getElementById("audio");
      o_audio.play();
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var o_notification = new Notification("All tasks completed. Good work!",o_options);
          var o_audio = document.getElementById("audio");
          o_audio.play();
        }
      });
    }
  }

}*/

 /*function startTime(){
  window.setTimeout(notifyPomo(),1000);
  window.setTimeout(notifySB(),4000);
  window.setTimeout(notifyPomo(),5000);
  window.setTimeout(notifySB(),8000);
  window.setTimeout(notifyLB(),9000);
  window.setTimeout(notifyEnd(),11000);
}

function notifyPomo() {
    //check if the browser supports notifications
    let o_options = {
      silent: true
    }
    if (!("Notification" in window)) {
     alert("This browser does not support desktop notifications.");
   }
 
   // Let's check whether notification permissions have already been granted
   else if (Notification.permission === "granted") {
     // If it's okay let's create a notification
     var notification = new Notification("Time to start the next work session!",o_options);
     var audio = document.getElementById("audio");
     audio.play();
   }
 
   // Otherwise, we need to ask the user for permission
   else if (Notification.permission !== "denied") {
     Notification.requestPermission().then(function (permission) {
       // If the user accepts, let's create a notification
       if (permission === "granted") {
         var notification = new Notification("Time to start the next work session!",o_options);
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
 
 }*/
