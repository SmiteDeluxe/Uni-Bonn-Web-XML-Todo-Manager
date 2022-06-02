<template>
    <!-- Abgabe von *** *** und *** *** -->
    <main id="main_cont">
        <Nav
            @newtask="newtask" 
            @listtasks="listtasks"/>
        <Tasks 
            :todolist="todolist" 
            @addtask="addtask" 
            @confirm_delete="confirm_delete" 
            @calc_new_percent="calc_new_percent" 
            @confirmchange_name="confirmchange_name" 
            @confirmchange_date="confirmchange_date" 
            @change_title="change_title" 
            @deltask="deltask" />
        <Aside aside_id="aside" 
            :idobjlist="idobjlist" />
        <Newwindow v-if="newtask_show" 
            :which="0"
            @close="close_newtask" 
            @submit="addnew" />
        <Newwindow v-if="confirm_delete_show" 
            :which="1" 
            :id="deleteid" 
            :name="deletename" 
            @close="close_delete" 
            @confirm_deletion_pressed="confirm_deletion_pressed" />
        <Newwindow
            v-if="listtasks_show" 
            :idobjlist="idobjlist"
            :which="2"
            @close="close_list"/>
   </main>
</template>

<script>
import Nav from './Nav.vue';
import Tasks from './Tasks.vue';
import Aside from './Aside.vue';
import Newwindow from './Newwindow.vue';


export default {
    name: 'Main',
    components: {
        Nav,
        Tasks,
        Aside,
        Newwindow,
    },
    props: {
        todolist: Object,
    },
    emits: ["addtask","deltask", "confirm_deletion_pressed","calc_new_percent","addnew","confirmchange_name","confirmchange_date","change_title"],
    methods: {
        //opens the add task dialog
        newtask: function() {
            this.newtask_show = true;
            this.listtasks_show = false;
        },
        close_newtask: function() {
            this.newtask_show = false;
        },
        close_delete: function() {
            this.confirm_delete_show = false;
        },
        
        addnew: function(name) {
            this.newtask_show = false;
            this.$emit("addnew", name);
        },
        addtask: function(newlistobj) {
            this.$emit("addtask", newlistobj, this.get_dlines);
        },
        confirm_delete: function(id, resizemethod) {
            this.confirm_delete_show = true;
            this.deleteid = id;
            this.resizemethod = resizemethod;
            this.deletename = this.todolist.lists.find(e => e.listID === id).name;
        },
        confirm_deletion_pressed: function(id) {
            this.confirm_delete_show = false;
            this.$emit("confirm_deletion_pressed", id, this.get_dlines, this.resizemethod);
            document.getElementById("main_cont").click();
        },
        calc_new_percent: function(id,calcfunc){
            this.$emit("calc_new_percent", id,calcfunc,this.get_dlines);
           
        },
        listtasks: function() {
            this.listtasks_show = true;
            this.newtask_show = false;
        },
        close_list: function() {
            this.listtasks_show = false;
        },
        confirmchange_name: function(task) {
            this.$emit("confirmchange_name", task);
        },
        confirmchange_date: function(task, datefunc) {
            this.$emit("confirmchange_date", task, datefunc, this.get_dlines);
        },
        change_title: function(titleobj) {
            this.$emit("change_title", titleobj, this.get_dlines);
        },
        get_dlines: function() {
            let dlines = [];
            for(let list of this.todolist.lists) {
                for(let item of list.items) {
                    if((item.deadline !== '' && item.deadline !== undefined) && !item.done){
                        dlines.push(item);
                    }
                }
            }
            this.dlines = dlines;

            let idobjlist = [];

            for(let i=0; i<this.todolist.lists.length; i++) {
                for(let j=0;j<this.todolist.lists[i].items.length;j++) {
                    let tid = this.dlines.findIndex(e => e === this.todolist.lists[i].items[j]);
                    if(tid >= 0) {
                        let idobj = {};
                        idobj.listname = this.todolist.lists[i].name;
                        idobj.task = this.dlines[tid];
                        idobjlist.push(idobj);
                    }
                }
            }

            idobjlist.sort(function comp(a, b){
                return new Date(a.task.deadline) - new Date(b.task.deadline);
            });

            this.idobjlist = idobjlist;
        },
        deltask: function(taskid) {
            this.$emit("deltask", taskid);
            this.get_dlines();
            this.calc_new_percent();
        }
    },
    created() {
        this.get_dlines();
    },
    data: function() {
        return {
            newtask_show: false,
            confirm_delete_show: false,
            deleteid: Number,
            deletename: String,
            listtasks_show: false,
            dlines: [],
            idobjlist: [],
            resizemethod: Function,
        };
    },
};
</script>

<style scoped>

#main_cont {
    background-color:rgb(248, 248, 248);
    position: relative;
    grid-area: main;
    height: 100%;
    display: grid;
    grid-template-columns: 10% 60% 30%;
    grid-template-rows: 100%;
    grid-template-areas:
        "actions task_wrapper aside";
    padding: 10px 20px 10px 10px;
}

@media screen and (orientation: landscape) and (max-height: 700px) {
    #main_cont {
            grid-area: main;
            position: relative;
            height: 100%;
            display: grid;
            grid-template-columns: 100%;
            grid-template-areas:
                "task_wrapper";
            padding: 10px 20px 10px 10px;
    }
}

@media screen and (max-width: 400px) {
    #main_cont {
        min-width: 0px;
    }
}

@media screen and (max-width: 1025px) {
    #main_cont {
        grid-area: main;
        position: relative;
        height: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-areas:
            "task_wrapper";
        padding: 10px 20px 10px 10px;
    }
}

</style>