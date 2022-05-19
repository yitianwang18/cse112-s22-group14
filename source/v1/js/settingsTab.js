// variable for turning on/off console logs used for debugging
const B_CONSOLE_LOG = false;

/**
 * Custom HTML element encapsulating all of the functionality related to the Menu List
 * @extends HTMLElement
 */
class SettingsTab extends HTMLElement {
    /**
     * Constructs a new Settings Display, initializing all elements and adding handlers
     */
    constructor() {
        super();
        this.o_menu = {};

        // background mask
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("settings-blocker", "hidden");
        o_wrapper_obj_back.id = "side-settings-blocker";
        // event to close the settings if you click outside of it
        o_wrapper_obj_back.addEventListener("click", this.closeSettingsTab.bind(this));

        // side menu
        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "settings-class";
        o_wrapper_obj.id = "side-settings";

        // close button
        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close", "btn", "hidden");
        o_close_button.title = "Close Settings";
        o_close_button.id = "close-settings";
        o_close_button.innerHTML = "&times;";
        // event to close the menu if you click the x
        o_close_button.addEventListener("click", this.closeSettingsTab.bind(this));

        // wrapper for input/headers
        let o_settings_title_wrapper = document.createElement("div");
        o_settings_title_wrapper.id = "settings-title";
        o_settings_title_wrapper.classList.add("hidden");

        let o_settings_title = document.createElement("h1");
        o_settings_title.innerText = "Settings";

        // wrapper for all settings
        let o_all_settings_wrapper = document.createElement("div");
        o_all_settings_wrapper.classList.add("hidden");
        o_all_settings_wrapper.id = "all-settings";

        // First Setting/Customization
        let o_setting_one_wrapper = document.createElement("div");
        o_setting_one_wrapper.classList.add("setting-wrap");

        let o_setting_one_title = document.createElement("label");
        o_setting_one_title.innerText = "Pomo Session Length:";

        let o_setting_one_buttons = document.createElement("div");
        o_setting_one_buttons.classList.add("settings-btns");

        let o_setting_one_btn_one = document.createElement("div");
        o_setting_one_btn_one.classList.add("settings-custom-btn");
        o_setting_one_btn_one.id = "sett-one-btn-one";
        o_setting_one_btn_one.innerHTML = "20"; 
        
        let o_setting_one_btn_two = document.createElement("div");
        o_setting_one_btn_two.classList.add("settings-custom-btn", "clicked-settings-btn");
        o_setting_one_btn_two.id = "sett-one-btn-two";
        o_setting_one_btn_two.innerHTML = "25"; 
        
        let o_setting_one_btn_three = document.createElement("div");
        o_setting_one_btn_three.classList.add("settings-custom-btn");
        o_setting_one_btn_three.id = "sett-one-btn-three";
        o_setting_one_btn_three.innerHTML = "30"; 

        o_setting_one_buttons.append(o_setting_one_btn_one, o_setting_one_btn_two, o_setting_one_btn_three);
        o_setting_one_wrapper.append(o_setting_one_title, o_setting_one_buttons);
        
        // Second Setting/Customization
        let o_setting_two_wrapper = document.createElement("div");
        o_setting_two_wrapper.classList.add("setting-wrap");

        let o_setting_two_title = document.createElement("label");
        o_setting_two_title.innerText = "Short Break Length:";

        let o_setting_two_buttons = document.createElement("div");
        o_setting_two_buttons.classList.add("settings-btns");

        let o_setting_two_btn_one = document.createElement("div");
        o_setting_two_btn_one.classList.add("settings-custom-btn", "clicked-settings-btn");
        o_setting_two_btn_one.id = "sett-two-btn-one";
        o_setting_two_btn_one.innerHTML = "5"; 
        
        let o_setting_two_btn_two = document.createElement("div");
        o_setting_two_btn_two.classList.add("settings-custom-btn");
        o_setting_two_btn_two.id = "sett-two-btn-two";
        o_setting_two_btn_two.innerHTML = "7.5"; 
        
        let o_setting_two_btn_three = document.createElement("div");
        o_setting_two_btn_three.classList.add("settings-custom-btn");
        o_setting_two_btn_three.id = "sett-two-btn-three";
        o_setting_two_btn_three.innerHTML = "10"; 

        o_setting_two_buttons.append(o_setting_two_btn_one, o_setting_two_btn_two, o_setting_two_btn_three);
        o_setting_two_wrapper.append(o_setting_two_title, o_setting_two_buttons);
        
                
        // Third Setting/Customization
        let o_setting_three_wrapper = document.createElement("div");
        o_setting_three_wrapper.classList.add("setting-wrap");

        let o_setting_three_title = document.createElement("label");
        o_setting_three_title.innerText = "Long Break Length:";

        let o_setting_three_buttons = document.createElement("div");
        o_setting_three_buttons.classList.add("settings-btns");

        let o_setting_three_btn_one = document.createElement("div");
        o_setting_three_btn_one.classList.add("settings-custom-btn");
        o_setting_three_btn_one.id = "sett-three-btn-one";
        o_setting_three_btn_one.innerHTML = "25"; 
        
        let o_setting_three_btn_two = document.createElement("div");
        o_setting_three_btn_two.classList.add("settings-custom-btn");
        o_setting_three_btn_two.id = "sett-three-btn-two";
        o_setting_three_btn_two.innerHTML = "30"; 
        
        let o_setting_three_btn_three = document.createElement("div");
        o_setting_three_btn_three.classList.add("settings-custom-btn", "clicked-settings-btn");
        o_setting_three_btn_three.id = "sett-three-btn-three";
        o_setting_three_btn_three.innerHTML = "35"; 

        o_setting_three_buttons.append(o_setting_three_btn_one, o_setting_three_btn_two, o_setting_three_btn_three);
        o_setting_three_wrapper.append(o_setting_three_title, o_setting_three_buttons);
        

        // Bottom note to explain settings
        let o_bottom_wrapper = document.createElement("div");
        o_bottom_wrapper.classList.add("centered-note");
        let o_bottom_note = document.createElement("footer");
        o_bottom_note.innerText = "Note: Numbers are in minutes";
        let o_bottom_example = document.createElement("footer");
        o_bottom_example.innerText = "(i.e. 7.5 = 7 minutes and 30 seconds)";
        o_bottom_wrapper.append(o_bottom_note, o_bottom_example);


        // Add each setting to settings wrapper
        o_all_settings_wrapper.append(o_setting_one_wrapper, o_setting_two_wrapper, o_setting_three_wrapper, o_bottom_wrapper);

        o_settings_title_wrapper.append(o_close_button, o_settings_title);
        o_wrapper_obj.append(o_settings_title_wrapper, o_all_settings_wrapper);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }


