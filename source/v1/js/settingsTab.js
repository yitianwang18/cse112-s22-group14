import { TimerContainer } from "./timerContainer.js"

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
        o_close_button.title = "Close Settings (esc)";
        o_close_button.id = "close-settings";
        o_close_button.innerHTML = "&times;";
        // event to close the menu if you click the x
        o_close_button.addEventListener("click", this.closeSettingsTab.bind(this));
        o_close_button.setAttribute("tabIndex", "1");

        o_close_button.addEventListener('focus', (event) => {
            o_close_button.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.closeSettingsTab();
                }
            });
        });

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
        o_setting_one_btn_one.title = "20 Min. Work Session"; 
        o_setting_one_btn_one.setAttribute("tabIndex", "3");
        
        o_setting_one_btn_one.addEventListener('focus', (event) => {
            o_setting_one_btn_one.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.PSLengthShort();
                }
            });
        });

        let o_setting_one_btn_two = document.createElement("div");
        o_setting_one_btn_two.classList.add("settings-custom-btn", "clicked-settings-btn");
        o_setting_one_btn_two.id = "sett-one-btn-two";
        o_setting_one_btn_two.innerHTML = "25"; 
        o_setting_one_btn_two.title = "25 Min. Work Session"; 
        o_setting_one_btn_two.setAttribute("tabIndex", "4");
        
        o_setting_one_btn_two.addEventListener('focus', (event) => {
            o_setting_one_btn_two.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.PSLengthMed();
                }
            });
        });
        

        let o_setting_one_btn_three = document.createElement("div");
        o_setting_one_btn_three.classList.add("settings-custom-btn");
        o_setting_one_btn_three.id = "sett-one-btn-three";
        o_setting_one_btn_three.innerHTML = "30"; 
        o_setting_one_btn_three.title = "30 Min. Work Session"; 
        o_setting_one_btn_three.setAttribute("tabIndex", "5");

        o_setting_one_btn_three.addEventListener('focus', (event) => {
            o_setting_one_btn_three.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.PSLengthLong();
                }
            });
        });

        o_setting_one_buttons.append(o_setting_one_btn_one, o_setting_one_btn_two, 
            o_setting_one_btn_three);
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
        o_setting_two_btn_one.title = "5 Min. Short Break"; 
        o_setting_two_btn_one.setAttribute("tabIndex", "6");

        o_setting_two_btn_one.addEventListener('focus', (event) => {
            o_setting_two_btn_one.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.SBLengthShort();
                }
            });
        });

        
        let o_setting_two_btn_two = document.createElement("div");
        o_setting_two_btn_two.classList.add("settings-custom-btn");
        o_setting_two_btn_two.id = "sett-two-btn-two";
        o_setting_two_btn_two.innerHTML = "7.5"; 
        o_setting_two_btn_two.title = "7.5 Min. Short Break"; 
        o_setting_two_btn_two.setAttribute("tabIndex", "7");

        o_setting_two_btn_two.addEventListener('focus', (event) => {
            o_setting_two_btn_two.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.SBLengthMed();
                }
            });
        });

        
        let o_setting_two_btn_three = document.createElement("div");
        o_setting_two_btn_three.classList.add("settings-custom-btn");
        o_setting_two_btn_three.id = "sett-two-btn-three";
        o_setting_two_btn_three.innerHTML = "10"; 
        o_setting_two_btn_three.title = "10 Min. Short Break"; 
        o_setting_two_btn_three.setAttribute("tabIndex", "8");

        o_setting_two_btn_three.addEventListener('focus', (event) => {
            o_setting_two_btn_three.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.SBLengthLong();
                }
            });
        });


        o_setting_two_buttons.append(o_setting_two_btn_one, o_setting_two_btn_two, 
            o_setting_two_btn_three);
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
        o_setting_three_btn_one.title = "25 Min. Long Break"; 
        o_setting_three_btn_one.setAttribute("tabIndex", "9");

        o_setting_three_btn_one.addEventListener('focus', (event) => {
            o_setting_three_btn_one.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.LBLengthShort();
                }
            });
        });

        
        let o_setting_three_btn_two = document.createElement("div");
        o_setting_three_btn_two.classList.add("settings-custom-btn");
        o_setting_three_btn_two.id = "sett-three-btn-two";
        o_setting_three_btn_two.innerHTML = "30"; 
        o_setting_three_btn_two.title = "30 Min. Long Break"; 
        o_setting_three_btn_two.setAttribute("tabIndex", "10");

        o_setting_three_btn_two.addEventListener('focus', (event) => {
            o_setting_three_btn_two.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.LBLengthMed();
                }
            });
        });

        
        let o_setting_three_btn_three = document.createElement("div");
        o_setting_three_btn_three.classList.add("settings-custom-btn", "clicked-settings-btn");
        o_setting_three_btn_three.id = "sett-three-btn-three";
        o_setting_three_btn_three.innerHTML = "35"; 
        o_setting_three_btn_three.title = "35 Min. Long Break"; 
        o_setting_three_btn_three.setAttribute("tabIndex", "11");

        o_setting_three_btn_three.addEventListener('focus', (event) => {
            o_setting_three_btn_three.addEventListener('keypress', (event) => {
                if(event.key === "Enter"){
                    this.LBLengthLong();
                }
            });
        });


        o_setting_three_buttons.append(o_setting_three_btn_one, o_setting_three_btn_two, 
            o_setting_three_btn_three);
        o_setting_three_wrapper.append(o_setting_three_title, o_setting_three_buttons);
      
        // Bottom two settings not related to times
        let o_bottom_wrapper = document.createElement("div");
        o_bottom_wrapper.classList.add("centered-note");
        let o_bottom_theme = document.createElement("div");
        o_bottom_theme.classList.add("bottom-btn");
        o_bottom_theme.innerText = "Change Theme";
        o_bottom_theme.title = "Forest Theme (c)";
        o_bottom_theme.id = "theme-btn";
        o_bottom_theme.setAttribute("tabIndex", "12");

        let o_bottom_reset = document.createElement("div");
        o_bottom_reset.innerText = "Reset Settings";
        o_bottom_reset.classList.add("bottom-btn");
        o_bottom_reset.title = "Reset to Default Times";
        o_bottom_reset.id = "reset-time-btn";
        o_bottom_reset.setAttribute("tabIndex", "13");
        o_bottom_wrapper.append(o_bottom_theme, o_bottom_reset);


        // Add each setting to settings wrapper
        o_all_settings_wrapper.append(o_setting_one_wrapper, o_setting_two_wrapper, 
            o_setting_three_wrapper, o_bottom_wrapper);

        o_settings_title_wrapper.append(o_close_button, o_settings_title);
        o_wrapper_obj.append(o_settings_title_wrapper, o_all_settings_wrapper);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
      
        // Change default settings to user settings from last load
        if(window.localStorage.getItem("timer_settings") != null) {
            let o_timer_settings = window.localStorage.getItem("timer_settings");
            o_timer_settings = JSON.parse(o_timer_settings);

            // User setting for pomodoro length
            switch(o_timer_settings[0]) {
            case SettingsTab.N_PS_SHORT:
                this.PSLengthShort();
                break;
            case SettingsTab.N_PS_MED:
                this.PSLengthMed();
                break;
            case SettingsTab.N_PS_LONG:
                this.PSLengthLong();
                break;
            }

            // User setting for short break
            switch(o_timer_settings[1]) {
            case SettingsTab.N_SB_SHORT:
                this.SBLengthShort();
                break;
            case SettingsTab.N_SB_MED:
                this.SBLengthMed();
                break;
            case SettingsTab.N_SB_LONG:
                this.SBLengthLong();
                break;
            }

            // User setting for long break
            switch(o_timer_settings[2]) {
            case SettingsTab.N_LB_SHORT:
                this.LBLengthShort();
                break;
            case SettingsTab.N_LB_MED:
                this.LBLengthMed();
                break;
            case SettingsTab.N_LB_LONG:
                this.LBLengthLong();
                break;
            }
        }
    }

    
    /** Function to determine if the settings are currently shown */
    getIsShown() {
        return this.querySelector("#side-settings").classList.contains("settings-class-open");
    }


    /**
     * Function to show menu list display from the main user screen
     */
    showSettings() {
        if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - showSettings");
        }
        document.EventBus.pop_up = true;
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
        document.EventBus.pop_up = false;
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
            console.log("settingsTab.js - PSLengthShort");
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
            
            // Adjust function of timer based on new pomo length
            TimerContainer.handlePomoLength(SettingsTab.N_PS_SHORT);
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
              
            // Adjust function of timer based on new pomo length
            TimerContainer.handlePomoLength(SettingsTab.N_PS_MED);
        } else {
            if (B_CONSOLE_LOG) {
                console.log("Pomo Length Already On Medium");
            }
        }
    }

    /**
     * Event handler function to change pomo length to long (30)
     */
    PSLengthLong() {
        if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - PSLengthLong");
        }
        let o_setting_one_btn_three = document.getElementById("sett-one-btn-three");
        // if not already on long pomo length, change it
        if (o_setting_one_btn_three.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_one_btn_three.classList.add("clicked-settings-btn");
            //make other buttons in this setting not clicked
            let o_setting_one_btn_one = document.getElementById("sett-one-btn-one");
            o_setting_one_btn_one.classList.remove("clicked-settings-btn");
            let o_setting_one_btn_two = document.getElementById("sett-one-btn-two");
            o_setting_one_btn_two.classList.remove("clicked-settings-btn");
                  
            // Adjust function of timer based on new pomodoro length
            TimerContainer.handlePomoLength(SettingsTab.N_PS_LONG);
        } else {
            if (B_CONSOLE_LOG) {
                console.log("Pomo Length Already On Long");
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
            console.log("settingsTab.js - SBLengthShort");
        }
        let o_setting_two_btn_one = document.getElementById("sett-two-btn-one");
        // if not already on short pomo length, change it
        if (o_setting_two_btn_one.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_two_btn_one.classList.add("clicked-settings-btn");
            //make other buttons in this setting not clicked
            let o_setting_two_btn_two = document.getElementById("sett-two-btn-two");
            o_setting_two_btn_two.classList.remove("clicked-settings-btn");
            let o_setting_two_btn_three = document.getElementById("sett-two-btn-three");
            o_setting_two_btn_three.classList.remove("clicked-settings-btn");
                
            // Adjust function of timer based on new short break time
            TimerContainer.handleShortBreak(SettingsTab.N_SB_SHORT);
        } else {
            if (B_CONSOLE_LOG) {
                console.log("Short Break Length Already On Short");
            }
        }
    }
  
    /**
     * Event handler function to change short break length to medium (7.5)
     */
    SBLengthMed() {
        if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - SBLengthMed");
        }
        let o_setting_two_btn_two = document.getElementById("sett-two-btn-two");
        // if not already on medium pomo length, change it
        if (o_setting_two_btn_two.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_two_btn_two.classList.add("clicked-settings-btn");
            //make other buttons in this setting not clicked
            let o_setting_two_btn_one = document.getElementById("sett-two-btn-one");
            o_setting_two_btn_one.classList.remove("clicked-settings-btn");
            let o_setting_two_btn_three = document.getElementById("sett-two-btn-three");
            o_setting_two_btn_three.classList.remove("clicked-settings-btn");
                  
            // Adjust function of timer based on new short break time
            TimerContainer.handleShortBreak(SettingsTab.N_SB_MED);
        } else {
            if (B_CONSOLE_LOG) {
                console.log("Short Break Length Already On Medium");
            }
        }
    }
  
    /**
     * Event handler function to change short break length to long (10)
     */
    SBLengthLong() {
        if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - SBLengthLong");
        }
        let o_setting_two_btn_three = document.getElementById("sett-two-btn-three");
        // if not already on long pomo length, change it
        if (o_setting_two_btn_three.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_two_btn_three.classList.add("clicked-settings-btn");
            //make other buttons in this setting not clicked
            let o_setting_two_btn_one = document.getElementById("sett-two-btn-one");
            o_setting_two_btn_one.classList.remove("clicked-settings-btn");
            let o_setting_two_btn_two = document.getElementById("sett-two-btn-two");
            o_setting_two_btn_two.classList.remove("clicked-settings-btn");
                    
            // Adjust function of timer based on new short break time
            TimerContainer.handleShortBreak(SettingsTab.N_SB_LONG);
        } else {
            if (B_CONSOLE_LOG) {
                console.log("Short Break Length Already On Long");
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
            console.log("settingsTab.js - LBLengthShort");
        }
        let o_setting_three_btn_one = document.getElementById("sett-three-btn-one");
        // if not already on short pomo length, change it
        if (o_setting_three_btn_one.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_three_btn_one.classList.add("clicked-settings-btn");
            //make other buttons in this setting not clicked
            let o_setting_three_btn_two = document.getElementById("sett-three-btn-two");
            o_setting_three_btn_two.classList.remove("clicked-settings-btn");
            let o_setting_three_btn_three = document.getElementById("sett-three-btn-three");
            o_setting_three_btn_three.classList.remove("clicked-settings-btn");
                
            // Adjust function of timer based on new long break time
            TimerContainer.handleLongBreak(SettingsTab.N_LB_SHORT);
        } else {
            if (B_CONSOLE_LOG) {
                console.log("Long Break Length Already On Short");
            }
        }
    }
  
    /**
     * Event handler function to change long break length to medium (30)
     */
    LBLengthMed() {
        if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - LBLengthMed");
        }
        let o_setting_three_btn_two = document.getElementById("sett-three-btn-two");
        // if not already on medium pomo length, change it
        if (o_setting_three_btn_two.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_three_btn_two.classList.add("clicked-settings-btn");
            //make other buttons in this setting not clicked
            let o_setting_three_btn_one = document.getElementById("sett-three-btn-one");
            o_setting_three_btn_one.classList.remove("clicked-settings-btn");
            let o_setting_three_btn_three = document.getElementById("sett-three-btn-three");
            o_setting_three_btn_three.classList.remove("clicked-settings-btn");
                  
            // Adjust function of timer based on new long break time
            TimerContainer.handleLongBreak(SettingsTab.N_LB_MED);
        } else {
            if (B_CONSOLE_LOG) {
                console.log("Long Break Length Already On Medium");
            }
        }
    }
  
    /**
     * Event handler function to change long break length to long (35)
     */
    LBLengthLong() {
        if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - LBLengthLong");
        }
        let o_setting_three_btn_three = document.getElementById("sett-three-btn-three");
        // if not already on long pomo length, change it
        if (o_setting_three_btn_three.classList.contains("clicked-settings-btn") != true) {
            //make this button look clicked
            o_setting_three_btn_three.classList.add("clicked-settings-btn");
            //make other buttons in this setting not clicked
            let o_setting_three_btn_one = document.getElementById("sett-three-btn-one");
            o_setting_three_btn_one.classList.remove("clicked-settings-btn");
            let o_setting_three_btn_two = document.getElementById("sett-three-btn-two");
            o_setting_three_btn_two.classList.remove("clicked-settings-btn");
                  
            // Adjust function of timer based on new long break time
            TimerContainer.handleLongBreak(SettingsTab.N_LB_LONG);
        } else {
            if (B_CONSOLE_LOG) {
                console.log("Long Break Length Already On Long");
            }
        }
    }


    /**
     * Event handler function to reset to default times
     */
    resetSettings() {
        if (B_CONSOLE_LOG) {
            console.log("settingsTab.js - resetSettings")
        }
        //Call the functions to set each time back to the original
        this.PSLengthMed();
        this.SBLengthShort();
        this.LBLengthLong();
     }

}

