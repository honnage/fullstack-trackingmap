import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Antd);

app.mount('#app')

