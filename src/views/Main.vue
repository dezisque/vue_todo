<template>
  <section class="main">
    <div class="new__note_wrapper">
      <router-link to="/edit">
        <button class="new__note_button">Создать новую заметку</button>
      </router-link>
    </div>
    <div class="filter__notes">
      <span class="filter__title">Показать: </span>
      <select name="notes_filter" id="notes_filter" v-model="filterName">
        <option value="all">Все</option>
        <option value="completed">Завершенные</option>
        <option value="not_completed">Не завершенные</option>
      </select>
    </div>
    <div class="notes__wrapper">
      <h2 v-if="!sortedNotes.length" class="nothing_title">
        Тут пока ничего нет :(
      </h2>
      <div
        v-else
        v-for="(item, index) in sortedNotes"
        :key="item._id"
        class="note"
        :style="'border-color:' + (isCompleted(item.todos) ? 'green' : 'red')"
      >
        <div class="notes__wrapper_toolbox">
          <router-link :to="{ name: 'Edit', params: { noteProp: item } }">
            <div class="edit">
              <img src="../assets/edit.svg" alt="edit_icon" />
            </div>
          </router-link>
          <div class="delete" @click="deleteNote(index)">
            <img src="../assets/trash.svg" alt="delete_icon" />
          </div>
        </div>
        <h3 class="note_title">{{ item.title }}</h3>
        <hr />
        <ul class="note__list">
          <li
            v-for="(todo, index) in item.todos"
            :key="index"
            class="note__list_item"
            :style="'color:' + (todo.completed ? 'green' : 'red')"
          >
            {{ todo.title }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      notesList: [],
      filterName: 'all'
    };
  },
  computed:{
    sortedNotes(){
      switch (this.filterName) {
        case "completed":
          return this.notesList.filter(it => it.completed === true)
        case "not_completed":
          return this.notesList.filter(it => it.completed === false)
        default:
          return this.notesList
      }
    }
  },
  created() {
    // Храню данные в localStorage
    if (!localStorage.notes) localStorage.notes = JSON.stringify([]); // Массив объектов notes в JSON'e
    this.notesList = JSON.parse(localStorage.notes);
  },
  methods: {
    deleteNote(index) {
      this.notesList.splice(index, 1);
      localStorage.notes = JSON.stringify(this.notesList);
    },
    isCompleted(item) {
      return !item.filter((x) => !x.completed).length; // Если все todos завершены, то весь note завершен
    },
  },
};
</script>

<style scoped>
.new__note_wrapper {
  padding: 2rem 0 1rem 0;
}
.new__note_button {
  background-color: #fff;
  border: 2px solid black;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.new__note_button:hover {
  box-shadow: #666 0.3rem 0.2rem;
}
.notes__wrapper_toolbox {
  position: absolute;
  right: 0;
  top: 0.5rem;
  display: flex;
  flex-direction: row;
}
.notes__wrapper_toolbox div {
  margin-right: 0.5rem;
  cursor: pointer;
}
.notes__wrapper_toolbox img {
  width: 1rem;
}
.notes__wrapper {
  padding-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.note {
  position: relative;
  flex-basis: 25rem;
  margin: 1rem;
  padding: 0.5rem;
  border: 2px solid;
  height: 100%;
  overflow: hidden;
  max-height: 20vh;
}
.note:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 90%
  );
  width: 100%;
  height: 4em;
}
.note__list {
  text-align: left;
}
.note__list_item {
  padding-top: 0.5rem;
}
</style>