/**
 * Short Pomodoro Length
 * @static
 * @type {number}
 */
SettingsTab.N_PS_SHORT = 1200000;

/**
 * Medium Pomodoro Length
 * @static
 * @type {number}
 */
SettingsTab.N_PS_MED = 1500000;

/**
 * Long Pomodoro Length
 * @static
 * @type {number}
 */
SettingsTab.N_PS_LONG = 1800000;

/**
 * Short Break - Short Length
 * @static
 * @type {number}
 */
SettingsTab.N_SB_SHORT = 300000;

/**
 * Short Break - Medium Length
 * @static
 * @type {number}
 */
SettingsTab.N_SB_MED = 450000;
 
/**
 * Short Break - Long Length
 * @static
 * @type {number}
 */
SettingsTab.N_SB_LONG = 600000;

/**
 * Long Break - Short Length
 * @static
 * @type {number}
 */
SettingsTab.N_LB_SHORT = 1500000;

/**
 * Long Break - Medium Length
 * @static
 * @type {number}
 */
SettingsTab.N_LB_MED = 1800000;
  
/**
 * Long Break - Long Length
 * @static
 * @type {number}
 */
SettingsTab.N_LB_LONG = 2100000;


customElements.define("settings-tab", SettingsTab);
export { SettingsTab }