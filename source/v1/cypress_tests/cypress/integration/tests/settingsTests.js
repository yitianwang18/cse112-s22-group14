import { iterInternalSymbol } from "jsdom/lib/jsdom/living/generated/utils";
import { hasUncaughtExceptionCaptureCallback } from "process";

describe("Settings Menu Tests", () => {
    beforeEach(() => {
        cy.visit("https://powelldoro.web.app/");
        cy.document().then((o_doc) => {
            cy.spy(o_doc.querySelector("settings-tab"), "PSLengthShort");
            cy.spy(o_doc.querySelector("settings-tab"), "PSLengthMed");
            cy.spy(o_doc.querySelector("settings-tab"), "PSLengthLong");
            cy.spy(o_doc.querySelector("timer-element"), "handlePomoLength");

            cy.spy(o_doc.querySelector("settings-tab"), "SBLengthShort");
            cy.spy(o_doc.querySelector("settings-tab"), "SBLengthMed");
            cy.spy(o_doc.querySelector("settings-tab"), "SBLengthLong");
            cy.spy(o_doc.querySelector("timer-element"), "handleShortBreak");

            cy.spy(o_doc.querySelector("settings-tab"), "LBLengthShort");
            cy.spy(o_doc.querySelector("settings-tab"), "LBLengthMed");
            cy.spy(o_doc.querySelector("settings-tab"), "LBLengthLong");
            cy.spy(o_doc.querySelector("timer-element"), "handleLongBreak");
        });
    });

    it("Test Setting Buttons", () => {
        // Click First Option for Pomo Session Length
        cy.get("#sett-one-btn-one").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").PSLengthShort).to.be.called;
            expect(o_doc.querySelector("timer-element").handlePomoLength).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-one-btn-one").should("have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-one-btn-three").should("not.have.class", "clicked-settings-btn");

        // Click Second Option for Pomo Session Length
        cy.get("#sett-one-btn-two").trigger("click");

        // Expected functions are called
        cy.document().then((o_doc) => {
            expect(o_doc.querySelector("settings-tab").PSLengthMed).to.be.called;
            expect(o_doc.querySelector("timer-element").handlePomoLength).to.be.called;
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
            expect(o_doc.querySelector("timer-element").handlePomoLength).to.be.called;
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
            expect(o_doc.querySelector("timer-element").handleShortBreak).to.be.called;
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
            expect(o_doc.querySelector("timer-element").handleShortBreak).to.be.called;
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
            expect(o_doc.querySelector("timer-element").handleShortBreak).to.be.called;
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
            expect(o_doc.querySelector("timer-element").handleLongBreak).to.be.called;
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
            expect(o_doc.querySelector("timer-element").handleLongBreak).to.be.called;
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
            expect(o_doc.querySelector("timer-element").handleLongBreak).to.be.called;
        });

        // Clicked class is updated
        cy.get("#sett-three-btn-one").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-two").should("not.have.class", "clicked-settings-btn");
        cy.get("#sett-three-btn-three").should("have.class", "clicked-settings-btn");
    });
});