import { Task } from "./task.js";
import { TaskList } from "./taskList.js";
import { TimerContainer } from "./timerContainer.js";

/**
 * Custom HTML element encapsulating the display of current and next task during a pomo
 * @extends HTMLElement
 */
class TaskDisplay extends HTMLElement {
    
    
    /*Map containing tasks*/
    o_tasks = {};

    /**
     * Constructor. Initializes task display
     */
    constructor(){
        super();
        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className="middle-container";

        let o_curr_title = document.createElement("h3");
        o_curr_title.innerText = "Current Task:";

        let o_curr_disp = document.createElement("div");
        o_curr_disp.id="current";
        o_curr_disp.innerHTML="Do this";

        let o_next_btn = document.createElement("i");
        o_next_btn.id = 'check';
        o_next_btn.classList.add("fas", "fa-check-circle", "fa-2x", "tool", "check", "btn");
        //o_next_btn.addEventListener("click", this.handleAddTask.bind(this));

        let o_next_title = document.createElement("h3");
        o_next_title.innerText = "Next Task:";

        let o_next_disp = document.createElement("div");
        o_next_disp.id="next";
        o_next_disp.innerHTML="Do that";

        o_wrapper_obj.append(o_curr_title,o_curr_disp,o_next_btn,o_next_title,o_next_disp);
        this.append(o_wrapper_obj);
    }

    /**
     * Updates display for current and next task.
     */
    updateDisp(){
        let b_curr=new Boolean(false);
        let b_next=new Boolean(false);
        console.log("why");
        /*this.o_tasks.forEach((values,keys) => {
            if(!b_curr && element != undefined){
                console.log(element);
                document.getElementById("current").innerHTML=element;
                b_curr=true;
            }
            else if(!b_next && element != undefined){
                console.log(element);
                document.getElementById("next").innerHTML=element;
                b_next=true;
                return;
            }
        });*/
    }
    
    /**
     * Updates the list of tasks whenever a task is added or deleted.
     * @param {map} o_task_list 
     */
    static update_List(o_task_list){
        this.o_tasks=o_task_list;
        document.getElementById("current").innerHTML=this.o_tasks[0];
        console.log(document.getElementById("task-list"));
        //console.log(this.o_tasks);
        //let this.o_tasks=TaskList.getItems(); 
        //this.o_tasks=0;
    }

    
}


customElements.define("task-display", TaskDisplay);


export { TaskDisplay }