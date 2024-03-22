import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // if using Vue Router
import firebase from './firebase' // the path to the firebase module
import 'firebaseui/dist/firebaseui.css'


const app = createApp(App)
app.use(router)

// Optionally: If you're using Firebase's Firestore or Auth in your components, you might want to attach them to the Vue instance for easier access:
app.config.globalProperties.$firebase = firebase
// This is not strictly necessary, but can make accessing Firebase easier within your components, using `this.$firebase`

app.mount('#app')
