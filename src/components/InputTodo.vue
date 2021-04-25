<template>
  <div>
    <!-- <h3>Hello {{ userLogin.userId }}</h3> -->
    <h2>Things to do</h2>
    <input
      type="text"
      placeholder="What need to be done"
      v-model="newTodo"
      @keyup.enter="handeSubmitClick"
    />
    <button @click="handeSubmitClick">submit</button>
  </div>
</template>

<script>
export default {
  name: "InputTodo",
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

<style>
</style>