/* Contains instances of all timers, and does other javascript-related stuff(such as instructions box closing, fast-page scroll, etc) */
/* Also assigns specific elements event listeners for Timers, etc */
window.addEventListener("DOMContentLoaded", () => {
    const o_timer = new Timer();
    console.log(o_timer);
    document.querySelector("#start-btn").addEventListener("click", function handleStartClicked() {
        o_timer.beginSession();
    })
})