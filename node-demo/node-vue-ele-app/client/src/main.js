import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import axios from './http'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhLocale from 'element-plus/dist/locale/zh-cn';


import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, { locale: zhLocale })
app.mount('#app')
app.config.globalProperties.$axios = axios;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
