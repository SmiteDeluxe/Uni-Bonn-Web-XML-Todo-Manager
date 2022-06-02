<template>
    <!-- Abgabe von *** *** und *** *** -->
    <aside :id="aside_id">
        <div id="upcoming_scroll">
            <h2 id="next_header">Next Tasks:</h2>
            <ul class="upcoming_wrapper">
                <NextTask v-for="task in idobjlist" 
                    :idobjliste="task" 
                    :key="task.task.taskID" />             
            </ul>
        </div>
    </aside>
</template>

<script>
import NextTask from "./NextTask.vue";

export default {
    name: "Aside",
    props: {
        idobjlist: Array,
        aside_id: String,
    },
    components: {
        NextTask
    },
    methods: {
    },
    data: function(){
        return{
        };
    },
    created() {
    }
};
</script>

<style scoped>
#aside {
    grid-area: aside;
    display: flex;
    padding-left: 8%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    min-height: 0;
}

#upcoming_scroll {
    background-color: white;
    border-radius: 10px;
    min-width: 200px;
    width: 100%;
    height: 80%;
    max-width: 300px;
    padding-right: 10px;
}

#next_header{
    font-size: 20px;
    margin-top: 15px;
    margin-left: 40px;
    margin-bottom: -10px;
}

.upcoming_wrapper{
    width: 100%;
    height: 85%;
    list-style-type: none;
    padding: 5px 20px 5px 20px;
    padding-right: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
}
@media screen and (orientation: portrait) and (max-height: 700px){
    #wasanderes #upcoming_scroll {
        height: 35% !important;
        margin-top: 112% !important;
    }
    
}

@media screen and (orientation: landscape) and (max-height: 700px) {
    #aside{ 
        display: none;
    } 
    #wasanderes #upcoming_scroll {
        height: 17%;
        margin-top: 160%;
       
    }
}
@media screen and (orientation: landscape) and (max-height: 350px) {
    #wasanderes #upcoming_scroll {
        height: 12%;
        margin-top: 180%;
       
    }
}
@media screen and (orientation: landscape) and (max-height: 1050px) {
    #wasanderes #upcoming_scroll {
        height: 40%;
        margin-top: 100%;
       
    }
}
@media screen and (orientation: portrait) and (max-height: 1000px) {
    #wasanderes #upcoming_scroll {
        height: 60%;
        margin-top: 48%;
       
    }
}


@media screen and (max-width: 1025px) {
    #aside{ 
        display: none;
    }
    
}
</style>