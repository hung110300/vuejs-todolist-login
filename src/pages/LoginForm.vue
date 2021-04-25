<template>
<div class="login-form">
    <h1>Login</h1>
    <div>
        <input type="text" placeholder="Enter your username" v-model="userInput.name" @keypress.enter="login()" />
    </div>
    <div>
        <input type="password" placeholder="Password" v-model="userInput.password" @keypress.enter="login()" />
    </div>
    <div><button @click="login()">Sign in</button></div>
    <div>
        <p>
            Don't have account? Let's
            <router-link to="/register">Sign up</router-link>
        </p>
    </div>
    <div v-show="messages.length > 0">
        <h3 class="message" v-for="message in messages" :key="message">
            {{ message }}
        </h3>
    </div>
    <div v-show="errors.length > 0">
        <h3 class="error" v-for="error in errors" :key="error">
            {{ error }}
        </h3>
    </div>
</div>
</template>

<script>

export default {
    name: "LoginForm",
    data() {
        return {
            userInput: {
                name: "",
                password: "",
            },
            errors: [],
            messages: [],
            userLogin: {}

        };
    },
    methods: {
        login: function () {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            

            this.errors = [];
            this.messages = [];

            let currentUser = users.find((user) => {
                return user.name === this.userInput.name;
            });
            if (currentUser && this.userInput.password === currentUser.password) {
                this.messages.push("Login sucess !");

                this.userLogin === currentUser;

                let todos = JSON.parse(localStorage.getItem("todos")) || [];

                this.todos = todos.filter(
                    (todo) => todo.userId === this.userLogin.userId);

                console.log(this.userLogin.userId)

                localStorage.setItem("currentUser", JSON.stringify(currentUser));

                this.$router.push("/todos");

            } else {
                this.errors.push("Wrong username !");
            }
        },
    },
};
</script>

<style scoped>
.login-form {
    text-align: center;
}

.login-form div {
    margin-top: 1rem;
}

.login-form input {
    font-size: 1rem;
    border-radius: 0.5rem;
}

.error {
    color: rgb(255, 42, 42);
}

.message {
    color: #2bb421;
}
</style>
