import { iterInternalSymbol } from "jsdom/lib/jsdom/living/generated/utils";
import { hasUncaughtExceptionCaptureCallback } from "process";

describe("Settings Menu Tests", () => {
    beforeEach(() => {
        cy.visit("https://powelldoro.web.app/");
        cy.get("#sett-btn").trigger("click");
        cy.document().then((o_doc) => {
            cy.spy(o_doc.querySelector("settings-tab"), "PSLengthShort");
            cy.spy(o_doc.querySelector("settings-tab"), "PSLengthMed");
            cy.spy(o_doc.querySelector("settings-tab"), "PSLengthLong");

            cy.spy(o_doc.querySelector("settings-tab"), "SBLengthShort");
            cy.spy(o_doc.querySelector("settings-tab"), "SBLengthMed");
            cy.spy(o_doc.querySelector("settings-tab"), "SBLengthLong");

            cy.spy(o_doc.querySelector("settings-tab"), "LBLengthShort");
            cy.spy(o_doc.querySelector("settings-tab"), "LBLengthMed");
            cy.spy(o_doc.querySelector("settings-tab"), "LBLengthLong");

            cy.spy(o_doc.querySelector("settings-tab"), "resetSettings");
        });
    });

    it("Test Setting Buttons", () => {
        // Click First Option for Pomo Session Length
        cy.get("#sett-one-btn-one").trigger("click");

        // Clicked class is updated
        cy.get("#sett-one-btn-one").should("have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-three").should("not.have.class", "clicked-settings-btn");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").PSLengthShort).to.be.called;
        });

        // Click Second Option for Pomo Session Length
        cy.get("#sett-one-btn-two").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").PSLengthMed).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-one-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-two").should("have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-three").should("not.have.class", "clicked-settings-btn");

        // Click Third Option for Pomo Session Length
        cy.get("#sett-one-btn-three").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").PSLengthLong).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-one-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-three").should("have.class", "clicked-settings-btn");
        
        // Click First Option for Short Break Length
        cy.get("#sett-two-btn-one").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").SBLengthShort).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-two-btn-one").should("have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-three").should("not.have.class", "clicked-settings-btn");

        // Click Second Option for Short Break Length
        cy.get("#sett-two-btn-two").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").SBLengthMed).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-two-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-two").should("have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-three").should("not.have.class", "clicked-settings-btn");

        // Click Third Option for Short Break Length
        cy.get("#sett-two-btn-three").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").SBLengthLong).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-two-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-three").should("have.class", "clicked-settings-btn");
        
        // Click First Option for Long Break Length
        cy.get("#sett-three-btn-one").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").LBLengthShort).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-three-btn-one").should("have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-three").should("not.have.class", "clicked-settings-btn");

        // Click Second Option for Long Break Length
        cy.get("#sett-three-btn-two").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").LBLengthMed).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-three-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-two").should("have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-three").should("not.have.class", "clicked-settings-btn");

        // Click Third Option for Long Break Length
        cy.get("#sett-three-btn-three").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").LBLengthLong).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-three-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-three").should("have.class", "clicked-settings-btn");
    });

    it("Test Initial Button States from Local Storage", () => {
        cy.window().then((win) => {
            // Get Preferred Settings from Local Storage
            const o_storedSettings = JSON.parse(win.localStorage.getItem("timer_settings"));

            // Check Clicked States of Pomo Session Buttons
            switch (o_storedSettings[0]) {
            case 1200000:
                cy.get("#sett-one-btn-one").should("have.class", "clicked-settings-btn");
                cy.get("#sett-one-btn-two").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-one-btn-three").should("not.have.class", "clicked-settings-btn");
                break;
            case 1500000:
                cy.get("#sett-one-btn-one").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-one-btn-two").should("have.class", "clicked-settings-btn");
                cy.get("#sett-one-btn-three").should("not.have.class", "clicked-settings-btn");
                break;
            case 1800000:
                cy.get("#sett-one-btn-one").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-one-btn-two").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-one-btn-three").should("have.class", "clicked-settings-btn");
                break;
            }

            // Check Clicked State of Short Break Buttons
            switch (o_storedSettings[1]) {
            case 300000:
                cy.get("#sett-two-btn-one").should("have.class", "clicked-settings-btn");
                cy.get("#sett-two-btn-two").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-two-btn-three").should("not.have.class", "clicked-settings-btn");
                break;
            case 450000:
                cy.get("#sett-two-btn-one").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-two-btn-two").should("have.class", "clicked-settings-btn");
                cy.get("#sett-two-btn-three").should("not.have.class", "clicked-settings-btn");
                break;
            case 600000:
                cy.get("#sett-two-btn-one").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-two-btn-two").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-two-btn-three").should("have.class", "clicked-settings-btn");
                break;
            }

            // Check Clicked State of Long Break Buttons
            switch (o_storedSettings[2]) {
            case 1500000:
                cy.get("#sett-three-btn-one").should("have.class", "clicked-settings-btn");
                cy.get("#sett-three-btn-two").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-three-btn-three").should("not.have.class", "clicked-settings-btn");
                break;
            case 1800000:
                cy.get("#sett-three-btn-one").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-three-btn-two").should("have.class", "clicked-settings-btn");
                cy.get("#sett-three-btn-three").should("not.have.class", "clicked-settings-btn");
                break;
            case 2100000:
                cy.get("#sett-three-btn-one").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-three-btn-two").should("not.have.class", "clicked-settings-btn");
                cy.get("#sett-three-btn-three").should("have.class", "clicked-settings-btn");
                break;
            }
        });
    });

    it("Test Reset Settings Button", () => {
        // Click Reset Settings Button
        cy.get("#reset-time-btn").trigger("click");
        
        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").resetSettings).to.be.called;
            expect(o_doc.querySelector("settings-tab").PSLengthMed).to.be.called;
            expect(o_doc.querySelector("settings-tab").SBLengthShort).to.be.called;
            expect(o_doc.querySelector("settings-tab").LBLengthLong).to.be.called;
        });

        // Clicked classes are updated for all 9 buttons
        cy.get("#sett-one-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-two").should("have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-three").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-one").should("have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-two-btn-three").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-three").should("have.class", "clicked-settings-btn");
    });
});