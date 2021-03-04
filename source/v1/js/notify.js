/**
 * Sends web notifications to the user representing the state of the timer.
 * @param {number} n_state number denoting the state of the timer. 
 * See timerContainer.js for timer state values.
 */
function notify(n_state){
  let o_options = {
    silent: true
  }
  //check if notifications are supported
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
  }
  
  //check is notifications are turned on
  if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      //ask user to enable notifications
      if (permission !== "granted") {
        alert("Please enable notifictaions.");
      }
      
      //send notification
      else if(Notification.permission !== "denied"){
        
        //start new pomo notif
        if(n_state==0){
          let o_notification = new Notification("Time to start the next work session!",o_options);
          let o_audio = document.getElementById("notifs");
          o_audio.play();
          return o_notification;
        }
        //start short break notif
        else if(n_state==1){
          let o_notification = new Notification("Time for a short break!",o_options);
          let o_audio = document.getElementById("notifs");
          o_audio.play();
          return o_notification;
        }
        
        //start long break notif
        else if(n_state==2){
          let o_notification = new Notification("Time for a long break!",o_options);
          let o_audio = document.getElementById("notifs");
          o_audio.play();
          return o_notification
        }
      
        //end of session notif
        else{
          let o_notification = new Notification("All tasks completed. Good work!",o_options);
          let o_audio = document.getElementById("notifs");
          o_audio.play();
          return o_notification;
        }
      }
    });
  }
}

export { notify };
