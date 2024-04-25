import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // if using Vue Router
import firebase from './firebase' // the path to the firebase module
import 'firebaseui/dist/firebaseui.css'
import './assets/global.css'; // Adjust the path to your global styles


const app = createApp(App)
app.use(router)

// Optionally: If you're using Firebase's Firestore or Auth in your components, you might want to attach them to the Vue instance for easier access:
app.config.globalProperties.$firebase = firebase
// This is not strictly necessary, but can make accessing Firebase easier within your components, using `this.$firebase`

app.mount('#app')


firebase.auth().onAuthStateChanged(user => {
    if (!app) {
      app = new Vue({
        router,
        render: h => h(App)
      }).$mount('#app');
    }
  
    if (user) {
      // User is signed in.
      this.userName = user.displayName;
      console.log('User is signed in:', user);
      Vue.prototype.$currentUser = user;
    } else {
      // User is signed out.
      console.log('User is signed out');
      router.push('/');
    }
  });
