<template>
  <div>
    <ul v-if="todos.length">
      <li
        v-for="(todo, index) in todos"
        :key="index"
        :class="{ done: todo.isComplete }"
      >
        <span @click="handleDone(todo.id)">{{ todo.title }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <div v-else>Dont have any Todo</div>
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
.done {
  text-decoration: line-through;
}
</style>