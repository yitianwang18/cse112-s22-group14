

window.addEventListener("DOMContentLoaded", () => {
    const instruct_btn = document.getElementById("instruct_btn");
    instruct_btn.addEventListener("click", function (e) {
        console.log("came here");

        e.preventDefault();
        const href = this.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;

        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    });
})


// function clickHandler(e) {

//     console.log("came here");

//     e.preventDefault();
//     const href = this.getAttribute("href");
//     const offsetTop = document.querySelector(href).offsetTop;

//     scroll({
//         top: offsetTop,
//         behavior: "smooth"
//     });
// }