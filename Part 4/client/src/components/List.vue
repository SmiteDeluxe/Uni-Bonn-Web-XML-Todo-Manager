<template>
    <!-- Abgabe von *** *** und *** ***-->
    <div
        :id="list.listID+'add'"
        :class="[(current === list.listID.toString()) ? 'bigoutertask' : 'outer_task']"
        @click="enlarge"
        @keydown.enter="enlarge">
            <div id="tasklist" title="Task" class="unselectable"
                :class="[color, (current === list.listID.toString()) ? 'bigtask' : 'task_list',
                ((current !== '') && (current !== list.listID.toString())) ? 'task_list_inactive' : '']">
                    <span title="Title"
                        :id="name"
                        :class="[(current === list.listID.toString()) ? 'big' : 'smal']"
                        @click="close_with_title" 
                        @mouseover="closehover" 
                        @mouseout="closehoverstop">
                            <i class="fas fa-chevron-down"
                                :id="list.listID" 
                                v-bind:class="[(current === list.listID.toString()) ? 'shownchevron' : 'hiddenchevron', (editactive) ? 'smallchev' : '']"></i>
                            <input
                                :tabindex="[editactive ? 0 : -1]" type="text" title="title" class="title"
                                :class="[(editactive && (current === list.listID.toString())) ? 'editfield' : 'normalfield']"
                                @input="titlenew = $event.target.value"
                                @blur="change_title" :value="name"
                                @click.stop/>
                    </span>
                    <p class="percent">{{ percent }} % </p>
                    <i tabindex="0" class="fas fa-trash" 
                        :class="[(editactive && (current === list.listID.toString())) ? 'showndelete' : 'hiddendelete']"
                        @keydown.space="confirm_delete" @keydown.enter="confirm_delete" @click="confirm_delete"></i>
                    <i tabindex="0" class="fas fa-pen " 
                        :class="[(current === list.listID.toString()) ? 'shownedit' : 'hiddenedit']" 
                        @click="editactive = !editactive" 
                        @keydown.space="editactive = !editactive"
                        @keydown.enter="editactive = !editactive"></i>           
                    <div :class="[(current === list.listID.toString()) ? 'shownlist' : 'hiddenlist', ((current === list.listID.toString()) && addtask_active) ? 'inactive' : '']">
                        <Listitem v-for="item in list.items" 
                            :key="item"
                            :item="item" 
                            :large="large"
                            @calc_new_percent="calc_new_percent" :edit="editactive" 
                            @confirmchange_name="confirmchange_name" 
                            @confirmchange_date="confirmchange_date" 
                            @deltask="deltask"/>
                    </div>
                    <i tabindex="0" class="fas fa-plus-circle"
                        :class="[(current === list.listID.toString()) ? 'shownaddico' : 'hiddenaddico']"
                        @click="addclick" @keydown.enter="addclick"
                        @keydown.space="addclick"></i>
                    <span id="list"
                        :class="[(current === list.listID.toString() && addtask_active) ? 'shownadd' : 'hiddenadd', color]"
                        @click.stop>
                            <input tabindex="0" type="text" class="new_task" title="Task" placeholder="Task" label="New task name" 
                                :value="newval" 
                                @input="title_add = $event.target.value" />
                            <input tabindex="0" type="date" class="new_task date" title="Date" placeholder="Date" label="New task date" 
                                :value="newval_date" 
                                @input="deadline_add = $event.target.value" />
                            <button tabindex="0" name="add task" type="button" :class="color" class="btn" id="addtaskbtn" label="Add new task" 
                                @click="addtask" > Add Task </button>
                    </span>
            </div>
    </div>
</template>

<script>
import Listitem from "./Listitem.vue";

