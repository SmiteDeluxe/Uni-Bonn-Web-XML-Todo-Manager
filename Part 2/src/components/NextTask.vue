<template>
<!-- Abgabe von *** *** und *** ***-->
    <li class="upcoming_task">
        <div id="leftcol">
            <span class="upcoming_name">{{ idobjliste.task.name }}</span>
            <span class="upcoming_date">
                <input title="next task" tabindex="-1" id="date" type="date"
                    :value="idobjliste.task.deadline" />
            </span>
        </div>
        <div class="upcoming_title">{{ idobjliste.listname }}</div>
    </li>
</template>

<script>
export default {
    name: "NextTask",
    props: {
        idobjliste: Object,
    },
};
</script>

<style scoped>
.upcoming_task{
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid rgb(180, 180, 180);
    pointer-events: none;
}
::-webkit-calendar-picker-indicator{
    margin-left: 0px;
    display: none;
}
.marker {
    position: absolute;
    width: 5px;
    height: 50px;
    margin-right: 10px;
    top:20px;
}
#leftcol {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.upcoming_name {
    width: 50%;
    margin-left: 0px;
    justify-content: space-between;
    font-size: 18px;
    text-overflow: ellipsis;
}

.upcoming_title {
    padding-left: 5px;
    width: 50%;
    margin-right: 5px;
    text-align: end;
    text-overflow: ellipsis;
}

.upcoming_date {
    margin-left: 0px;
}

.upcoming_task:nth-last-child(1) {
    border-bottom: none;
}

#date{
    border: none;
    background: transparent;
}

</style>