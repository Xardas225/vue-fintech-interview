import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


createApp(App).component('VueDatePicker', VueDatePicker).use(router).mount('#app')
