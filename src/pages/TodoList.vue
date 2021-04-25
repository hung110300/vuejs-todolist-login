<template>
<div>
    <InputTodo @addTodo="addNewTodo" />
    <todoContainer :todos="todos" @setDone="setDone" @deleteOne="deleteOne" />
    <button @click="logout">Log Out</button>
</div>
</template>

<script>
import todoContainer from "../components/todoContainer";
import InputTodo from "../components/InputTodo";

export default {
    name: "TodoList",
    components: {
        todoContainer,
        InputTodo,
    },

    data() {
        return {
            newTodo: "",
            todos: [],
            currentUser: {}
        };
    },
    mounted() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        let bags = JSON.parse(localStorage.getItem("bags")) || [];

        let getBag = bags.find((bag) => {
            return bag.userId === currentUser.userId;
        })
  console.log(currentUser);
  console.log(getBag);
        this.currentUser = currentUser;
        this.todos = getBag.todos;
    },
    methods: {
        //payload is input newTodo
        addNewTodo(payload) {
            let todos = JSON.parse(localStorage.getItem("todos")) || [];

            this.todos.push({
                id: this.todos.length + 1,
                title: payload,
                isComplete: false,
            });
            todos.push({
                id: this.todos.length + 1,
                title: payload,
                isComplete: false,
            })
            this.updateBags()
        },
        setDone(todoId) {

            this.todos = this.todos.map((todo) => {
                if (todo.id === todoId) {
                    console.log(todo);
                    todo.isComplete = !todo.isComplete;
                }
                return todo;
            });
            this.updateBags()
        },
        deleteOne(todoId) {

            console.log("Delete One");
            this.todos = this.todos.filter((todo) => todo.id !== todoId);

            this.updateBags()
        },
        updateBags() {
            let bags = JSON.parse(localStorage.getItem("bags")) || [];

            bags = bags.map((bag) => {
                if (bag.userId === this.currentUser.userId) {
                    bag.todos = this.todos;
                }
                return bag;
            })
            localStorage.setItem("bags", JSON.stringify(bags));
        },
        logout() {
          this.$router.push("/login");
            localStorage.removeItem("currentUser");
        }
    },
};
</script>

<style scoped>
.isComplete {
    text-decoration: black;
}
</style>
