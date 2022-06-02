<template>
<!-- Abgabe von *** *** und *** ***-->
    <div id="div_scroll">
        <div id="task_wrapper">
            <List tabindex="0"
                v-for="list in todolist.lists"
                :list="list"
                :lastlist="lastlist"
                :key="list.listID"
                :name="list.name"
                :current="current"
                @enlarge="enlarge"
                @enlargelast="enlargelast"
                @close="close"
                @click.stop
                @addtask="addtask"
                @confirm_delete="confirm_delete"
                @calc_new_percent="calc_new_percent"
                @refreshlaslist="resize"
                @confirmchange_name="confirmchange_name"
                @confirmchange_date="confirmchange_date"
                @change_title="change_title"
                @deltask="deltask"/>
        </div>
    </div>
</template>

<script>
import List from './List.vue';

export default {
    name: "Tasks",
    props: {
        todolist: Object,
    },
    components: {
        List,
    },
    emits: ["addtask","deltask", "confirm_delete", "calc_new_percent","confirmchange_name","confirmchange_date","change_title"],
    methods: {
        enlarge: function(item) {
            this.current = item;
        },
        enlargelast: function(id) {
            let toenlarge = Object;
            let i=0;
            for(;i<this.todolist.lists.length;i++) {
                if(this.todolist.lists[i].listID === id) {
                    toenlarge = this.todolist.lists[i];
                    break;
                }
            }
            let newtemplist = this.todolist;
            newtemplist.lists[i] = this.todolist.lists[i-1];
            newtemplist.lists[i-1] = toenlarge;
            this.current = id.toString();
            this.lastenlarged = id;
        },
        close: function() {
            if(isNaN(this.lastenlarged)) {
                this.current = "";
            } else {
                let toclose = Object;
                let i=0;
                for(;i<this.todolist.lists.length;i++) {
                    if(this.todolist.lists[i].listID === this.lastenlarged) {
                        toclose = this.todolist.lists[i];
                        break;
                    }
                }
                let newtemplist = this.todolist;
                newtemplist.lists[i] = this.todolist.lists[i+1];
                newtemplist.lists[i+1] = toclose;
                this.current = "";
                this.lastenlarged = NaN;
            }
            this.activeadd = false;
            this.resize();
        },
        addtask: function(newlistobj) {
            this.$emit("addtask", newlistobj);
        },
        confirm_delete: function(id) {
            this.$emit("confirm_delete", id, this.resize);
        },
        calc_new_percent: function(id, calcfunc){
            this.$emit("calc_new_percent", id,calcfunc);
        },
        resize: function() {
            this.lastlist = [];
            let appsize = document.getElementById("app").offsetWidth;
            let newsize = document.getElementById("task_wrapper").offsetWidth;
            let colc = Math.floor(newsize/214);
            for(let i=0;i<this.todolist.lists.length;i++) {
                if(((i + 1) % colc) === 0 && appsize >= 683) {
                    this.lastlist[this.lastlist.length] = this.todolist.lists[i].listID;
                }
            }
        },
        confirmchange_name: function(task) {
            this.$emit("confirmchange_name", task);
        },
        confirmchange_date: function(task, datefunc) {
            this.$emit("confirmchange_date", task, datefunc);
        },
        change_title: function(titleobj) {
            this.$emit("change_title", titleobj);
        },
        deltask: function(taskid) {
            this.$emit("deltask", taskid);
        }
    },
    mounted() {
        window.addEventListener("click", this.close);
        window.addEventListener("resize", this.resize);
        window.addEventListener("keydown", (e) => {
          if(e.key === "Escape") {
            this.current ="";
          }
        });
        this.resize();
    },
    unmounted() {
        window.removeEventListener("resize", this.resize);
    },
    data: function() {
        return {
            current: "",
            lastlist: [],
            lastenlarged: NaN,
        };
    },
};
</script>

<style scoped>
#div_scroll {
    direction: rtl;
    grid-area: task_wrapper;
    height: 100%;
    overflow-y: scroll;
    min-height: 0;
    flex-grow: 3;
}

#task_wrapper {
    direction: ltr;
    height: 100%;
    font-weight: 700;
    display: grid;
    grid-template-columns: repeat(auto-fill, 210px);
    grid-template-rows: repeat(auto-fill, 210px);
    grid-auto-flow: row dense;
    grid-gap: 5px;
}
@media  screen and (orientation: portrait) and (max-width: 681px) {
    #task_wrapper {
        display: flex;
        flex-direction: column;
    }
}
@media screen and (orientation: landscape) and (max-width: 681px) {
    #task_wrapper {
        display: flex;
        flex-direction: column;
    }
}
</style>