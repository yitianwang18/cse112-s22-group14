import { TaskDisplay } from "../js/taskDisplay.js";

test('Testing Task Display attributeChangedCallback', () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.attributeChangedCallback("numtasks", 0, 0);
    expect(o_task_disp.querySelector("#next").style.display).toBe("none");

    o_task_disp.attributeChangedCallback("numtasks", 0, 1);
    expect(o_task_disp.querySelector("#next").style.display).toBe("none");

    o_task_disp.attributeChangedCallback("numtasks", 2, 4);
    expect(o_task_disp.querySelector("#next").style.display).toBe("");

    o_task_disp.attributeChangedCallback("currtask", 0, "Do Laundry");
    expect(o_task_disp.querySelector("#current").innerText).toBe("Do Laundry");

    o_task_disp.attributeChangedCallback("nexttask", 0, "Do Homework");
    expect(o_task_disp.querySelector("#next").innerText).toBe("Do Homework");
});

test('Testing Task Display handleEndSession + handleStartSession', () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.handleEndSession();
    expect(o_task_disp.querySelector(".middle-container").style.display).toBe("none");
    o_task_disp.handleStartSession();
    expect(o_task_disp.querySelector(".middle-container").style.display).toBe("block");
});

test('Testing Task Display disableCheck() + enableCheck()', () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.enableCheck();
    expect(o_task_disp.querySelector("#check").disabled).toBe(false);
    expect(o_task_disp.querySelector("#check-error").title).toBe("Task completed!");
    expect(o_task_disp.querySelector("#check-error").classList.contains("color-error")).toBe(false);

    o_task_disp.disableCheck();
    expect(o_task_disp.querySelector("#check").disabled).toBe(true);
    expect(o_task_disp.querySelector("#check-error").title).toBe("");
    expect(o_task_disp.querySelector("#check-error").classList.contains("color-error")).toBe(true);
});
