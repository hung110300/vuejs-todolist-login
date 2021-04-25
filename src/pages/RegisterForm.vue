<template>
<div class="register-form">
    <h1>Register</h1>
    <div>
        <input type="text" placeholder="New username" v-model="userSignup.name" />
    </div>

    <div>
        <input type="password" placeholder="Your password" v-model="userSignup.password" />
    </div>
    <div>
        <input type="password" placeholder="Confirm password" />
    </div>
    <div><button @click="signup()">Sign up</button></div>
    <div>
        <p>
            Already have an account? <router-link to="/login">Sign in</router-link>
        </p>
    </div>
    <div v-show="errors.length > 0">
        <h3 class="error" v-for="error in errors" :key="error">
            {{ error }}
        </h3>
    </div>
    <div v-show="messages.length > 0">
        <h3 class="message" v-for="message in messages" :key="message">
            {{ message }}
        </h3>
    </div>
</div>
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
                    user.name === this.userSignup.name &&
                    user.password === this.userSignup.password
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
                this.messages.push("Create account success, ready for login !");

                // create bag for new user
                let newBag = {
                    userId: userId,
                    todos: []
                }
                bags.push(newBag);
                localStorage.setItem("bags", JSON.stringify(bags));
            }
        },
    },
};
</script>

<style scoped>
.register-form {
    text-align: center;
}

.register-form div {
    margin-top: 1rem;
}

.register-form input {
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
