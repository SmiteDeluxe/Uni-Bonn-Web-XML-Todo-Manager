<template>
    <!-- Abgabe von *** *** und *** ***-->
    <Header 
        v-if="loaded"
        :user_id="todolistdata.userID"
        :user_name="todolistdata.user"/>
    <Main 
        v-if="loaded && !error" 
        :todolist="todolistdata" 
        @addnew="addnew" 
        @addtask="addtask" 
        @confirm_deletion_pressed="confirm_deletion_pressed" 
        @calc_new_percent="calc_new_percent" 
        @confirmchange_name="confirmchange_name" 
        @confirmchange_date="confirmchange_date" 
        @change_title="change_title" 
        @deltask="deltask"/>
    <span id="error"
        v-if="error">Something went wrong! Please reload.
    </span>
    <Footer/>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Main from './components/Main_cont.vue';
import * as api from './api/api.js';


export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  },
  methods: {
    //Add a complete new taskwindow/list
    addnew: async function(name) {
      let newitem = {
        name: name,
      };
      try{
          let postedlist = await api.createList(this.todolistdata.userID, newitem.name);
          this.todolistdata.lists.push(postedlist);

      } catch (e) {
        this.error = true;
      }
      
    },

    //Add new a task
    addtask: async function(newtaskobj, calcfunc) {
        for(let i=0;i<this.todolistdata.lists.length;i++) {
            if(this.todolistdata.lists[i].listID === newtaskobj.id) {
                try {
                    if(newtaskobj.new.deadline) {
                        let postedtask = await api.createTask(this.todolistdata.userID,this.todolistdata.lists[i].listID, newtaskobj.new.name, newtaskobj.new.deadline);
                        this.todolistdata.lists[i].items.push(postedtask);
                    } else{
                        let postedtask = await api.createTask(this.todolistdata.userID,this.todolistdata.lists[i].listID, newtaskobj.new.name);
                        this.todolistdata.lists[i].items.push(postedtask);
                    }
                    calcfunc();
                    return;
                } catch(e) {
                    this.error = true;
                }
            }
        }
    },

    //delete a list
    confirm_deletion_pressed: async function(id, calcfunc, resizemethod) {
        try {
            await api.deleteList(this.todolistdata.userID, id);
            this.todolistdata.lists = this.todolistdata.lists.filter(e => e.listID !== id);
            calcfunc();
            resizemethod();
            return;
        } catch(e) {
            this.error = true;
        }
    },

    //calculates the current status of a list
    calc_new_percent: async function(id, calcfunc, asidefunc){
        for(let i=0;i<this.todolistdata.lists.length;i++) {
            for(let j=0;j<this.todolistdata.lists[i].items.length;j++) {
                if(this.todolistdata.lists[i].items[j].taskID === id) {
                    try {
                        let newdone = !(this.todolistdata.lists[i].items[j].done);
                        await api.patchTask(this.todolistdata.userID,this.todolistdata.lists[i].listID,id,'',newdone,'');
                        this.todolistdata.lists[i].items[j].done = newdone;
                        calcfunc();
                        asidefunc();
                        return;
                    } catch(e) {
                        this.error = true;
                    }
                }
            }
        }
    },

    //change the name of an existing task
    confirmchange_name: async function(task) {
        for(let i=0;i<this.todolistdata.lists.length;i++) {
            for(let j=0;j<this.todolistdata.lists[i].items.length;j++) {
                if(this.todolistdata.lists[i].items[j].taskID === task.id) {
                    try {
                        await api.patchTask(this.todolistdata.userID,this.todolistdata.lists[i].listID,task.id,task.new,null,'');
                        this.todolistdata.lists[i].items[j].name = task.new;
                        return;
                    } catch(e) {
                        this.error = true;
                    }
                }
            }
        }
    },

    //change the date of an existing task
    confirmchange_date: async function(task,datefunc,datesaside) {
        for(let i=0;i<this.todolistdata.lists.length;i++) {
            for(let j=0;j<this.todolistdata.lists[i].items.length;j++) {
                if(this.todolistdata.lists[i].items[j].taskID === task.id) {
                    try {
                        await api.patchTask(this.todolistdata.userID,this.todolistdata.lists[i].listID,task.id,'',null,task.new);
                        this.todolistdata.lists[i].items[j].deadline = task.new;
                        datefunc();
                        datesaside();
                        return;
                    } catch(e) {
                        this.error = true;
                    }
                }
            }
        }
    },

    //change the name of an existing title
    change_title: async function(titleobj, calcfunc) {
        for(let i=0;i<this.todolistdata.lists.length;i++) {
            if(this.todolistdata.lists[i].listID === titleobj.id) {
                try{
                    await api.patchList(this.todolistdata.userID,this.todolistdata.lists[i].listID, titleobj.new);
                    this.todolistdata.lists[i].name = titleobj.new;
                    calcfunc();
                    return;
                } catch(e){
                    this.error = true;
                }
            }
        }
    },

    //delete a task
    deltask: async function(taskid) {
        for(let i=0;i<this.todolistdata.lists.length;i++) {
            for(let j=0;j<this.todolistdata.lists[i].items.length;j++) {
                let topop = this.todolistdata.lists[i].items[j];
                if(topop.taskID === taskid) {
                    try{
                        await api.deleteTask(this.todolistdata.userID,this.todolistdata.lists[i].listID,taskid);
                        this.todolistdata.lists[i].items.splice(j, 1);
                        return;
                    } catch(e){
                        this.error = true;
                    }
                }
            }
        }
    },
    getalldata: async function() {
        let todolist = {};
        let users = await api.getUsers();
        let userobj = await api.getConcreteUser(users[0]);
        todolist.user = userobj.user;
        todolist.userID = userobj.userID;
        todolist.lists = [];
        let userlists = await api.getLists(users[0]);

        for(let listid of userlists) {
            let listobj = await api.getConcreteLists(todolist.userID,listid);
            let taskids = await api.getTasks(todolist.userID,listid);
            let items = [];
            for(let taskid of taskids) {
                let taskobj = await api.getConcreteTasks(todolist.userID,listid,taskid);
                items.push(taskobj);
            }
            listobj.items = items;
            todolist.lists.push(listobj);
        }
        
        this.todolistdata = todolist;
        this.loaded = true;
}
  },
  data: function() {
    return {
      todolistdata: Object,
      loaded: false,
      error: false,
    };
  },
  mounted() {
    this.getalldata();     
  }
};
</script>

