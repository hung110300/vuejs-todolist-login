<template>
<div>
    <div v-if="todos.length">
        <div v-for="todo in todos" :key="todo.id">
            <div class="todo" @click="handleDone(todo.id)" :class="{ done: todo.isComplete }" v-if='todo.isComplete' >
                <div class="d-flex justify-content-between" >
                    <span>{{ todo.title }}</span>
                    <button type="button" class="btn" @click="deleteTodo(todo.id)">x</button>
                </div>
            </div>
        </div>
        <div v-for="todo in todos" :key="todo.id">
            <div class="todo" @click="handleDone(todo.id)" :class="{ done: todo.isComplete }" v-if='!todo.isComplete' >
                <div class="d-flex justify-content-between" >
                    <span>{{ todo.title }}</span>
                    <button type="button" class="btn" @click="deleteTodo(todo.id)">x</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>Dont have anything to do</div>
</div>
</template>

<script>
export default {
    name: "todoContainer",
    props: {
        todos: {
            type: [Array],
            default: null,
        },
    },

    methods: {
        handleDone(todoId) {
            this.$emit("setDone", todoId);
        },
        deleteTodo(todoId) {
            this.$emit("deleteOne", todoId);
        },
    },
};
</script>

<style scoped>
.todo {
    padding: 0.5rem;
    border: 1px solid rgb(174, 156, 25);
    border-radius: 1rem;
    margin-top: 1rem;

}

.btn {
    background-color: rgb(213, 213, 20);
    padding: 0px 5px 0px 5px;
    border: none;
    color: black;
    opacity: 1;
    transition: 0.3s
}

.btn:hover {
    background-color: rgba(255, 0, 0, 0.919);
    color: black;
}

.done {
    background-color: gray;
}
</style>
