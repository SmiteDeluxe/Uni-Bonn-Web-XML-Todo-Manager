<template>
    <!-- Abgabe von *** *** und *** *** -->
    <span id="wrapper">
        <input type="checkbox" 
            :checked="item.done" 
            :class="[edit ? 'deactivate_check' : '']"  
            :id="item.taskID+'c'" 
            @click="calc_percent">
        <label class="label" 
            :for="item.taskID+'c'" :class="[edit ? 'deactivate_check' : '']">
            <textarea title="Name" :id="item.taskID+'name'" class="tasktext name" type="text" 
                :class="[edit ? 'editfield' : 'normalfield']" 
                :tabindex="[edit ? 0 : -1]"  
                :value="item.name"
                @input="textchange" 
                @blur="confirmchange_name"/>
            <input title="Date" class="tasktext dead" 
                v-if="(dead !== '') || edit" type="date" 
                :tabindex="[edit ? 0 : -1]" 
                :class="[edit ? 'editfield' : 'normalfield']" 
                :value="dead"
                @input="confirmchange_date" />
        </label>
        <i tabindex="0" class="fas fa-minus-circle delico" 
            :class="[edit ? 'delicoshow' : 'delicohide']" 
            @keydown.space="deltask" 
            @keydown.enter="deltask" 
            @click="deltask"></i>
    </span>
</template>

<script>
export default {
    name: "Listitem",
    props: {
        item: Object,
        edit: Boolean,
        large: Boolean,
    },
    watch: {
        large: function(val) {
            if(val) {
                setTimeout(() => { 
                    let e = document.getElementById(this.item.taskID+'name');
                    e.style.height = Math.min(e.scrollHeight, 145) + "px";
                }, 5);    
            }
        }
    },
    emits:["calc_new_percent","confirmchange_name","confirmchange_date","deltask"],
    methods: {
        calc_percent: function(){
            this.$emit("calc_new_percent", this.item.taskID);
        },
        confirmchange_name: function() {
            this.$emit("confirmchange_name", {id: this.item.taskID, new: this.newname});
        },
        confirmchange_date: function(event) {
            this.$emit("confirmchange_date", {id: this.item.taskID, new: event.target.value}, this.calcdate);
        },
        calcdate: function() {
            if(this.item.deadline === undefined) {
                this.dead = "";
            } else {
                this.dead = this.item.deadline;
            }
        },
        deltask: function() {
            this.$emit("deltask", this.item.taskID);
        },
        textchange: function(e) {
            this.newname = e.target.value;
            e.target.style.height = "0px";
            e.target.style.height = Math.min(e.target.scrollHeight, 145) + "px";
        }
    },
    data: function() {
        return {
            dead: "",
            newname: this.item.name,
            newdate: "",
        };
    },
    mounted() {
        this.calcdate();
    }
};
</script>

<style scoped>
.delico {
    position: relative;
    top:18px;
    right: 20px;
    color:white;
    cursor: pointer;
    margin-left: -20px;
}
.delicoshow{
    display: block;
}
.delicohide {
    display: none;
}
#check{
    margin-right: 10px;
}
#wrapper {
    margin-bottom: 25px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}
.deactivate_check {
    pointer-events: none;
}
.label {
    position: relative;
    top:10px;
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
}
.name {
    width: 85%;
    height: 1.4em;
    display: inline-block;
    font-size: 20px;
    resize: none;
    overflow: hidden;
}

.dead {
    left: 20px;
    width: 120px;
}
.normalfield::-webkit-calendar-picker-indicator{
    margin-left: 0px;
    display: none;
}
.editfield::-webkit-calendar-picker-indicator{
    margin-left: 10px;
}
.tasktext:focus{
    border: 1px solid black;
    outline: none !important;
}
.normalfield {
    pointer-events: none;
    background: transparent;
    border: 0;
}
.editfield {
    pointer-events: all;
}

input[type="checkbox"] {
    height: 25px;
    width: 25px;
    min-width: 25px;
    margin-right: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    position: relative;
    top: 8px;
    left: 20px;
}

input:checked {
    background: url(../assets/check.png);
    background-repeat: no-repeat;
    background-size: contain;
}

</style>

