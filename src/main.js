import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Main from "@/views/Main";
import Editor from "@/views/Editor";

Vue.use(VueRouter);
const routes = [
  { path: "/", name: "Main", component: Main },
  { path: "/edit", name: "Edit", component: Editor, props: true },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
