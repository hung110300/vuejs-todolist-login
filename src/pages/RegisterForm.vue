<template>
<body>
    <form class="register-form">
        <h1>Register</h1>
        <div class="username input-group">
            <input class="form-control" type="text" placeholder="New username" v-model="userSignup.name" />
        </div>
        <div class="password input-group">
            <input class="form-control" type="password" placeholder="Your password" v-model="userSignup.password" />
        </div>
        <div class="password input-group">
            <input class="form-control" type="password" placeholder="Confirm password" @keyup.enter="signup()" />
        </div>
        <div><button type="button" class="btn btn-warning" @click="signup()">Sign up</button></div>
        <div>
            <p>
                Already have an account? <router-link class="login" to="/login">Log in</router-link>
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
    name: "RegisterForm",
    data() {
        return {
            userSignup: {
                userId: "",
                todoId: "",
                name: "",
                password: "",
            },
            errors: [],
            messages: [],
            todos: [],
        };
    },
    methods: {
        signup: function () {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let bags = JSON.parse(localStorage.getItem("bags")) || [];

            this.errors = [];
            this.messages = [];
            let userId = users.length + 1;

            users.forEach((user) => {
                if (
                    user.name === this.userSignup.name
                ) {
                    this.errors.push("This name have been registered !");
                }
            });
            if (this.errors.indexOf("This name have been registered !") === -1) {
                users.push({
                    userId: userId,
                    name: this.userSignup.name,
                    password: this.userSignup.password,
                });
                localStorage.setItem("users", JSON.stringify(users));

                this.messages.push("Create account success !");
    
                // create bag for new user
                let newBag = {
                    userId: userId,
                    todos: []
                }
                bags.push(newBag);
                localStorage.setItem("bags", JSON.stringify(bags));

                setTimeout(() => {
                    this.$router.push('/login')
                }, 2000)
            }
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

.register-form {
    background-color: white;
    padding: 1rem 5rem 1rem 5rem;
    border-radius: 2rem;
    margin-top: 8rem;
}

.register-form h1 {}

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
    background-color: rgba(232, 232, 20, 0.61);
    color: black;
}
.btn:active {
    color: red;
    background-color: #2bb421;
}

.register-form p {
    margin-top: 2rem;
}

.login {
    color: rgb(201, 201, 18);
    text-decoration: none;
    opacity: 1;
    transition: 0.3s;
}

.register:hover {
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
