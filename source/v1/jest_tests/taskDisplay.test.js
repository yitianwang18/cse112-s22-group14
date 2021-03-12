import { TaskDisplay } from "../js/taskDisplay.js";

test('Testing Task Display', () => {
    o_task_disp = new TaskDisplay();

    o_task_disp.attributeChangedCallback("numtasks", 0, 0);
    expect(o_task_disp.querySelector("#next").style.display).toBe("none");

});