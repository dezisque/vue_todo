<template>
  <div class="list__item_inner">
    <img
      src="../assets/trash.svg"
      alt="delete_icon"
      @click="$emit('deleteTODO')"
    />
    <input type="checkbox" :checked="todo.completed" v-model="todo.completed" />
    <input
      type="text"
      class="list__item_input"
      :placeholder="todo.title"
      v-model="todo.title"
    />
  </div>
</template>

<script>
export default {
  name: "todo",
  props: ["todo"],
};
</script>

<style scoped>
.list__item_inner {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-bottom: 1rem;
}
.list__item_input:focus {
  outline: none;
}
.list__item_input {
  margin-left: 1rem;
  vertical-align: middle;
  width: 100%;
}
.list__item_input {
  border: 0;
  border-bottom: 2px solid black;
  font-size: 1.4rem;
}
.list__item_inner img {
  cursor: pointer;
  width: 1.5rem;
  vertical-align: middle;
}
</style>
