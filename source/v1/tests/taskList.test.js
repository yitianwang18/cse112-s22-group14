/// <reference types="jest" />
import { TaskList } from "../js/taskList.js";
test('TaskList Item Addition', () => {
    let o_tasklist = new TaskList();

    // adding single item
    o_tasklist.addItem("Task1");
    expect(o_tasklist.o_tasks[0]).toBe("Task1");
    expect(Object.keys(o_tasklist.o_tasks).length).toBe(1);
    expect(o_tasklist.o_tasks[1]).toBe(undefined);
    expect(o_tasklist.querySelector("#all-tasks").children.length).toBe(1);
    expect(o_tasklist.n_next_task_id).toBe(1);

    // adding another item
    o_tasklist.addItem("Task2");
    expect(o_tasklist.o_tasks[0]).toBe("Task1");
    expect(Object.keys(o_tasklist.o_tasks).length).toBe(2);
    expect(o_tasklist.o_tasks[1]).toBe("Task2");
    expect(o_tasklist.o_tasks[2]).toBe(undefined);
    expect(o_tasklist.querySelector("#all-tasks").children.length).toBe(2);
    expect(o_tasklist.n_next_task_id).toBe(2);
});

test("TaskList Item Removing", () => {
    let o_tasklist = new TaskList();

    o_tasklist.addItem("Task1");
    o_tasklist.addItem("Task2");
    o_tasklist.addItem("Task3");

    expect(Object.keys(o_tasklist.o_tasks).length).toBe(3);
    expect(o_tasklist.o_tasks[0]).toBe("Task1");
    expect(o_tasklist.o_tasks[1]).toBe("Task2");
    expect(o_tasklist.o_tasks[2]).toBe("Task3");
    expect(o_tasklist.n_next_task_id).toBe(3);

    o_tasklist.removeItem(1);
    expect(Object.keys(o_tasklist.o_tasks).length).toBe(2);
    expect(o_tasklist.o_tasks[0]).toBe("Task1");
    expect(o_tasklist.o_tasks[1]).toBe(undefined);
    expect(o_tasklist.o_tasks[2]).toBe("Task3");
    expect(o_tasklist.n_next_task_id).toBe(3);

    o_tasklist.addItem("Task4");
    expect(Object.keys(o_tasklist.o_tasks).length).toBe(3);
    expect(o_tasklist.o_tasks[0]).toBe("Task1");
    expect(o_tasklist.o_tasks[1]).toBe(undefined);
    expect(o_tasklist.o_tasks[2]).toBe("Task3");
    expect(o_tasklist.o_tasks[3]).toBe("Task4");
    expect(o_tasklist.n_next_task_id).toBe(4);
});

test("Tasklist getItems", () => {
    let o_tasklist = new TaskList();
    o_tasklist.addItem("Task1");
    o_tasklist.addItem("Task2");
    o_tasklist.addItem("Task3");

    expect(o_tasklist.getItems()).toEqual(o_tasklist.o_tasks);
});

test("Tasklist clearInput", () => {
    let o_tasklist = new TaskList();
    o_tasklist.querySelector("input[name=task]").value = "foobar123";
    expect(o_tasklist.querySelector("input[name=task]").value).toEqual("foobar123");

    o_tasklist.clearInput();
    expect(o_tasklist.querySelector("input[name=task]").value).toEqual("");
});

test("TaskList static validateString", () => {
    let o_tasklist = new TaskList();

    const s_empty_string = "";
    expect(TaskList.validateString(s_empty_string)).toBe(false);
});

