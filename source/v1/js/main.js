import { TimerContainer } from "./timerContainer.js";
import { TaskList } from "./taskList.js";
import { SettingsTab } from "./settingsTab.js";
import { InstructionsBox } from "./instructionsBox.js";
import { EventBus } from "./eventBus.js";
import { TaskDisplay } from "./taskDisplay.js";

// variable for turning on/off console logs used for debugging
const B_CONSOLE_LOG = false;

/**
 * Event handler function to change the theme
 */
function handleThemeBtnPressed() {
    // Obtains an array of all <link> elements. Select your element using indexing. 
    let theme = document.getElementById("theme");
    let theme_btn = document.getElementById("theme-btn");

    // Change the value of href attribute to change the css sheet.
    if (theme.getAttribute("href") == "./css/colors-dark.css") {
        theme.setAttribute("href", "./css/colors-forest.css");
        theme_btn.setAttribute("title", "Dark Theme");
    } else {
        theme.setAttribute("href", "./css/colors-dark.css");
        theme_btn.setAttribute("title", "Forest Theme");
    }
}

/**
 * Event handler function to show TaskList when task button is pressed
 */
function showTaskList() {
    document.EventBus.fireEvent("showTasks");
}

/**
 * Event handler function to show TaskList when task button is pressed
 */
function showSettingsTab() {
    document.EventBus.fireEvent("showSettings");
}

/**
 * Event handler function for the three POMO session length options
 */
function settingOneButtonOne() {
    document.EventBus.fireEvent("settingOneButtonOne"); 
}
function settingOneButtonTwo() {
    document.EventBus.fireEvent("settingOneButtonTwo"); 
}
function settingOneButtonThree() {
    document.EventBus.fireEvent("settingOneButtonThree"); 
}
/**
 * Event handler function for the three SHORT break length options
 */
function settingTwoButtonOne() {
    document.EventBus.fireEvent("settingTwoButtonOne"); 
}
function settingTwoButtonTwo() {
    document.EventBus.fireEvent("settingTwoButtonTwo"); 
}
function settingTwoButtonThree() {
    document.EventBus.fireEvent("settingTwoButtonThree"); 
}
/**
 * Event handler function for the three LONG break length options
 */
function settingThreeButtonOne() {
    document.EventBus.fireEvent("settingThreeButtonOne"); 
}
function settingThreeButtonTwo() {
    document.EventBus.fireEvent("settingThreeButtonTwo"); 
}
function settingThreeButtonThree() {
    document.EventBus.fireEvent("settingThreeButtonThree"); 
}

/**
 * Event handler function to show Instructions when info button is pressed
 * @param {Event} o_event event instance
 */
function showInstructions(o_event) {
    let inst = document.querySelector("instructions-box");
    inst.showInstructionsBox();

}

/**
 * Event handler function to handleKeybinds
 * @param {Event} o_event event instance
 */
function handleKeyBinds(o_event) {
    console.log(o_event);
    if (o_event.target.tagName != "INPUT") {
        switch (o_event.key) {
            case "c":
                handleThemeBtnPressed();
                break;
            case " ":
                document.EventBus.fireEvent("spaceKeybind");
                // disable space scrolling
                o_event.preventDefault();
                break;
            case "Escape":
                document.EventBus.fireEvent("closeWindows");
                break;
            case "t":
                document.EventBus.fireEvent("showTasks");
                // prevent event from bubbling into input
                o_event.preventDefault();
                break;
            case "s":
                document.EventBus.fireEvent("showSettings");
                break;
            case "i":
                showInstructions();
                break;
            case "n":
                document.EventBus.fireEvent("nextTask");
                break;
            case "r":
                document.EventBus.fireEvent("resetPomo");
                break;
        }
    }

}

/**
 * This event listener is used for initializing anything that isn't associated with any specific webcomponent.
 */
document.addEventListener("DOMContentLoaded", () => {

    // Code to automatically open instructions if it has been a month since the last time the website was used
    let a_daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let o_date = new Date();
    let n_currDate = o_date.getDay() + (o_date.getMonth() * a_daysInMonth[o_date.getMonth()]) + (o_date.getFullYear() * 365);
    let n_prevDate = localStorage.getItem("n_prevDate");

    if (n_prevDate == null || n_currDate - n_prevDate >= 30) {
        showInstructions();
    }
    localStorage.setItem("n_prevDate", n_currDate);

    // Code for change theme button functionality
    let o_theme_btn = document.getElementById("theme-btn");
    o_theme_btn.addEventListener("click", handleThemeBtnPressed);

    // Code for showing / hiding TaskList functionality
    let o_task_btn = document.getElementById("task-btn");
    o_task_btn.addEventListener("click", showTaskList);

    // Code for showing / hiding Settings functionality
    let o_sett_btn = document.getElementById("sett-btn");
    o_sett_btn.addEventListener("click", showSettingsTab);

    // Code for settings customizations for POMO session length
    let o_setting_one_btn_one = document.getElementById("sett-one-btn-one");
    o_setting_one_btn_one.addEventListener("click", settingOneButtonOne);
    let o_setting_one_btn_two = document.getElementById("sett-one-btn-two");
    o_setting_one_btn_two.addEventListener("click", settingOneButtonTwo);
    let o_setting_one_btn_three = document.getElementById("sett-one-btn-three");
    o_setting_one_btn_three.addEventListener("click", settingOneButtonThree);
    
    // Code for settings customizations for SHORT break length
    let o_setting_two_btn_one = document.getElementById("sett-two-btn-one");
    o_setting_two_btn_one.addEventListener("click", settingTwoButtonOne);
    let o_setting_two_btn_two = document.getElementById("sett-two-btn-two");
    o_setting_two_btn_two.addEventListener("click", settingTwoButtonTwo);
    let o_setting_two_btn_three = document.getElementById("sett-two-btn-three");
    o_setting_two_btn_three.addEventListener("click", settingTwoButtonThree);
    
    // Code for settings customizations for SHORT break length
    let o_setting_three_btn_one = document.getElementById("sett-three-btn-one");
    o_setting_three_btn_one.addEventListener("click", settingThreeButtonOne);
    let o_setting_three_btn_two = document.getElementById("sett-three-btn-two");
    o_setting_three_btn_two.addEventListener("click", settingThreeButtonTwo);
    let o_setting_three_btn_three = document.getElementById("sett-three-btn-three");
    o_setting_three_btn_three.addEventListener("click", settingThreeButtonThree);





    document.addEventListener("keydown", handleKeyBinds);

    // Code for showing / hiding Instructions functionality
    let o_info_btn = document.getElementById("info-btn-new");
    o_info_btn.addEventListener("click", showInstructions);

    // initialize Event Bus instance
    document.EventBus = new EventBus();

});

