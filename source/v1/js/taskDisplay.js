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

    /*Current task's id*/
    n_curr_taskid=-1;

    /*Next task's id*/
    n_next_taskid=-1;

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

        //let o_check_btn= document.createElement("button");
        //o_check_btn.id= 'check';
        let o_next_btn = document.createElement("i");
        o_next_btn.id = 'check';
        o_next_btn.classList.add("fas", "fa-check-circle", "fa-2x", "tool", "check", "btn");
        //o_next_btn.addEventListener("click", TaskDisplay.pressCheck());
        o_next_btn.addEventListener("click", TaskDisplay.pressCheck.bind(this));
        //o_check_btn.append(o_next_btn);

        let o_next_title = document.createElement("h3");
        o_next_title.innerText = "Next Task:";

        let o_next_disp = document.createElement("div");
        o_next_disp.id="next";
        o_next_disp.innerHTML="Do that";

        o_wrapper_obj.append(o_curr_title,o_curr_disp,o_next_btn,o_next_title,o_next_disp);
        this.append(o_wrapper_obj);
    }

    /**
     * Handles pressing the check button.
     */
    static pressCheck(o_event){
        delete TaskDisplay.o_tasks[TaskDisplay.n_curr_taskid];
        TaskDisplay.updateDisp();
    }

    /**
     * Enables next task button.
     */
    static enableBtn(){
        console.log(TimerContainer.n_curr_state);
        //TaskDisplay.n
        //if(TimerContainer.n_curr_state){}
    }

    /**
     * Disables next task button during breaks and when all tasks are completed.
     */
    static disableBtn(){}
    
    /**
     * Mimics end of session functionality when all tasks are completed.
     */
    static tasksComplete(){
        let o_vals=new Array(Object.values(this.o_tasks));
        console.log(o_vals[0].length);
        //no tasks left, so it displays finish
        if(o_vals[0].length==0){
            document.getElementById("current").innerHTML="All tasks for this session completed!";
            document.getElementById("next").innerHTML="All tasks for this session completed!";
            this.disableBtn();
        }
    }
    
    /**
     * Updates display for current and next task (from task list).
     */
    static updateDisp(){
        let b_curr=new Boolean(false);
        let b_next=new Boolean(false);
        
        //iterate through tasks and find first two valid tasks to display
        for (const [key, value] of Object.entries(this.o_tasks)) {
            if(b_curr == false && this.o_tasks[key] != undefined){
                document.getElementById("current").innerHTML=value;
                b_curr=true;
                this.n_curr_taskid=key;
            }
            else if(b_next == false && this.o_tasks[key] != undefined){
                this.n_next_taskid=key;
                document.getElementById("next").innerHTML=value;
                b_next=true;
                return;
            } 
        }        
        //if bools are false and exits loop, there are no tasks to fill next or current
        if(b_curr==false){
            console.log(typeof TaskDisplay.o_tasks);
            this.tasksComplete();
        }

        else if(b_next==false){
            document.getElementById("next").innerHTML="No more tasks for this session!";
        }
    }
    
    /**
     * Updates the list of tasks whenever a task is added or deleted.
     * @param {map} o_task_list 
     */
    static update_List(o_task_list){
        this.o_tasks=o_task_list;
    }

    
}


customElements.define("task-display", TaskDisplay);


export { TaskDisplay }