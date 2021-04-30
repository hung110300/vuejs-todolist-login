<template>
<body>
    <form class="login-form">
        <h1>Login</h1>

        <div class="username input-group">
            <input class="form-control" type="text" placeholder="Enter your username" v-model="userInput.name" @keypress.enter="login()" />
        </div>
        <div class="password input-group">
            <input class="form-control" type="password" placeholder="Password" v-model="userInput.password" @keypress.enter="login()" />
        </div>
        <div><button type="button" class="btn btn-warning" @click="login()">Log in</button></div>
        <div>
            <p>
                Don't have account? Let's
                <router-link class="signup" to="/register">Sign up</router-link>
            </p>
        </div>
        <div v-show="messages.length > 0">
            <p class="message alert alert-success" role="alert" v-for="message in messages" :key="message">
                {{ message }}
            </p>
        </div>
        <div v-show="errors.length > 0">
            <p class="error alert alert-danger" role="alert" v-for="error in errors" :key="error">
                {{ error }}
            </p>
        </div>
    </form>
</body>
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
            userLogin: {},

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
            setTimeout(() => {
                if (currentUser && this.userInput.password === currentUser.password) {
                    this.messages.push("Login sucess! Welcome back " + currentUser.name);

                    this.userLogin === currentUser;

                    let todos = JSON.parse(localStorage.getItem("todos")) || [];

                    this.todos = todos.filter(
                        (todo) => todo.userId === this.userLogin.userId);

                    localStorage.setItem("currentUser", JSON.stringify(currentUser));

                    setTimeout(() => {
                        this.$router.push("/todos");

                    }, 2000)

                } else {
                    this.errors.push("Wrong username or password !");
                }
            }, 1000)
        },
    },
};
</script>

<style scoped>
body {
    text-align: center;
    background-color: rgba(232, 232, 20, 0.61);
    height: 100vh;
}

form {
    display: inline-block;
}

.login-form {
    background-color: white;
    padding: 1rem 5rem 1rem 5rem;
    border-radius: 2rem;
    margin-top: 8rem;
}

.login-form h1 {}

.username {
    margin-top: 2.2rem;
}

.password {
    margin-top: 1rem;
}

.btn {
    background-color: rgb(213, 213, 20);
    width: 100%;
    height: 80%;
    border: none;
    color: black;
    margin-top: 1rem;
    opacity: 1;
    transition: 0.3s
}

.btn:hover {
    background-color: rgba(235, 235, 22, 0.919);
    color: black;
}

.login-form p {
    margin-top: 2rem;
}

.signup {
    color: rgb(201, 201, 18);
    text-decoration: none;
    opacity: 1;
    transition: 0.3s;
}

.signup:hover {
    color: rgba(235, 235, 22, 0.919);

}

.alert {
font-size: 14px;
padding: 5px 12px 5px 12px;
}

.error {
    color: rgb(255, 42, 42);
}

.message {
    color: #2bb421;
}
</style>