<style>

html, body {
    height: 100%;
}
body {
    font-size: 17px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgb(255, 255, 255);
}
.color1 {
    background-color: #E77B73;
}
.color2 {
    background-color: #8799C0;
}
.color3 {
    background-color: #DEED5A;
}
.color4 {
    background-color: #9272AC;
}
.color5 {
    background-color: #FFD333;
}
.color6 {
    background-color: #E0BD52;
}
.color7 {
    background-color: #57B2C7;
}
.color8 {
    background-color: #B05782;
}
.color9 {
    background-color: #FF9747;
}
.color_main {
    color: rgb(32, 32, 32);
}

.unselectable {
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}


#app {
    min-width: 800px;
    width: 65%;
    height: 80vh;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    grid-template-areas:
        "header"
        "main"
        "footer";
    box-shadow: 2px 2px 24px -8px rgba(0,0,0,0.4);
}

* { 
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box; 
    color:rgb(32, 32, 32);
    font-family: 'Raleway', sans-serif;
}

/*Scrollbars*/
*::-webkit-scrollbar-track {
	border-radius: 10px;
}

*::-webkit-scrollbar {
	width: 12px;
}

* {
    scrollbar-color: rgb(231, 231, 231) transparent ;
    scrollbar-width: thin;
}
#error {
    color: red;
}

#div_scroll::-webkit-scrollbar-thumb{
	border-radius: 10px;
	background-color: rgb(231, 231, 231);
}

.upcoming_wrapper::-webkit-scrollbar-thumb{
	border-radius: 10px;
	background-color: rgb(248, 248, 248);
}

.big_task ul::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: rgb(223, 223, 223);
}


.btn {
    border-radius: 5px;
    border: 0px;
    margin: 2.5px 2.5px 2.5px 2.5px;
    height: 45px;
    width: 90px;
    cursor: pointer;
    font-weight: 500;
    font-size: 17px;
}

/* Media Stuff */
@media screen and (max-width: 675px) {
    #app {
        height: auto;
    }
}

@media screen and (orientation: landscape) and (max-height: 700px) {
    body{
        height: 100vh;
    }

    footer {
        display: none;
    }

    #app {
        grid-template-rows: 20% 80%;
        width: 100vw;
        height: 100vh;
        min-width: 0;
    }
}

@media screen and (max-width: 1025px) {
    #app {
        width: 100vw;
        height: 100vh;
        min-width: 0;
    }
}


@media  screen and (orientation: portrait) and (max-width: 675px) {
    
    #app{
        grid-template-rows: 10% 83% 7%;
    }

}

@media screen and (min-height:2160px){
    *{font-size: 35px;}
}

</style>
