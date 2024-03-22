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
            <div class="form-group">
              <label for="email">Email<span class="required">*</span></label>
              <input type="email" id="email" v-model="credentials.email" required>
            </div>
            <div class="form-group">
              <label for="password">Password<span class="required">*</span></label>
              <div class="input-container">
                <input :type="passwordFieldType" id="password" v-model="credentials.password" required>
                <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                  {{ passwordVisible ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>
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
      signInWithGoogle() {
        // Logic to sign in with Google
      },
      signIn() {
        // Logic to sign in with email and password
      },
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
      }
    },
    computed: {
      passwordFieldType() {
        return this.passwordVisible ? 'text' : 'password';
      }
    }
  }
  </script>
  
<style scoped>
/* Scoped styles for the component */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  background-image: url('/bg.jpeg');
  background-size: cover; 
  background-repeat: no-repeat; 
  display: flex;
  justify-content: center;
  align-items: center;
}

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

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 16px;
    box-sizing: border-box; 
}

.required {
    color: red;
}

.password-container {
    position: relative;
}

.input-container {
    position: relative;
    display: flex;
}

.input-container input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 16px 0 0 16px; /* Rounded corners on the left side */
    margin-bottom: 0; /* Remove if you have any bottom margin */
}

.toggle-password {
    padding: 10px;
    border: 1px solid #ddd;
    border-left: none; /* Removes the border between the button and the input */
    border-radius: 0 16px 16px 0; /* Rounded corners on the right side */
    background: #eee;
    cursor: pointer;
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

.white-rectangle {
    height: 20px; 
    background-color: #ffffff; 
}


body, html {
    margin: 0;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #f4f7fa;
    background-image: url('/bg.jpeg'); /* Adjust the path if necessary */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>