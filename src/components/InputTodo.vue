<template>
<div class="input-todo d-flex justify-content-between" >
    <input class="input-group form-control" type="text" placeholder="What need to be done" v-model="newTodo" @keyup.enter="handeSubmitClick" />

    <button type="button" class="btn" @click="handeSubmitClick">Add</button>
</div>
</template>

<script>
export default {
    name: "InputTodo",
    props: {
        currentUser: Object,
    },
    data() {
        return {
            newTodo: "",
        };
    },
    methods: {
        handeSubmitClick() {
            this.$emit("addTodo", this.newTodo);
            this.newTodo = "";
        },
    },
};
</script>

<style scoped>
.input-todo {
    margin-bottom: 2rem;
    margin-top: 1rem;

}

.btn {
    background-color: rgb(213, 213, 20);
    border: none;
    color: black;
    opacity: 1;
    transition: 0.3s;
}

.btn:hover {
    background-color: rgba(235, 228, 35, 0.919);
    color: black;
}
</style>
