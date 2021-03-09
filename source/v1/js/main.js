import { TimerContainer } from "./timerContainer.js";
import { TaskList } from "./taskList.js";
import { EventBus } from "./eventBus.js";
import { TaskDisplay } from "./taskDisplay.js";
/**
 * Event handler function for instruction section: when "up-arrow" button pressed
 */
function handleUpBtnPressed() {
    let o_target = document.getElementById("up-arrow").getAttribute("target");
    let n_offset = document.querySelector(o_target).offsetTop;

    scroll({ top: n_offset, behavior: "smooth" });
}

/**
 * Event handler function for when the "info" button is pressed
 */
function handleInfoBtnPressed() {
    let o_target = document.getElementById("info-btn-new").getAttribute("target");
    let n_offset = document.querySelector(o_target).offsetTop;

    scroll({ top: n_offset, behavior: "smooth" });
}

/**
 * Event handler function to change the theme
 */
function handleThemeBtnPressed() {
    // Obtains an array of all <link> elements. Select your element using indexing. 
    let theme = document.getElementsByTagName('link')[1];
    let theme_btn = document.getElementById("theme-btn");

    // Change the value of href attribute to change the css sheet.
    if (theme.getAttribute("href") == "./css/colors.css") {
        theme.setAttribute("href", "./css/colors2.css");
        theme_btn.setAttribute("title", "Simple Theme");
    } else {
        theme.setAttribute("href", "./css/colors.css");
        theme_btn.setAttribute("title", "Complex Theme");
    }
}

/**
 * Event handler function to show TaskList when task button is pressed
 */
function showTaskList() {
    document.EventBus.fireEvent("showTasks");
}

/**
 * Event handler function to handleKeybinds
 */
function handleKeyBinds(o_event) {
    if (o_event.target.tagName == "BODY") {
        console.log(o_event);
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
            case "n":
                document.EventBus.fireEvent("nextTask");
                break;
            case "r":
                document.EventBus.fireEvent("resetPomo");
                break;
        }
    }

}

document.addEventListener("DOMContentLoaded", () => {
    // Code for Up arrow scroll-up functionality 
    const TIMER_SECTION_TARGET = ".timer-section";
    let up_arrow = document.getElementById("up-arrow");
    up_arrow.setAttribute("target", TIMER_SECTION_TARGET);
    up_arrow.addEventListener("click", handleUpBtnPressed.bind(this));


    // Code for scrolling to instructions functionality 
    const S_INSTRUCTIONS_TARGET = ".instructions-section";
    let info_btn_new = document.getElementById("info-btn-new");
    info_btn_new.setAttribute("target", S_INSTRUCTIONS_TARGET);
    info_btn_new.addEventListener("click", handleInfoBtnPressed);

    // Code for change theme button functionality
    let theme_btn = document.getElementById("theme-btn");
    theme_btn.addEventListener("click", handleThemeBtnPressed);

    // Code for showing / hiding TaskList functionality
    let task_btn = document.getElementById("task-btn");
    task_btn.addEventListener("click", showTaskList);

    document.addEventListener("keydown", handleKeyBinds);

    document.EventBus = new EventBus();

});

