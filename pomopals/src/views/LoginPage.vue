<template>
    <div class="overlay">
      <div class="login-container">
        <div class="login-form">
          <h1>Sign In</h1>
          <p>Enter your email and password to sign in!</p>
  
          <button class="google-signin" @click="signInWithGoogle">Sign in with Google</button>
          <div class="divider">
            <span>or</span>
          </div>
          
          <form @submit.prevent="signIn">
            <form-field label="Email" fieldId="email" type="email" v-model="credentials.email" />
            <form-field label="Password" fieldId="password" :value="credentials.password" :isPassword="true"
                        @update:value="credentials.password = $event" />
            <div class="forgot-password">
              <router-link to="/forgot-password">Forgot password?</router-link>
            </div>
            <button type="submit" class="sign-in-button">Sign In</button>
          </form>
  
          <div class="create-account">
            <p>Not registered yet? <router-link to="/signup">Create an Account</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FormField from '@/components/FormField.vue';
import firebase from '@/firebase';

  export default {
    name: 'SignInPage',
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        passwordVisible: false
      };
    },
    methods: {
    async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // Redirect to dashboard or home page after successful sign-in
      this.$router.push('/dashboard');
    } catch (error) {
      console.error(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // Show error message to your user or log it.
    }},
    async signIn() {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(this.credentials.email.trim(), this.credentials.password);
      // Signed in 
      const user = userCredential.user;
      // Redirect to dashboard or another route
      this.$router.push('/dashboard');
    } catch (error) {
      console.error(error);
      // Handle errors here, such as showing a notification to the user
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  },
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
      }
    },
    computed: {
      passwordFieldType() {
        return this.passwordVisible ? 'text' : 'password';
      }
    },
    components: {
        'form-field' : FormField
    }
  }
  </script>
  
<style scoped>
/* Scoped styles for the component */


.login-container {
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 450px; 
    background: #FFFFFF;
    font-family: 'DM Sans', sans-serif;
    border-radius: 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    z-index: 2;
}

.login-form {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
    padding-right: 50px;
}

.login-form h1 {
    color: #2B3674;
    margin-bottom: 10px;
}

.login-form p {
    color: #2B3674;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9em;
    margin-bottom: 20px;
    width: 100%;
}

.google-signin {
    background-color: #F4F7FE;
    color: #2B3674;
    padding: 10px 15px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 10px;
    width: 100%;
}

.divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 16px 0;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ccc;
    margin: 10px; 
}

.divider span {
    white-space: nowrap; /* Keep the 'or' on the same line */
}

.forgot-password {
    text-align: right;
    margin-bottom: 20px;
    font-size: 0.9em;
}

.forgot-password a {
    color: #AE76A1;
    text-decoration: none;
}

.sign-in-button {
    background-color: #AE76A1;
    color: #fff;
    padding: 15px 15px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    width: 100%;
}

.sign-in-button:hover {
  background-color: #9c6891;
}

.create-account {
    text-align: left;
    margin-top: 10px;
}

.create-account a {
    color: #AE76A1;
    text-decoration: none;
}

.create-account a:hover {
  color: #9c6891;
}

</style>