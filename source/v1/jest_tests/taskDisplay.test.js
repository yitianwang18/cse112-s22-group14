import { TaskDisplay } from "../js/taskDisplay.js";

test('Testing attributeChangedCallback function to correctly alter task display', () => {
    let o_task_disp = new TaskDisplay();

    // task display should not show when no task
    o_task_disp.setAttribute("numtasks", 0);
    expect(o_task_disp.querySelector("#next").style.display).toBe("none");

    expect(o_task_disp.getElementsByTagName("h3")[1].style.display).toBe("none");

    // task display should not show when only 1 task
    o_task_disp.setAttribute("numtasks", 1);
    expect(o_task_disp.querySelector("#next").style.display).toBe("none");
    expect(o_task_disp.getElementsByTagName("h3")[1].style.display).toBe("none");

    // task display should show when at least 2 tasks
    o_task_disp.setAttribute("numtasks", 2);
    expect(o_task_disp.querySelector("#next").style.display).toBe("");
    expect(o_task_disp.getElementsByTagName("h3")[1].style.display).toBe("");

    // task display should reset current task to new task value
    o_task_disp.setAttribute("currtask", "Do Laundry");
    expect(o_task_disp.querySelector("#current").innerText).toBe("Do Laundry");

    o_task_disp.setAttribute("nexttask", "Do Homework");
    expect(o_task_disp.querySelector("#next").innerText).toBe("Do Homework");
});

test('Testing Task Display handleStartSession', () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.handleStartSession();
    expect(o_task_disp.querySelector(".middle-container").style.display).toBe("block");
});

test('Testing Task Display handleEndSession', () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.handleEndSession();
    expect(o_task_disp.querySelector(".middle-container").style.display).toBe("none");
    o_task_disp.handleStartSession();
    expect(o_task_disp.querySelector(".middle-container").style.display).toBe("block");
});

test('Testing Task Display enableCheck()', () => {
    let o_task_disp = new TaskDisplay();

    o_task_disp.enableCheck();
    expect(o_task_disp.querySelector("#check").disabled).toBe(false);
    expect(o_task_disp.querySelector("#check-error").title).toBe("Task completed!");
    expect(o_task_disp.querySelector("#check-error").classList.contains("color-error")).toBe(false);
});

test('Testing Task Display disableCheck()', () => {
    let o_task_disp = new TaskDisplay();
    o_task_disp.disableCheck();
    expect(o_task_disp.querySelector("#check").disabled).toBe(true);
    expect(o_task_disp.querySelector("#check-error").title).toBe("");
    expect(o_task_disp.querySelector("#check-error").classList.contains("color-error")).toBe(true);
});

