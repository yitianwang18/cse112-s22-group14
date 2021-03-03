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
     * Constructor. Initializes task display.
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

        let o_check_btn= document.createElement("button");
        o_check_btn.className="btn";
        o_check_btn.id= 'check';
        let o_next_btn = document.createElement("i");
        o_next_btn.classList.add("fas", "fa-check-circle", "fa-x", "tool"); 
        o_check_btn.addEventListener("click", this.pressCheck.bind(this));
        o_check_btn.append(o_next_btn);

        let o_next_title = document.createElement("h3");
        o_next_title.innerText = "Next Task:";

        let o_next_disp = document.createElement("div");
        o_next_disp.id="next";
        o_next_disp.innerHTML="Do that";

        o_wrapper_obj.append(o_curr_title,o_curr_disp,o_check_btn,o_next_title,o_next_disp);
        this.append(o_wrapper_obj);
        
        document.getElementById("start-btn").addEventListener("click", this.startDisp.bind(this));
        document.getElementById("end-btn").addEventListener("click", this.endDisp.bind(this));
    }

    /**
     * 
     * @param {object} o_event click event
     * Finishes display at end of session.
     */
    endDisp(o_event){
        document.getElementById("current").innerHTML="All tasks for this session completed!";
        document.getElementById("next").innerHTML="All tasks for this session completed!"; 
    }

    /**
     * 
     * @param {object} o_event click event
     * Initializes display on session start.
     */
    startDisp(o_event){
        this.updateList();
    }

    /**
     * Handles pressing the check button.
     */
    pressCheck(o_event){                     
        //checks edge cases
        if(this.o_tasks==undefined || Object.values(this.o_tasks).length==0 
          || document.getElementById("timercont").n_curr_state !== 0){
            return;
        }
        
        //removes task
        document.querySelector(`#all-tasks task-item[taskid='${this.n_curr_taskid}']`).remove();    
        delete this.o_tasks[this.n_curr_taskid];
        this.updateDisp();
    }
    
    /**
     * Mimics end of session functionality when all tasks are completed.
     */
    tasksComplete(){
        let o_vals=new Array(Object.values(this.o_tasks));

        //no tasks left, so it displays finish
        if(o_vals[0].length==0){
            document.getElementById("current").innerHTML="All tasks for this session completed!";
            document.getElementById("next").innerHTML="All tasks for this session completed!";
            document.getElementById("timercont").endSession();
        }
    }
    
    /**
     * Updates display for current and next task (from task list).
     */
    updateDisp(){
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
            this.tasksComplete();
        }

        else if(b_next==false){
            document.getElementById("next").innerHTML="No more tasks for this session!";
        }
    }
    
    /**
     * Updates the list of tasks to match taskList at start of session.
     * @param {map} o_task_list 
     */
    updateList(){
        let temp=document.querySelector("task-list").o_tasks;
        this.o_tasks=temp;
        this.updateDisp();
    }
}


customElements.define("task-display", TaskDisplay);


export { TaskDisplay }