    /**
     * Function to show menu list display from the main user screen
     */
    showSettings() {
        if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - showSettings");
        }

        // // Don't show the text in the menu right away
        // this.querySelector("#settings-title").style.display = "none";
        let o_menu = this.querySelector("#side-settings");
        o_menu.style.display = "block";
        o_menu.classList.add("settings-class-open");
        this.querySelector("#side-settings-blocker").style.display = "block";


        // Show text after animation to prevent sandwiching
        setTimeout(() => {
            this.querySelector("#close-settings").style.display = "block";
            this.querySelector("#settings-title").style.display = "block";
            this.querySelector("#all-settings").style.display = "block";
        }, 290);

    }

    /**
     * Function to close menu list display from the main user screen
     */
    closeSettingsTab() {
        this.querySelector("#close-settings").style.display = "none";
        let o_menu = this.querySelector("#side-settings");

        o_menu.classList.remove("settings-class-open");
        this.querySelector("#side-settings-blocker").style.display = "none";
        this.querySelector("#settings-title").style.display = "none";
        this.querySelector("#all-settings").style.display = "none";
    }

    /**
     * THREE Event Handler Functions for changing POMO SESSION Length
     */
    /**
     * Event handler function to change pomo length to short (20)
     */
    PSLengthShort() {
      if (B_CONSOLE_LOG) {
        console.log("settingsTab.js - PSLengthShort")
      }
      let o_setting_one_btn_one = document.getElementById("sett-one-btn-one");
      // if not already on short pomo length, change it
      if (o_setting_one_btn_one.classList.contains("clicked-settings-btn") != true) {
        //make this button look clicked
        o_setting_one_btn_one.classList.add("clicked-settings-btn")
        //make other buttons in this setting not clicked
        let o_setting_one_btn_two = document.getElementById("sett-one-btn-two");
        o_setting_one_btn_two.classList.remove("clicked-settings-btn");
        let o_setting_one_btn_three = document.getElementById("sett-one-btn-three");
        o_setting_one_btn_three.classList.remove("clicked-settings-btn");
            
        // ADD FUNCTIONALITY HERE
      } else {
        if (B_CONSOLE_LOG) {
          console.log("Pomo Length Already On Short")
        }
      }
    }

    /**
     * Event handler function to change pomo length to medium (25)
     */
     PSLengthMed() {
        if (B_CONSOLE_LOG) {
          console.log("settingsTab.js - PSLengthMed")
        }
        let o_setting_one_btn_two = document.getElementById("sett-one-btn-two");
        // if not already on medium pomo length, change it
        if (o_setting_one_btn_two.classList.contains("clicked-settings-btn") != true) {
          //make this button look clicked
          o_setting_one_btn_two.classList.add("clicked-settings-btn")
          //make other buttons in this setting not clicked
          let o_setting_one_btn_one = document.getElementById("sett-one-btn-one");
          o_setting_one_btn_one.classList.remove("clicked-settings-btn");
          let o_setting_one_btn_three = document.getElementById("sett-one-btn-three");
          o_setting_one_btn_three.classList.remove("clicked-settings-btn");
              
          // ADD FUNCTIONALITY HERE
        } else {
          if (B_CONSOLE_LOG) {
            console.log("Pomo Length Already On Medium")
          }
        }
      }

      /**
       * Event handler function to change pomo length to medium (30)
       */
       PSLengthLong() {
          if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - PSLengthLong")
          }
          let o_setting_one_btn_three = document.getElementById("sett-one-btn-three");
          // if not already on long pomo length, change it
          if (o_setting_one_btn_three.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_one_btn_three.classList.add("clicked-settings-btn")
            //make other buttons in this setting not clicked
            let o_setting_one_btn_one = document.getElementById("sett-one-btn-one");
            o_setting_one_btn_one.classList.remove("clicked-settings-btn");
            let o_setting_one_btn_two = document.getElementById("sett-one-btn-two");
            o_setting_one_btn_two.classList.remove("clicked-settings-btn");
                
            // ADD FUNCTIONALITY HERE
          } else {
            if (B_CONSOLE_LOG) {
              console.log("Pomo Length Already On Long")
            }
          }
        }

        
    /**
     * THREE Event Handler Functions for changing SHORT BREAK Length
     */
    /**
     * Event handler function to change short break length to short (5)
     */
    SBLengthShort() {
        if (B_CONSOLE_LOG) {
          console.log("settingsTab.js - SBLengthShort")
        }
        let o_setting_two_btn_one = document.getElementById("sett-two-btn-one");
        // if not already on short pomo length, change it
        if (o_setting_two_btn_one.classList.contains("clicked-settings-btn") != true) {
          //make this button look clicked
          o_setting_two_btn_one.classList.add("clicked-settings-btn")
          //make other buttons in this setting not clicked
          let o_setting_two_btn_two = document.getElementById("sett-two-btn-two");
          o_setting_two_btn_two.classList.remove("clicked-settings-btn");
          let o_setting_two_btn_three = document.getElementById("sett-two-btn-three");
          o_setting_two_btn_three.classList.remove("clicked-settings-btn");
              
          // ADD FUNCTIONALITY HERE
        } else {
          if (B_CONSOLE_LOG) {
            console.log("Short Break Length Already On Short")
          }
        }
      }
  
      /**
       * Event handler function to change short break length to medium (7.5)
       */
       SBLengthMed() {
          if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - SBLengthMed")
          }
          let o_setting_two_btn_two = document.getElementById("sett-two-btn-two");
          // if not already on medium pomo length, change it
          if (o_setting_two_btn_two.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_two_btn_two.classList.add("clicked-settings-btn")
            //make other buttons in this setting not clicked
            let o_setting_two_btn_one = document.getElementById("sett-two-btn-one");
            o_setting_two_btn_one.classList.remove("clicked-settings-btn");
            let o_setting_two_btn_three = document.getElementById("sett-two-btn-three");
            o_setting_two_btn_three.classList.remove("clicked-settings-btn");
                
            // ADD FUNCTIONALITY HERE
          } else {
            if (B_CONSOLE_LOG) {
              console.log("Short Break Length Already On Medium")
            }
          }
        }
  
        /**
         * Event handler function to change short break length to long (10)
         */
         SBLengthLong() {
            if (B_CONSOLE_LOG) {
              console.log("settingsTab.js - SBLengthLong")
            }
            let o_setting_two_btn_three = document.getElementById("sett-two-btn-three");
            // if not already on long pomo length, change it
            if (o_setting_two_btn_three.classList.contains("clicked-settings-btn") != true) {
              //make this button look clicked
              o_setting_two_btn_three.classList.add("clicked-settings-btn")
              //make other buttons in this setting not clicked
              let o_setting_two_btn_one = document.getElementById("sett-two-btn-one");
              o_setting_two_btn_one.classList.remove("clicked-settings-btn");
              let o_setting_two_btn_two = document.getElementById("sett-two-btn-two");
              o_setting_two_btn_two.classList.remove("clicked-settings-btn");
                  
              // ADD FUNCTIONALITY HERE
            } else {
              if (B_CONSOLE_LOG) {
                console.log("Short Break Length Already On Long")
              }
            }
          }
      
    /**
     * THREE Event Handler Functions for changing LONG BREAK Length
     */
    /**
     * Event handler function to change long break length to short (25)
     */
     LBLengthShort() {
        if (B_CONSOLE_LOG) {
          console.log("settingsTab.js - LBLengthShort")
        }
        let o_setting_three_btn_one = document.getElementById("sett-three-btn-one");
        // if not already on short pomo length, change it
        if (o_setting_three_btn_one.classList.contains("clicked-settings-btn") != true) {
          //make this button look clicked
          o_setting_three_btn_one.classList.add("clicked-settings-btn")
          //make other buttons in this setting not clicked
          let o_setting_three_btn_two = document.getElementById("sett-three-btn-two");
          o_setting_three_btn_two.classList.remove("clicked-settings-btn");
          let o_setting_three_btn_three = document.getElementById("sett-three-btn-three");
          o_setting_three_btn_three.classList.remove("clicked-settings-btn");
              
          // ADD FUNCTIONALITY HERE
        } else {
          if (B_CONSOLE_LOG) {
            console.log("Long Break Length Already On Short")
          }
        }
      }
  
      /**
       * Event handler function to change long break length to medium (7.5)
       */
       LBLengthMed() {
          if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - LBLengthMed")
          }
          let o_setting_three_btn_two = document.getElementById("sett-three-btn-two");
          // if not already on medium pomo length, change it
          if (o_setting_three_btn_two.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_three_btn_two.classList.add("clicked-settings-btn")
            //make other buttons in this setting not clicked
            let o_setting_three_btn_one = document.getElementById("sett-three-btn-one");
            o_setting_three_btn_one.classList.remove("clicked-settings-btn");
            let o_setting_three_btn_three = document.getElementById("sett-three-btn-three");
            o_setting_three_btn_three.classList.remove("clicked-settings-btn");
                
            // ADD FUNCTIONALITY HERE
          } else {
            if (B_CONSOLE_LOG) {
              console.log("Long Break Length Already On Medium")
            }
          }
        }
  
        /**
         * Event handler function to change long break length to long (35)
         */
         LBLengthLong() {
            if (B_CONSOLE_LOG) {
              console.log("settingsTab.js - LBLengthLong")
            }
            let o_setting_three_btn_three = document.getElementById("sett-three-btn-three");
            // if not already on long pomo length, change it
            if (o_setting_three_btn_three.classList.contains("clicked-settings-btn") != true) {
              //make this button look clicked
              o_setting_three_btn_three.classList.add("clicked-settings-btn")
              //make other buttons in this setting not clicked
              let o_setting_three_btn_one = document.getElementById("sett-three-btn-one");
              o_setting_three_btn_one.classList.remove("clicked-settings-btn");
              let o_setting_three_btn_two = document.getElementById("sett-three-btn-two");
              o_setting_three_btn_two.classList.remove("clicked-settings-btn");
                  
              // ADD FUNCTIONALITY HERE
            } else {
              if (B_CONSOLE_LOG) {
                console.log("Long Break Length Already On Long")
              }
            }
          }
  



}


customElements.define("settings-tab", SettingsTab);
export { SettingsTab }