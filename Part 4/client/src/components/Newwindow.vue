<template>
<!-- Abgabe von *** *** und *** ***-->
    <div id="popup" v-on:click="close">
        <div v-if="which === 0">
            <div class="popupwindow" id="newlist" v-on:click.stop>
                <h3> Create a new list: </h3>
                <input tabindex="0" type="text" class="list_name" placeholder="Title"
                    :value="newval" 
                    @input="title_input = $event.target.value " />
                <div class="buttonwrapper2">
                    <button tabindex="0" type="button" class="btn" id="canceladdbtn"
                        @keydown.space="close"
                        @keydown.esc="close"
                        @click="close"> Cancel</button>
                    <button tabindex="0" type="button" class="btn" id="createbtn"
                        @keydown.space="submit"
                        @keydown.enter="submit"
                        @click="submit">Create</button>
                </div>
            </div>
        </div>
        <div class="popupwindow" id="deletelist"
            v-if="which === 1"
            @click.stop>
            <span>Really delete list "{{ name }}" forever?</span>
            <div class="buttonwrapper">
                <button tabindex="0" type="button" class="btn" id="canceldeletebtn"
                    @keydown.space="close"
                    @keydown.esc="close"
                    @click="close"> Cancel</button>
                <button tabindex="0" type="button" class="btn" id="confirmdeletebtn"
                    @keydown.space="confirm_deletion_pressed"
                    @keydown.enter="confirm_deletion_pressed"
                    @click="confirm_deletion_pressed"> Delete</button>
            </div>
        </div>
        <div class="popupwindow" id="listtasks"
            v-if="which === 2"
            @click.stop>
            <Aside  aside_id="wasanderes" 
                :idobjlist="idobjlist" />
            <button tabindex="0" type="button" class="btn" id="closelistbtn" 
                @keydown.space="close" 
                @keydown.esc="close" 
                @click="close"> Close
            </button>
        </div>
    </div>
</template>

<script>
import Aside from './Aside.vue';

export default {
    name: "Newwindow",
    components: {
        Aside,
      },
    emits: ["close","submit","confirm_deletion_pressed"],
    props: {
        which: Number,
        id: Number,
        name: String,
        idobjlist: Array
    },
    methods: {
        close: function() {
            this.$emit("close");
        },
        submit: function() {    
            this.$emit("submit", this.title_input);
            this.newval = "";
            this.title_input = "";
        },
        confirm_deletion_pressed: function() {
            this.$emit("confirm_deletion_pressed", this.id);
        }
    },
    data: function() {
        return {
            title_input: "",
            newval: "",
        };
    },
    created() {
        let w = this;
        window.addEventListener("keydown", function(e) {
            if(e.key === "Enter") {
                w.submit();
            }
        });
    }
};
</script>

<style scoped>
h3 {
    margin-bottom: 80px;
}
#popup{
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(248, 248, 248, 0.8);
    flex-direction: column;
    justify-content: center;
}
.buttonwrapper {
    margin-top: 40px;
}
.popupwindow {
    margin: auto;
    margin-top: 120px;
    width: 500px;
    height: 300px;
    text-align: center;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 400px;
    max-width: 80%;
    max-height: 700px;
}

.list_name {
    border-bottom: 2px solid rgb(175, 175, 175);
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: white;
    padding: 5px 5px 5px 5px;
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: -10px;
}
.list_name:focus {
    outline:none;
}
#listtasks{
    margin-top:5%;
    margin-bottom: 10px;
    height: 95%;
    width: 350px;
    max-width: 80%;
    position: relative;
}

#closelistbtn{
    position: absolute;
    bottom: 5%;
    z-index: 2;
}

#buttonwrapper {
    margin-top: 40px;
}

#canceldeletebtn, #confirmdeletebtn, #createbtn, #canceladdbtn, #closelistbtn{
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    margin-left: 15px;
    margin-right: 15px;
}
#canceldeletebtn:hover, #createbtn:hover, #canceladdbtn:hover,  #closelistbtn:hover{
    background-color: #fddb5e;
    cursor: pointer;
}
#confirmdeletebtn:hover {
    background-color: red;
    color: white;
}

#canceldeletebtn:active,  #createbtn:active, #canceladdbtn:active, #closelistbtn:active{
    background-color: #FFD333;
}
#confirmdeletebtn:active{
    background-color: rgb(240, 0, 0);

}
@media screen and (orientation: landscape) and (max-height: 1000px) {
   #listtasks {
       height: 90%;
   }
   
}
@media screen and (orientation: landscape) and (max-height: 700px) {
   #listtasks {
       margin-top: 1%;
   }
}
@media screen and (orientation: portrait) and (max-width: 300px) {
   #listtasks {
       max-width: 97%;
   }
}
@media screen and (orientation: landscape) and (max-height: 1050px) {
   #listtasks {
       margin-top: 2%;
   }
}
</style>