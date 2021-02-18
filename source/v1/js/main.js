window.addEventListener("DOMContentLoaded", () => {
    // Code for Up arrow scroll-up functionality -- not sure where to put this
    const TIMER_SECTION_TARGET = ".timer-section";
    let up_arrow = document.getElementById("up-arrow");
    up_arrow.setAttribute("target", TIMER_SECTION_TARGET);
    up_arrow.addEventListener("click", handleUpBtnPressed.bind(this));

    /**
     * Event handler function for instruction section: when "up-arrow" button pressed
     * @param {Event} o_event The event instance
     */
    function handleUpBtnPressed(o_event) {
        let o_target = o_event.target.getAttribute("target");
        let n_offset = document.querySelector(o_target).offsetTop;

        scroll({ top: n_offset, behavior: "smooth" });
    }

});

