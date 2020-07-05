<template>
  <section class="modal__wrapper">
    <div class="modal_body">
      <h1 class="modal_title">
        {{ text.title }}
      </h1>
      <p class="modal_title">
        {{ text.subtitle }}
      </p>
      <div class="modal_toolbox">
        <button class="agree" @click="$emit(text.type)">
          <!--Эмитим событие после agree modal'a-->
          {{ text.apply }}
        </button>
        <button class="discard" @click="$emit('close')">
          <!--Закрываем modal -->
          Назад
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Modal",
  props: ["text"], // принимаем объект сообщений
};
</script>

<style scoped>
.modal__wrapper {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
}
.modal_body {
  width: 40rem;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 2rem;
  transform: translateY(-50%) translateX(-50%);
  background-color: #fff;
}
.modal_toolbox button {
  background-color: #fff;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: box-shadow 0.3s;
  margin: 0 1rem;
}
.modal_toolbox button:hover {
  box-shadow: #666 0.3rem 0.2rem;
}
</style>
