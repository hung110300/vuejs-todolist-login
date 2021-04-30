import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from '../pages/LoginForm.vue'
import RegisterForm from '../pages/RegisterForm.vue'
import TodoList from '../pages/TodoList.vue'

const routes = [

    { path: '/login', component: LoginForm },
    { path: '/register', component: RegisterForm },
    { path: '/todos', component: TodoList },
    { path: '/*', redirect: '/login' }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router