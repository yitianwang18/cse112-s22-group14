
// variable for turning on/off console logs used for debugging
// const B_CONSOLE_LOG = false;

const S_HEADER = "Audio Error";
const S_PARAGRAPH = "Please go to 'Preference window' -> \
    'Websites' -> 'Auto-Play' to enable the notification audio";
const S_CHECKBOX_LABEL = "Do Not Show Me This Again";
const S_HTML = `
<notification-blocker class="hidden instructions-section-blocker"></notification-blocker>
<notification-section class="instructions-section">
    <a class="close2 btn">×</a>
    <notification-header class="hidden">
        <h3 class="instruct-head">
            ${S_HEADER} 
        </h3>
    </notification-header>
    <notification-body class="hidden">
        ${S_PARAGRAPH}
    </notification-body>
    <input id="safari-check-box" type="checkbox">
    <label id="safari-check-box-label" for="safari-check-box">${S_CHECKBOX_LABEL}</label>
</notification-section>
`;

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
        this.innerHTML = S_HTML; 
        this.querySelector("notification-blocker")
            .addEventListener("click", this.closeNotification.bind(this));
        this.querySelector("a.close2").addEventListener("click", this.closeNotification.bind(this));

        // add safari error notification check box 
        const o_safari_check_box = this.querySelector("#safari-check-box");

        const b_showErrorNotification_preference = 
        localStorage.getItem("safari-error-notification-preference");

        if (b_showErrorNotification_preference === null) {
            localStorage.setItem("safari-error-notification-preference", "false");
            o_safari_check_box.checked = false;        
        }

        o_safari_check_box.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                localStorage.setItem("safari-error-notification-preference", "true");
            } else {
                localStorage.setItem("safari-error-notification-preference", "false");
            }
        });
    }

    /** Function to determine if the notification are currently shown */
    getIsShown() {
        return this.querySelector("notification-section")
            .classList.contains("notification-section-open");
    }

    /**
     * Function to show task list display from the main user screen
     */
    showNotificationBox() {
        document.EventBus.pop_up = true;
        this.querySelector("notification-section").classList.add("notification-section-open");

        // Hide everything inside instructions box while animating to prevent sandwiching of text
        setTimeout(() => {
            this.querySelector("notification-header").style.display = "block";
            this.querySelector("notification-body").style.display = "block";
            document.body.focus();
        }, 300);

        this.querySelector("notification-blocker").style.display = "block";
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeNotification() {
        document.EventBus.pop_up = false;
        this.querySelector("notification-section").classList.remove("notification-section-open");
        this.querySelector("notification-header").style.display = "none";
        this.querySelector("notification-body").style.display = "none";
        this.querySelector("notification-blocker").style.display = "none";
    }
}

customElements.define("notification-box", NotificationBox);
export { NotificationBox }