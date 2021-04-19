import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/reset.css'
import WheelIcon from './components/wheel-icon/index.vue'

createApp(App)
  .use(router)
  .component('WheelIcon', WheelIcon)
  .mount('#app')