export default {
    name: "List",
    props: {
        name: String,
        current: String,
        list: Object,
        lastlist: Array,
    },
    emits: ["addtask","deltask","change_title", "enlarge", "close","confirm_delete","calc_new_percent", "enlargelast","refreshlaslist","confirmchange_name","confirmchange_date"],
    components: {
        Listitem,
    },
    created() {
        this.calc_percent();
    },
    methods: {
        //Erstellt die aktuelle Prozentzahl für jeden Task
        calc_percent: function(){
            let ready = 0;
            let count = 0;
            for(let item of this.list.items) {
                if(item.done === true){
                   ready = ready +1;
                }
                count = count + 1;
            }
            if(count === 0) {
                this.percent = 0;
            } else {
                this.percent = ((ready/count) * 100).toFixed(0);
            }

        },

        //Aktuallisiert die Prozentzahl bei Änderung in der Liste
        calc_new_percent: function(id){
            this.$emit("calc_new_percent", id, this.calc_percent);
        },
        confirmchange_name: function(task) {
            // let index = this.list.items.findIndex(e => e.taskID === task.id);
            // let changedlist = this.list;
            // changedlist.items[index].name = task.new;
            this.$emit("confirmchange_name", task);
        },
        confirmchange_date: function(task, datefunc) {
            // let index = this.list.items.findIndex(e => e.taskID === task.id);
            // let changedlist = this.list;
            // changedlist.items[index].deadline = task.new;
            this.$emit("confirmchange_date", task, datefunc);
        },
        enlarge: function() {
            //Teste, ob noch kein Task groß ist
            if(this.current === "") {
                if(this.lastlist.includes(this.list.listID)) {
                    this.editactive = false;
                    this.addtask_active = false;
                    this.$emit("enlargelast", this.list.listID);
                } else {
                    this.editactive = false;
                    this.addtask_active = false;
                    this.$emit("enlarge", this.list.listID.toString());
                }
                document.getElementById(this.list.listID+'add').scrollIntoView({behavior: "smooth"});
                this.large = true;
            } else if(this.current === this.list.listID.toString()) {  //teste, ob der große task der aktuelle ist
                this.addtask_active = false;
                return;
            } else { 
                this.$emit("close");
                this.large = false;
            }
        },

        //Füge einen neuen Task hinzu
        addtask: function() {
            let newtask = {};
            if(this.deadline_add !== undefined) {
                newtask = {
                    name: this.title_add,
                    deadline: this.deadline_add,
                };
            } else {
                newtask = {
                    name: this.title_add,
                };
            }
            this.$emit("addtask", {new: newtask, id: this.list.listID});
            this.newval= "";
            this.title_add= "";
            this.addtask_active = false;
            this.calc_percent();
        },

        confirm_delete: function() {
            this.$emit("confirm_delete", this.list.listID);
        },
        close_with_title: function(event) {
            if(document.getElementById(this.name).classList.contains('big')) { 
                this.$emit("close");
                event.stopPropagation();
            }
        },
        closehover: function() {
            document.getElementById(this.list.listID).classList.add("reversechevron");
        },
        closehoverstop: function() {
            document.getElementById(this.list.listID).classList.remove("reversechevron");
        },
        addclick: function(event) {
            this.addtask_active = true;
            event.stopPropagation();
            document.getElementById("");
        },
        change_title: function() {
            this.$emit("change_title", {id: this.list.listID, new: this.titlenew});
        },
        deltask: function(taskid) {
            this.$emit("deltask", taskid);
            this.calc_percent();
        }
    },
    data: function() {
        return {
            color: 'color' + Math.floor(Math.random() * 9 + 1).toString(),
            percent: Number,
            title_add: "",
            newval: "",
            newval_date: "",
            editactive: false,
            addtask_active: false,
            titlenew: this.list.name,
            large: false
        };
    },
    mounted() {
        this.$emit("refreshlaslist");
    }
};
</script>

<style scoped>
.title {
    width: 100%;
    font-size: 20px;
    text-align: center;
    text-overflow: ellipsis;
}
.normalfield {
    pointer-events: none;
    background-color: transparent;
    border:none;
}
.editfield {
    pointer-events: all;
    background-color: white;
    cursor: text !important;
}
.shownaddico {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 25px;
    color: white;
    cursor: pointer;
}
.hiddenaddico {
    display: none;
}
.outer_task{
    padding: 10px;
    width: 210px;
    height: 210px;
}
.bigoutertask {
    grid-column: auto/span 2;
    grid-row: auto/span 3;
    padding: 10px;
    width: 422.5px;
    height: 640px;
}
.bigtask {
    text-align: center;
    font-size: 20px;
    width: 415px;
    height: 630px;
    margin: 5px 5px 5px 5px;
    padding: 15px 15px 15px 15px;
    word-break:break-all;
    border-radius: 10px;
    font-weight: 500;
    overflow: hidden;
}
.bigtask > span > .title {
    font-size: 28px;
    cursor: pointer;
    width: 60%;
}
.inactive {
    pointer-events:none;
}

.task_list{
    text-align: center;
    font-size: 20px;
    width: 200px;
    height: 200px;
    margin: 5px 5px 5px 5px;
    padding: 15px 15px 15px 15px;
    word-break:break-all;
    border-radius: 10px;
    font-weight: 500;
    overflow: hidden;
}

.shownedit {
    display: inline-block;
    position: absolute;
    top:16px;
    right:16px !important;
    cursor: pointer;
    color: white;
}
.hiddenedit {
    display: none;
}

.shownchevron {
    display: inline-block;
    transition: transform 0.2s;
    cursor: pointer;
    width: 200px;
    margin-right: -170px;
    text-align: left;
}
.smallchev {
    width: 50px;
    margin-right: -20px;
}
.hiddenchevron {
    display: none;
}
.reversechevron {
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
}

