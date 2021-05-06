<template>
<body>
    <div class="todos d-flex justify-content-center">
        <h3>Hello <span class="current-user">{{ currentUser.name }}</span></h3>
        <div>
            <button class="btn" type="button" @click="logout">Log Out</button>
        </div>
    </div>
    <div class="list">
        <h3>Things to do</h3>
        <InputTodo :currentUser="currentUser" @addTodo="addNewTodo" />
        <todoContainer :todos="todos" @setDone="setDone" @deleteOne="deleteOne" />
    </div>
</body>
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
    created() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        console.log(currentUser.userId);
        if (!currentUser.userId) {
            this.$router.push('/login')
        }
    },
    mounted() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        let bags = JSON.parse(localStorage.getItem("bags")) || [];

        let getBag = bags.find((bag) => {
            return bag.userId === currentUser.userId;
        })
        console.log(currentUser.name);

        this.currentUser = currentUser;
        if(getBag){
            this.todos = getBag.todos;
        }
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
body {
    text-align: center;
    background-color: white;
    height: 100vh;
}

.todos {
    animation: 0.5s appear;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}

.current-user {
    color: rgb(213, 213, 20);
}

.list h3 {
    margin-top: 0.5rem;
}

.list {
    display: inline-block;
    background-color: rgba(232, 232, 20, 0.61);
    padding: 1rem 5rem 1rem 5rem;
    border-radius: 2rem;
    margin-top: 3rem;
}

.btn {
    background-color: rgb(213, 213, 20);
    border: none;
    color: black;
    opacity: 1;
    transition: 0.3s
}

.btn:hover {
    background-color: rgba(235, 228, 35, 0.919);
    color: black;
}
</style>
