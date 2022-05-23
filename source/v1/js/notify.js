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
        return;
    }
  
    //check if notifications are turned on
    if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            //ask user to enable notifications
            if (permission !== "granted") {
                alert("Please enable notifictaions.");
            }
        
            //send notification
            else if(Notification.permission !== "denied") {
                let s_alert = "All tasks completed. Good work!";
                //start new pomo notif
                if(n_state==0){ 
                    s_alert = "Time to start the next work session!";
                } else if(n_state==1) {
                    s_alert = "Time for a short break!";
                } else if(n_state==2) {
                    s_alert = "Time for a long break!";
                }
          
                let o_notification = new Notification(s_alert, o_options);

                // check safari
                let b_isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.
                  test(navigator.userAgent);

                //start new pomo notif
                if (b_isSafari) {
                    let o_promise = document.getElementById("notifs").play();

                    if (o_promise !== undefined) {
                        o_promise.catch(error => {
                            // Auto-play was prevented
                            // Show a UI element to let the user manually start playback
                            const b_showErrorNotification = localStorage.getItem("safari-error-notification");
                            console.log("catch error kjdshfkja" + b_showErrorNotification);

                            if (b_showErrorNotification == null || b_showErrorNotification == false || 
                                b_showErrorNotification == "false") {
                                // show error notification view
                                let o_notifi = document.querySelector("notification-box");
                                o_notifi.showNotificationBox();
                                localStorage.setItem("safari-error-notification", true)
                            }
                        }).then(() => {
                            // Auto-play started successfully
                            console.log("kjdshfkja");
                        });
                    }

                } else {
                    let o_audio = document.getElementById("notifs");
                    o_audio.play();
                }
                return o_notification;
            }
        });
    }
}

export { notify };