.showndelete{
    display: inline-block;
    position: absolute;
    top: 16px;
    left: 16px;
    cursor: pointer;
    color: rgb(255, 255, 255);
}
.hiddendelete{
    display: none;
}

.hiddenlist {
    display: none;
}
.shownlist {
    display: flex;
    flex-direction: column;
    height: 70%;
    overflow-y: scroll;
    overflow-x: hidden;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
}
.shownlist::-webkit-scrollbar-thumb {
	border-radius: 10px;
    width: 5px;
	background-color: rgb(255, 255, 255);
}
.shownlist::-webkit-scrollbar {
	width: 9px;
}
.shownadd {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 5px 5px 5px 5px;
    width: 100%;
    height: 120px;
    transition: 1s;
    filter: brightness(90%);
}
.hiddenadd {
    display: none;
}
#tasklist {
    position: relative;
}

.percent {
    font-size: 28px;
    padding-top: 20px;
    padding-left: 10px;
    font-family: 'Open Sans', sans-serif;
}


.new_task {
    border-bottom: 2px solid rgb(10, 10, 10);
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: transparent;
    padding: 5px 5px 5px 5px;
    font-size: 16px;
    margin-right: 20px;
    margin-top: 10px;
    width: 50%;
    margin-left: 10px;
}
.date {
    padding-bottom: 5px;
}
.new_task:focus {
    outline:none;
}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(36, 36, 36);
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: rgb(36, 36, 36);
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: rgb(36, 36, 36);
}


#addtaskbtn{
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    filter: brightness(110%);
    position: absolute;
    bottom: 10px;
    right: 10px;
}
#addtaskbtn:hover{
    filter: brightness(92%);
    cursor: pointer;
}

#addtaskbtn:active {
    filter: brightness(88%);
}

.task_list_inactive {
    pointer-events: none;
}

@media screen and (orientation: landscape) and (max-height: 700px) {

    .big_task_wrapper {
        width: 100%;
    }
}
@media screen and (max-width: 400px) {
    .task_list {
        font-size: 18px;
        height: 70px;
    }
    .outer_task {
        height: 75px;
    }
    .percent {
        font-size: 19px;
    }
}

@media screen and (min-width: 682px) { 
    .task_list:hover {
        cursor: pointer;
        margin: 0;
        width: 210px;
        height: 210px;
        font-size: 21px;
        box-shadow: 2px 2px 24px -8px rgba(0,0,0,0.20);
    }

    .task_list:hover > .percent {
        font-size: 30px;
    }

    .task_list:hover > .smal > .title{
        font-size: 21px;
    }

    .task_list:active {
        cursor: default;
        margin: 5px 5px 5px 5px;
        width: 200px;
        height: 200px;
        font-size: 20px;
    }

    .task_list:active > .percent {
        font-size: 28px;
    }
}

@media screen and (max-width: 1691px) and (min-width: 1500px) {
    .big_task {
        margin-left: 10%;
    }
}

@media screen and (max-width: 1025px) {
    .big_task_wrapper {
        width: 100%;
    }
}

@media  screen and (orientation: portrait) and (max-width: 681px) {
    .title {
        width: 100%;
        font-size: 20px;
        text-align: left;
    }

    .editfield {
        margin-left: 150px;
    }

    .smallchev {
        margin-left: 0px !important;
    }

    .bigtask > span > .title {
        font-size: 28px;
        cursor: pointer;
        padding-left: 5%;
    }

    .shownchevron {
        margin-left: -40px;
        margin-right: -170px;
    }
    .outer_task {
        width: 100%;
        height: 100px;
    }

    .task_list {
        width: 99%;
        height: 95px;
        text-align: left;
        font-size: 28px;
        position: relative;
    }

    .bigtask {
        width: 100%;
    }
    .bigoutertask {
        width: 99%;
    }

    .task_list .percent {
        position:absolute;
        right: 20px;
        top: -20px;
    }
}

@media screen and (orientation: landscape) and (max-width: 681px) {
    .title {
        width: 100%;
        font-size: 20px;
        text-align: left;
    }

    .bigtask > span > .title {
        font-size: 28px;
        cursor: pointer;
        padding-left: 5%;
    }

    .outer_task {
        width: 100%;
        height: 100px;
    }

    .task_list {
        width: 99%;
        height: 95px;
        text-align: left;
        font-size: 28px;
        position: relative;
    }

    .big_task {
        width: 100%;
    }
    .bigoutertask {
        width: 99%;
    }
    .task_list .percent {
        position:absolute;
        right: 20px;
        top: -20px;
    }
}
</style>
