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
    // expect(o_tasklist.o_tasks[1]).toBe(undefined);
    expect(o_tasklist.o_tasks[1]).toBe("Task3");
    expect(o_tasklist.n_next_task_id).toBe(2);

    o_tasklist.addItem("Task4");
    expect(Object.keys(o_tasklist.o_tasks).length).toBe(3);
    expect(o_tasklist.o_tasks[0]).toBe("Task1");
    //expect(o_tasklist.o_tasks[1]).toBe(undefined);
    expect(o_tasklist.o_tasks[1]).toBe("Task3");
    expect(o_tasklist.o_tasks[2]).toBe("Task4");
    expect(o_tasklist.n_next_task_id).toBe(3);
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
    const s_empty_string = "";
    const s_whitespace = "   \t\n";
    const s_normal = "task12345";
    const s_normal_padded = " \t\ntask12345\t\n ";
    const s_oversize = "".padStart(TaskList.N_MAX_TASK_LENGTH + 1, "A");
    const s_oversize_padded = " \t\n" + "".padStart(TaskList.N_MAX_TASK_LENGTH - 2, "A") + "\t\n ";
    expect(TaskList.validateString(s_empty_string)).toBe(1);
    expect(TaskList.validateString(s_whitespace)).toBe(1);
    expect(TaskList.validateString(s_normal)).toBe(0);
    expect(TaskList.validateString(s_normal_padded)).toBe(0);
    expect(TaskList.validateString(s_oversize)).toBe(2);
    expect(TaskList.validateString(s_oversize_padded)).toBe(0);
});

test('Testing getNumTasks() for correct number of tasks returned', () => {
    let o_tasklist = new TaskList();

    // adding single item
    o_tasklist.addItem("Task1");
    // adding another item
    o_tasklist.addItem("Task2");

    expect(o_tasklist.getNumTasks()).toBe(2);
    o_tasklist.removeItem(1);
    expect(o_tasklist.getNumTasks()).toBe(1);
    o_tasklist.removeItem(0);
    expect(o_tasklist.getNumTasks()).toBe(0);
});

test('Testing popTask() for task removal from TaskList', () => {
    let o_tasklist = new TaskList();

    // adding single item
    o_tasklist.addItem("Task1");
    // adding another item
    o_tasklist.addItem("Task2");

    expect(o_tasklist.getNumTasks()).toBe(2);
    o_tasklist.popTask();
    expect(o_tasklist.getNumTasks()).toBe(1);
    o_tasklist.popTask();
    expect(o_tasklist.getNumTasks()).toBe(0);
});

test('Testing getNextTask() for correct retrieval of next task', () => {
    let o_tasklist = new TaskList();

    // adding single item
    o_tasklist.addItem("Task1");
    // adding another item
    o_tasklist.addItem("Task2");

    expect(o_tasklist.getNumTasks()).toBe(2);
    expect(o_tasklist.getNextTask()).toBe(o_tasklist.o_tasks[Object.keys(o_tasklist.o_tasks)[0]]);
    o_tasklist.popTask();
    o_tasklist.popTask();
    expect(o_tasklist.getNextTask()).toBe(undefined);
});


test('Testing getNextNextTask() for correct retrieval of next-next task', () => {
    let o_tasklist = new TaskList();

    // adding single item
    o_tasklist.addItem("Task1");
    // adding another item
    o_tasklist.addItem("Task2");

    expect(o_tasklist.getNextNextTask()).
        toBe(o_tasklist.o_tasks[Object.keys(o_tasklist.o_tasks)[1]]);
    o_tasklist.popTask();
    expect(o_tasklist.getNextNextTask()).toBe(undefined);
    o_tasklist.popTask();
    expect(o_tasklist.getNextTask()).toBe(undefined);
});

