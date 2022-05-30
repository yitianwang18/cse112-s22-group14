import { Task } from "../js/task.js";

test("Task static validateString", () => {
    const s_empty_string = "";
    const s_whitespace = "   \t\n";
    const s_normal = "task12345";
    const s_normal_padded = " \t\ntask12345\t\n ";
    const s_oversize = "".padStart(Task.N_MAX_TASK_LENGTH + 1, "A");
    const s_oversize_padded = " \t\n" + "".padStart(Task.N_MAX_TASK_LENGTH - 2, "A") + "\t\n ";
    expect(Task.validateString(s_empty_string)).toBe(false);
    expect(Task.validateString(s_whitespace)).toBe(false);
    expect(Task.validateString(s_normal)).toBe(true);
    expect(Task.validateString(s_normal_padded)).toBe(true);
    expect(Task.validateString(s_oversize)).toBe(false);
    expect(Task.validateString(s_oversize_padded)).toBe(true);
});

test("Test task attribute change", () => {
    let o_task = new Task();
    let task1 = "task1";
    task1 = "newtask1";
    if(Task.validateString(task1)) {
        o_task.setAttribute("taskname", task1);
        o_task.setAttribute("taskid", "1");
    }
    if(Task.validateString(task1)) {
        o_task.setAttribute("taskname", task1);
        o_task.attributeChangedCallback();
    }
    expect(Task.validateString(task1)).toBe(true);
});