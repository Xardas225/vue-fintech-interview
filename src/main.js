import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueDatePicker from "@vuepic/vue-datepicker";
import { createPinia } from "pinia";
import "@vuepic/vue-datepicker/dist/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .component("VueDatePicker", VueDatePicker)
  .use(router)
  .mount("#app");
