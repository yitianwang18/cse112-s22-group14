import { Task } from "./task.js";
import { TaskList } from "./taskList.js";
import { TimerContainer } from "./timerContainer.js";

/**
 * Custom HTML element encapsulating the display of current and next task during a pomo
 * @extends HTMLElement
 */
class TaskDisplay extends HTMLElement {
    
    /**
     * Constructor. Initializes task display.
     */
    constructor(){
        super();
        //wrapper div
        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className="middle-container";

        //current header
        let o_curr_title = document.createElement("h3");
        o_curr_title.innerText = "Current Task:";

        //div for box displaying current
        let o_curr_disp = document.createElement("div");
        o_curr_disp.id="current";
        o_curr_disp.innerHTML="Do this";

        //check button
        let o_check_btn= document.createElement("button");
        o_check_btn.className="btn";
        o_check_btn.id= 'check';
        let o_next_btn = document.createElement("i");
        o_next_btn.classList.add("fas", "fa-check-circle", "fa-x", "tool"); 
        o_check_btn.addEventListener("click", this.pressCheck.bind(this));
        o_check_btn.append(o_next_btn);

        //header for next task
        let o_next_title = document.createElement("h3");
        o_next_title.innerText = "Next Task:";

        //div for box displaying next
        let o_next_disp = document.createElement("div");
        o_next_disp.id="next";
        o_next_disp.innerHTML="Do that";

        o_wrapper_obj.append(o_curr_title,o_curr_disp,o_check_btn,o_next_title,o_next_disp);
        this.append(o_wrapper_obj);
        
        //listeners for start and end session
        document.getElementById("start-btn").addEventListener("click", this.startDisp.bind(this));
        document.getElementById("end-btn").addEventListener("click", this.endDisp.bind(this));
    
        /*Map containing tasks*/
        let o_tasks = {};

        /*Current task's id*/
        let n_curr_taskid=-1;

        /*Next task's id*/
        let n_next_taskid=-1;
    }

    /**
     * Finishes display at end of session.
     * @param {Event} o_event event instance
     */
    endDisp(o_event){                                     
        this.querySelector("#current").innerHTML="All tasks for this session completed!";
        this.querySelector("#next").innerHTML="All tasks for this session completed!"; 
        this.o_tasks={};
        this.tasksComplete();
    }

    /**
     * Initializes display on session start.
     * @param {object} o_event click event
     */
    startDisp(o_event){
        this.updateList();
    }

    /**
     * Handles pressing the check button.
     * @param {Event} o_event event instance
     */
    pressCheck(o_event){                     
        //checks edge cases
        if(this.o_tasks==undefined || Object.values(this.o_tasks).length==0 
          || document.querySelector("timer-element").n_curr_state !== 0){
            return;
        }
        
        //removes task   
        document.querySelector("task-list").removeItem(this.n_curr_taskid);
        delete this.o_tasks[this.n_curr_taskid];
        this.updateDisp();
    }

    /**
     * Helper function called from parent component to disable button during breaks.
     * 
     */
    disableCheck(){
        document.getElementById("check").disabled=true;
    }

    /**
     * Helper function called from parent component to enable button.
     * 
     */
    enableCheck(){
        document.getElementById("check").disabled=false;
    }

    /**
     * Helper function called from parent component to hide display.
     * 
     */
    hideDisp(){
        document.getElementsByClassName("middle-container").style.display="none";
    }

    /**
     * Helper function called from parent component to show display.
     * 
     */
    showDisp(){
        document.getElementsByClassName("middle-container").style.display="";
    }
    
    /**
     * Mimics end of session functionality when all tasks are completed.
     */
    tasksComplete(){
        let o_vals=new Array(Object.values(this.o_tasks));
        //no tasks left, so it displays finish
        if(o_vals[0].length==0){
            this.querySelector("#current").innerHTML="All tasks for this session completed!";
            this.querySelector("#next").innerHTML="All tasks for this session completed!";
            this.querySelector("#next").style.display="none";
            document.querySelector("timer-element").endSession();
            document.querySelector("timer-element").renderComponents();
            document.querySelector("#reset-btn").classList.add("hidden");
            document.querySelector("#reset-btn").disabled = false;
            document.querySelector("#start-btn").classList.remove("hidden");
            document.querySelector("#task-btn").disabled=false;
        }
    }
    
    /**
     * Updates display for current and next task (from task list).
     */
    updateDisp(){
        let b_curr=false;
        let b_next=false;
        
        //iterate through tasks and find first two valid tasks to display
        for (const [key, value] of Object.entries(this.o_tasks)) {
            if(!b_curr && this.o_tasks[key] != undefined){
                this.querySelector("#current").innerHTML=value;
                b_curr=true;
                this.n_curr_taskid=key;
            }
            else if(b_next == false && this.o_tasks[key] != undefined){
                this.n_next_taskid=key;
                this.querySelector("#next").innerHTML=value;
                b_next=true;
                return;
            } 
        }        
        //if bools are false and exits loop, there are no tasks to fill next or current
        if(!b_curr){
            this.tasksComplete();
        }

        else if(!b_next){
            this.querySelector("#next").innerHTML="No more tasks for this session!";
            this.querySelector("#next").style.display="none";
        }
    }
    
    /**
     * Updates the list of tasks to match taskList at start of session. 
     */
    updateList(){
        let temp=document.querySelector("task-list").o_tasks;
        this.o_tasks=temp;
        this.updateDisp();
        //hides next task if no next available
        if(this.o_tasks.length<=1){
            this.querySelector("#next").style.display="none";
        }
        else if(this.o_tasks.length>=2){
            this.querySelector("#next").style.display="";
        }
    }
}


customElements.define("task-display", TaskDisplay);


export { TaskDisplay }