test('Testing setNewTaskOrder', () => {
    let o_tasklist = new TaskList();

    // adding single item
    o_tasklist.addItem("Task0");
    // adding another item
    o_tasklist.addItem("Task1");
    // adding another item
    o_tasklist.addItem("Task2");

    let tasks = o_tasklist.querySelector(`#all-tasks`);
    tasks.children["0"].setAttribute("taskname", "newTask0");
    o_tasklist.editItemName(tasks.children["0"].getAttribute("taskid"));
    tasks.children["0"].setAttribute("taskname", "Task0");
    o_tasklist.editItemName(tasks.children["0"].getAttribute("taskid"));
    let dragged = tasks.children["2"];
    dragged.setAttribute("dragging", true);
    dragged.classList.add("dragging");
    
    expect(o_tasklist.querySelector(`#all-tasks`).children["0"].getAttribute("taskname"))
        .toBe("Task0");
    expect(o_tasklist.querySelector(`#all-tasks`).children["1"].getAttribute("taskname"))
        .toBe("Task1");
    expect(o_tasklist.querySelector(`#all-tasks`).children["2"].getAttribute("taskname"))
        .toBe("Task2");
    
    tasks.insertBefore(dragged, tasks.children["0"]);
    expect(o_tasklist.querySelector(`#all-tasks`).children["0"].getAttribute("taskid")).toBe("2");
    expect(o_tasklist.querySelector(`#all-tasks`).children["1"].getAttribute("taskid")).toBe("0");
    expect(o_tasklist.querySelector(`#all-tasks`).children["2"].getAttribute("taskid")).toBe("1");
    expect(dragged.getAttribute('dragging')).toBe("true");
    
    o_tasklist.setNewTaskOrder(dragged);
    expect(o_tasklist.querySelector(`#all-tasks`).children["0"].getAttribute("taskid")).toBe("0");
    expect(o_tasklist.querySelector(`#all-tasks`).children["1"].getAttribute("taskid")).toBe("1");
    expect(o_tasklist.querySelector(`#all-tasks`).children["2"].getAttribute("taskid")).toBe("2");
    expect(dragged.getAttribute('dragging')).toBe(null);
});

test('Testing getDragAfterElement', () => {
    let o_tasklist = new TaskList();
    o_tasklist.addItem("Task1");
    o_tasklist.addItem("Task2");

    expect(o_tasklist.getDragAfterElement(10)).toBe(undefined);
    const o_undragged_tasks = [...o_tasklist.querySelectorAll('task-item:not([dragging=""]')]
    expect(o_undragged_tasks[0].toString()).toBe("[object HTMLElement]");
});

test('Testing handleDrag', () => {
    let o_tasklist = new TaskList();
    o_tasklist.addItem("Task1");
    o_tasklist.addItem("Task2");

    expect(o_tasklist.handleAddTask()).toBe(undefined);

    let o_tasks = document.createElement("div");
    expect(o_tasks.addEventListener('dragover', (event) => this.handleDrag(event))).toBe(undefined);
});


test('Testing editItemName', () => {
    let o_tasklist = new TaskList();
    o_tasklist.addItem("Task1");
    o_tasklist.addItem("Task2");
    expect(o_tasklist.editItemName(0)).toBe(undefined);

    o_tasklist.removeItem(0);
    o_tasklist.addItem("");
    expect(o_tasklist.editItemName(0)).toBe(undefined);
});

test('Testing showTaskList', () => {
    let o_tasklist = new TaskList();
    o_tasklist.addItem("Task1");

    expect(o_tasklist.showTaskList()).toBe(undefined);
    let o_tasks = o_tasklist.querySelector("#side-tasks");
    expect(o_tasks.style.display).toBe("block");

    o_tasklist.removeItem(0);

    expect(o_tasklist.showTaskList()).toBe(undefined);
    let o_tasks1 = o_tasklist.querySelector("#side-tasks");
    expect(o_tasks1.style.display).toBe("block");
});

test('Testing closeTaskList', () => {
    let o_tasklist = new TaskList();
    o_tasklist.addItem("Task1");

    expect(o_tasklist.closeTaskList()).toBe(undefined);
    let o_tasks = o_tasklist.querySelector("#close-task");
    expect(o_tasks.style.display).toBe("none");
});
