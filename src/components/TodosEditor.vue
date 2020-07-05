<template>
  <div>
    <div class="edit__todos">
      <h3 class="edit__todos_title">
        TODOs:
      </h3>
      <ul class="edit__todos_list">
        <li
                v-for="(todo, index) in note.todos || 1"
                :key="index"
                class="todos__list_item"
        >
          <Todo :todo="todo" @deleteTODO="deleteTODO(index)"></Todo>
        </li>
      </ul>
    </div>
    <button class="add__new_todo" @click="addTODO">
      Добавить еще TODO
    </button>
  </div>
</template>

<script>
import Todo from "@/components/Todo";
export default {
  name: "TodosEditor",
  props: ["note"],
  components: {
    Todo,
  },
  methods: {
    deleteTODO(index) {
      if (this.note.todos.length > 1) this.note.todos.splice(index, 1);
    },
    addTODO() {
      if (this.note.todos[this.note.todos.length - 1].title)
        this.note.todos.push({});
      // если предыдущий tоdo заполнен, то можно добавить еще один
      else this.warning = "Заполните пустой TODO";
    },
  },
};
</script>

<style scoped>
.edit__todos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.edit__todos {
  padding-top: 3rem;
}
.edit__todos_title {
  padding-right: 1rem;
}
.edit__todos_list {
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
.add__new_todo{
  background-color: #fff;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
</style>
