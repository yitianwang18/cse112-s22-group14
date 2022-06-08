import { TaskList } from "../js/taskList.js";
import { jest } from '@jest/globals';
import { Task } from "../js/task.js";

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
    expect(o_tasklist.o_tasks[1]).toBe("Task3");
    expect(o_tasklist.n_next_task_id).toBe(2);

    o_tasklist.addItem("Task4");
    expect(Object.keys(o_tasklist.o_tasks).length).toBe(3);
    expect(o_tasklist.o_tasks[0]).toBe("Task1");
    expect(o_tasklist.o_tasks[1]).toBe("Task3");
    expect(o_tasklist.o_tasks[2]).toBe("Task4");
    expect(o_tasklist.n_next_task_id).toBe(3);
    expect(o_tasklist.removeItem(10)).toBe(-1);
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
    o_tasklist.editItemName(1);
    expect(o_tasklist.querySelector(`#all-tasks task-item[taskid="0"]`).getAttribute('taskname')).toBe("Task2");
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

test('Testing load from local storage', () => {
    let o_tasklist = new TaskList();
    // let o_tasklist2 = new TaskList();
    o_tasklist.addItem('Task0');
    o_tasklist.addItem('Task1');
    

    // o_tasklist2.addItem('Task0');
    // o_tasklist2.addItem('Task1');
    let localStorage = window.localStorage.getItem('current_tasks');
    o_tasklist.removeItem(0);
    o_tasklist.removeItem(0);

    expect(Object.keys(o_tasklist.o_tasks).length).toBe(0);
    window.localStorage.setItem('current_tasks', localStorage);
    o_tasklist.showTaskList();
    
    expect(Object.keys(o_tasklist.o_tasks).length).toBe(2);
});

test('Testing handleKeyUpChange', () => {
    let o_tasklist = new TaskList();
    let key1 = new KeyboardEvent('keyup', {key: "Enter"});
    let key2 = new KeyboardEvent('keyup', {key: "Escape"});
    const mock1 = jest.spyOn(o_tasklist, 'handleAddTask');
    const mock2 = jest.spyOn(o_tasklist, 'closeTaskList');

    o_tasklist.handleKeyUpChange(key1);
    o_tasklist.handleKeyUpChange(key2);
    expect(mock1).toHaveBeenCalled();
    expect(mock2).toHaveBeenCalled();
});

test('Testing handleInputChange', () => {
    let o_tasklist = new TaskList();
    const oversize = "".padStart(TaskList.N_MAX_TASK_LENGTH + 1, "A");
    o_tasklist.querySelector("input[name=task]").value = oversize;
    o_tasklist.handleInputChange(undefined);
    expect(o_tasklist.querySelector("#add-error").innerHTML).toBe(TaskList.S_TASK_ERROR_TOO_LONG + ' ' + 'Count: ' + oversize.length);

    o_tasklist.querySelector("input[name=task]").value = "Task1";
    o_tasklist.handleInputChange(undefined);
    expect(o_tasklist.querySelector("#add-error").innerHTML).toBe('');


});

test('Testing handleAddTask', () => {
    let o_tasklist = new TaskList();
    const task = "task0";

    o_tasklist.querySelector("input[name=task]").value = task;
    expect(o_tasklist.querySelector(`#all-tasks`).children["0"]).toBe(undefined);
    o_tasklist.handleAddTask(); 

    const mock1 = jest.spyOn(o_tasklist, 'addItem');
    const mock2 = jest.spyOn(o_tasklist, 'clearInput');
    const mock3 = jest.spyOn(o_tasklist, 'handleInputChange');
    
    expect(o_tasklist.querySelector(`#all-tasks`).children["0"].getAttribute('taskname')).toBe('task0');
});

test('Testing handleStartSession', () => {
    let o_tasklist = new TaskList();
    const mock1 = jest.spyOn(o_tasklist, 'closeTaskList');

    o_tasklist.handleStartSession();
    expect(mock1).toHaveBeenCalled();
});

// test('Testing handleDrag', () => {
//     let o_tasklist = new TaskList();
//     let dragging = o_tasklist.querySelector('task-item[dragging=""]');

    
//     // let key2 = new DragEvent('keyup', {key: "Escape"});
//     const mock1 = jest.spyOn(o_tasklist.querySelector('#all-tasks'), 'appendChild');
//     const mock2 = jest.spyOn(o_tasklist.querySelector('#all-tasks'), 'insertBefore');

//     // o_tasklist.handleDrag(undefined);
//     o_tasklist.handleDrag(null);
//     // o_tasklist.handleDrag(key2);
//     expect(mock1).toHaveBeenCalled();
//     expect(mock2).toHaveBeenCalled();
// });

// describe('Event Handler tests', () => {
// 	let o_tasklist;
//     let o_task;
// 	let events = {};

// 	beforeEach(() => {
//         o_tasklist.querySelector(`#all-tasks`).addEventListener = jest.fn((event, callback) => {
//             events[event] = callback;
//         });
    
//         o_tasklist.querySelector(`#all-tasks`).removeEventListener = jest.fn((event, callback) => {
//             delete events[event];
//         });

//         o_tasklist = new TaskList();
// 		// Empty our events before each test case
// 		events = {};

// 		// Define the addEventListener method with a Jest mock function
// 	});

// 	test('Test handleDrag', () => {
//         o_tasklist = new TaskList();

//         jest.spyOn(o_tasklist, 'handleDrag');
        
//         // events.dragover({event: ondragover});
// 		// o_tasklist.setupEvents();

//         expect(o_tasklist.handleDrag).toHaveBeenCalled();
//         expect(events.length).toBe(10);
// 	});
// });
