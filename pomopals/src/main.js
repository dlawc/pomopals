import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import firebase from './firebase' 
import 'firebaseui/dist/firebaseui.css'
import './assets/global.css'; 


const app = createApp(App)
app.use(router)
app.config.globalProperties.$firebase = firebase
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
