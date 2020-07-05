<template>
  <section class="editor">
    <Modal
      :text="modalText"
      v-if="showModal"
      @close="showModal = false"
      @delete="deleteNote"
      @save="saveNote"
      @reset="resetNote"
    ></Modal>
    <div class="editor__wrapper">
      <div class="warning">
        <p v-show="warning" class="warning_message">
          {{ warning }}
        </p>
      </div>
      <div class="edit__name">
        <h2 class="edit__name_title">
          Название заметки:
        </h2>
        <input
          type="text"
          class="edit__name_input"
          :placeholder="note.title"
          v-model="note.title"
        />
      </div>
      <TodosEditor :note="note"></TodosEditor>

      <div class="editor__toolbox">
        <button class="save_note" @click="saveNoteQuestion">
          Сохранить
        </button>
        <button class="reset_note" @click="resetNoteQuestion">
          Отменить редактирование
        </button>
        <button class="delete_note" @click="deleteNoteQuestion">
          Удалить
        </button>
      </div>
      <router-link to="/">
        <button class="add__new_todo">
          Назад
        </button>
      </router-link>
    </div>
  </section>
</template>

<script>
import Modal from "@/components/Modal";
import TodosEditor from "@/components/TodosEditor";
export default {
  name: "Editor",
  components: {
    Modal,
    TodosEditor,
  },
  props: ["noteProp"], // объект отдельной записи
  data() {
    return {
      warning: "", // строка с предупреждениями/ошибками
      showModal: false,
      note: this.noteProp || {
        // вид объекта записи
        _id: new Date().valueOf(),
        title: "",
        todos: [{}],
        completed: false,
      },
      modalText: {}, // объект для динамической передачи сообщений в modal
      pure_note: {}, // копия объекта записи. нужна для отката изменений
    };
  },
  created() {
    this.pure_note = JSON.parse(JSON.stringify(this.note));
  },
  methods: {
    resetNoteQuestion() {
      this.modalText = {
        type: "reset",
        title: "Обновить заметку?",
        subtitle: "Осторожно! Заметка будет обновлена до начального состояния!",
        apply: "Обновить",
        discard: "Назад",
      };
      this.showModal = true; // открываем модалку для сброса
    },
    deleteNoteQuestion() {
      this.modalText = {
        type: "delete",
        title: "Удалить заметку?",
        subtitle: "Осторожно! Заметка удалится навсегда!",
        apply: "Удалить",
        discard: "Назад",
      };
      this.showModal = true; // открываем модалку для удаления
    },
    saveNoteQuestion() {
      this.modalText = {
        type: "save",
        title: "Сохранить заметку?",
        subtitle: "Осторожно! Все данные сейчас обновятся!",
        apply: "Сохранить",
        discard: "Назад",
      };
      this.showModal = true; // открываем модалку для сохранения
    },
    saveNote() {
      if (this.validation() === true) {
        // если валидно
        let notesArray = JSON.parse(localStorage.notes); // берем из localStorage массив записей
        let index = notesArray.findIndex((item) => item._id === this.note._id); // ищем индекс совпадения по id
        if (index != -1) notesArray[index] = this.note;
        // если такой id есть, то заменяем запись
        else notesArray.push(this.note); // если есть - добавляем новую
        localStorage.notes = JSON.stringify(notesArray); // забрасываем обратно в localStorage
        this.$router.push("/"); // выходим на главную
      } else this.showModal = false; // если есть ошибки - закрываем modal
    },
    deleteNote() {
      if (!localStorage.notes) localStorage.notes = JSON.stringify([]);
      let notesArray = JSON.parse(localStorage.notes);
      let index = notesArray.findIndex((item) => item._id === this.note._id);
      if (index != -1) {
        // если нашли такой id в notes, то удаляем
        notesArray.splice(index, 1);
        localStorage.notes = JSON.stringify(notesArray);
        this.$router.push("/");
      } else {
        this.warning =
          "Вы не можете удалить этот элемент так так он еще не создан!"; // иначе ошибка
        this.showModal = false;
      }
    },
    resetNote() {
      this.note = JSON.parse(JSON.stringify(this.pure_note)); // бэкапим note
      this.showModal = false;
    },
    validation() {
      // простенькая валидация, чтобы не добавлять пустые записи
      console.log(this.note.todos);
      if (this.note.title === "") {
        this.warning = "Обязательно ввести название заметки!";
      } else {
        if (!this.note.todos[0].title)
          this.warning = "Обязательно нужно добавить хотя бы одно TODO!";
        else return true;
      }
    },
  },
};
</script>

<style scoped>
.editor__wrapper {
  padding: 3rem 0;
}

.edit__name_title {
  margin: 0;
}
.edit__name_input {
  border: 0;
  border-bottom: 2px solid black;
  font-size: 1.4rem;
}
.edit__name_input {
  margin-left: 2rem;
}
.edit__name {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.edit__name_input:focus {
  outline: none;
}

.todos__list_item input[type="checkbox"] {
  cursor: pointer;
  margin-left: 1rem;
  transform: scale(1.5);
  vertical-align: middle;
}
.add__new_todo,
.editor__toolbox button {
  background-color: #fff;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.editor__toolbox button:hover {
  box-shadow: #666 0.3rem 0.2rem;
}

.editor__toolbox button {
  flex-basis: 13rem;
  margin: 0.5rem;
  font-size: 1rem;
}
.editor__toolbox {
  margin: 1.5rem auto 1.5rem auto;
  justify-content: center;
  padding-top: 1.5rem;
  border-top: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
button.delete_note {
  border-color: red;
}
.warning_message {
  font-size: 1.2rem;
  padding-bottom: 2rem;
  color: red;
}
</style>
