import { TaskDisplay } from "../js/taskDisplay.js";
import { jest } from '@jest/globals';

test("Testing attributeChangedCallback function to correctly alter task display", () => {
    let o_task_disp = new TaskDisplay();

    const f_mockCallback = jest.spyOn(o_task_disp, "wrapperAttributeFunction");

    // task display should not show when no task
    o_task_disp.setAttribute("numtasks", 0);
    // We expect the display attribute to be 'none' and h3 value to be 'none'
    expect(o_task_disp.querySelector("#next").style.display).toBe("none");
    expect(o_task_disp.getElementsByTagName("h3")[1].style.display).toBe("none");
    // The first arg of the first call to attributeChangedCallback to be "nexttask"
    expect(f_mockCallback.mock.calls[0][0]).toBe("numtasks");
    // The second arg of the first call to attributeChangedCallback to be 0
    expect(f_mockCallback.mock.calls[0][1]).toBe("0");
    // We expect the function to be called once so far
    expect(f_mockCallback).toHaveBeenCalledTimes(1);

    // task display should not show when only 1 task
    o_task_disp.setAttribute("numtasks", 1);
    expect(o_task_disp.querySelector("#next").style.display).toBe("none");
    expect(o_task_disp.getElementsByTagName("h3")[1].style.display).toBe("none");
    // The third arg of second call to attributeChangedCallback to be '1'
    expect(f_mockCallback.mock.calls[1][2]).toBe("1");
    // We expect the function to be called twice so far
    expect(f_mockCallback).toHaveBeenCalledTimes(2);

    // task display should show when at least 2 tasks
    o_task_disp.setAttribute("numtasks", 2);
    expect(o_task_disp.querySelector("#next").style.display).toBe("");
    expect(o_task_disp.getElementsByTagName("h3")[1].style.display).toBe("");
    // The first arg of the third call to attributeChangedCallback was "nexttask"
    expect(f_mockCallback.mock.calls[2][0]).toBe("numtasks");
    // The third arg of the third call to attributeChangedCallback to be 0
    expect(f_mockCallback.mock.calls[2][2]).toBe("2");
    expect(f_mockCallback).toHaveBeenCalledTimes(3);

    // task display should reset current task to new task value
    o_task_disp.setAttribute("currtask", "Do Laundry");
    expect(o_task_disp.querySelector("#current").innerText).toBe("Do Laundry");
    // The first arg of the fourth call to attributeChangedCallback was "currtask"
    expect(f_mockCallback.mock.calls[3][0]).toBe("currtask");
    expect(f_mockCallback).toHaveBeenCalledTimes(4);

    o_task_disp.setAttribute("nexttask", "Do Homework");
    expect(o_task_disp.querySelector("#next").innerText).toBe("Do Homework");
    // The first arg of the fifth call to attributeChangedCallback was "nexttask"
    expect(f_mockCallback.mock.calls[4][0]).toBe("nexttask");
    // The third arg of the fifth call to attributeChangedCallback to be "Do Homework"
    expect(f_mockCallback.mock.calls[4][2]).toBe("Do Homework");
    // The function has been called 5 times so far
    expect(f_mockCallback).toHaveBeenCalledTimes(5);
    // This function was instantiated five times so far
    expect(f_mockCallback.mock.instances.length).toBe(5);

});

test("Testing Task Display handleStartSession", () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.handleStartSession();
    expect(o_task_disp.querySelector(".middle-container").style.display).toBe("block");
});

test("Testing Task Display handleEndSession", () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.handleEndSession();
    expect(o_task_disp.querySelector(".middle-container").style.display).toBe("none");
    o_task_disp.handleStartSession();
    expect(o_task_disp.querySelector(".middle-container").style.display).toBe("block");
});

test("Testing Task Display enableCheck()", () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.enableCheck();
    expect(o_task_disp.querySelector("#check").disabled).toBe(false);
    expect(o_task_disp.querySelector("#check-error").title).toBe("Task completed!");
    expect(o_task_disp.querySelector("#check-error").classList.contains("color-error")).toBe(false);
});

test("Testing Task Display disableCheck()", () => {
    let o_task_disp = new TaskDisplay();
    o_task_disp.disableCheck();
    expect(o_task_disp.querySelector("#check").disabled).toBe(true);
    expect(o_task_disp.querySelector("#check-error").title).toBe("");
    expect(o_task_disp.querySelector("#check-error").classList.contains("color-error")).toBe(true);
});
