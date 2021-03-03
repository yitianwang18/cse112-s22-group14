
document.addEventListener("DOMContentLoaded", () => {

    class SimpleWebComponent extends HTMLElement {
        constructor() {
            super();
            let p = document.createElement("p");
            p.innerHTML = "SimpleWC";
            this.append(p);
        }
    }
    customElements.define("swc-comp", SimpleWebComponent);
    document.querySelector("body").append("domcontentloaded-document");
    let swc = new SimpleWebComponent();
    document.querySelector("body").appendChild(swc);

});


document.addEventListener("DOMContentLoaded", () => {
    class StaticAttributeWebComponent extends HTMLElement {
        static get observedAttributes() {
            return ["pog"];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.querySelector("p").innerText = newValue;
        }
        constructor() {
            super();
            let p = document.createElement("p");
            p.innerHTML = "sa-wc";
            this.append(p);
        }
    }
    customElements.define("sa-comp", StaticAttributeWebComponent);
    let sawc = new StaticAttributeWebComponent();
    sawc.setAttribute("pog", "sawc-2");
    document.querySelector("body").appendChild(sawc);

});

document.addEventListener("DOMContentLoaded", () => {
    class StaticOutsideComponent extends HTMLElement {
        static get observedAttributes() {
            return ["pog"];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.querySelector("p").innerText = StaticOutsideComponent.poggers + newValue;
        }
        constructor() {
            super();
            let p = document.createElement("p");
            p.innerHTML = "smwc";
            this.append(p);
        }
    }
    StaticOutsideComponent.poggers = "poggggg";
    customElements.define("so-comp", StaticOutsideComponent);
    let sowc = new StaticOutsideComponent();
    sowc.setAttribute("pog", "sowc");
    document.querySelector("body").appendChild(sowc);

});

// document.addEventListener("DOMContentLoaded", () => {
//     class StaticMemberComponent extends HTMLElement {
//         static poggers = "asdf";

//         static get observedAttributes() {
//             return ["pog"];
//         }

//         attributeChangedCallback(name, oldValue, newValue) {
//             this.querySelector("p").innerText = StaticMemberComponent.poggers + newValue;
//         }
//         constructor() {
//             super();
//             let p = document.createElement("p");
//             p.innerHTML = "smwc";
//             this.append(p);
//         }
//     }
//     customElements.define("sm-comp", StaticMemberComponent);
//     let smwc = new StaticMemberComponent();
//     smwc.setAttribute("pog", "smwc");
//     document.querySelector("body").appendChild(smwc);

// });


