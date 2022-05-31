
// variable for turning on/off console logs used for debugging
// const B_CONSOLE_LOG = false;

/**
 * Custom HTML element encapsulating all of the functionality related to the Notification Box
 * @extends HTMLElement
 */
class NotificationBox extends HTMLElement {

    /**
     * Constructs a new Notification Box, initializing all elements
     */
    constructor() {
        super();
        // most of this content is simply initializing the html to go in the webcomponent
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("notification-section-blocker", "hidden");
        o_wrapper_obj_back.id = "notification-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeNotification.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "instructions-section";
        o_wrapper_obj.id = "instructions";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close2", "btn");
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeNotification.bind(this));

        let o_inst_title_wrapper = document.createElement("div");
        o_inst_title_wrapper.className = "hidden";
        o_inst_title_wrapper.id = "instructions-title";

        //Instructions Box header
        let o_inst_title = document.createElement("h2");
        o_inst_title.className = "instruct-head";
        o_inst_title.innerText = "Audio Error";

        let o_inst_text = document.createElement("div");
        o_inst_text.className = "hidden";
        o_inst_text.id = "instructions-para";
        o_inst_text.innerText = "Please go to 'Preference window' -> 'Websites' -> \
            'Auto-Play' to enable the notification audio";
        o_inst_title_wrapper.append(o_inst_title);
    

        o_wrapper_obj.append(o_close_button, o_inst_title_wrapper, o_inst_text);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }

    /** Function to determine if the notification are currently shown */
    getIsShown() {
        return this.querySelector("#instructions").classList.contains("notification-section-open");
    }

    /**
     * Function to show task list display from the main user screen
     */
    showNotificationBox() {
        this.querySelector("#instructions").classList.add("notification-section-open");

        // Hide everything inside instructions box while animating to prevent sandwiching of text
        setTimeout(() => {
            this.querySelector("#instructions-title").style.display = "block";
            this.querySelector("#instructions-para").style.display = "block";
            document.body.focus();
        }, 300);

        this.querySelector("#notification-blocker").style.display = "block";
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeNotification() {
        this.querySelector("#instructions").classList.remove("notification-section-open");
        this.querySelector("#instructions-title").style.display = "none";
        this.querySelector("#instructions-para").style.display = "none";
        this.querySelector("#notification-blocker").style.display = "none";
    }
}

customElements.define("notification-box", NotificationBox);
export { NotificationBox }