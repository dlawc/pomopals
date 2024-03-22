<template>
    <div class="overlay">
        <div class="login-container">
            <div class="login-form">
                <h1>Sign Up</h1>
                <p>Enter your email and password to sign up!</p>

                <button class="google-signin" @click="signInWithGoogle">
                    Sign up with Google
                </button>
                <div class="divider">
                    <span>or</span>
                </div>

                <form @submit.prevent="signUp">
                    <form-field label="Email" fieldId="email" type="email" v-model="credentials.email" @update:value="credentials.email = $event" />
                    <form-field label="Username" fieldId="username" type="username" v-model="credentials.username" />
                    <form-field label="Password" fieldId="password" :value="credentials.password" :isPassword="true"
                        @update:value="credentials.password = $event" />
                    <div class="white-rectangle"></div>
                    <button type="submit" class="sign-up-button">Sign Up</button>
                </form>
                <div class="create-account">
                    <p>
                        Already have an account?
                        <router-link to="/login">Sign in here.</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormField from '@/components/FormField.vue';
import firebase from '@/firebase';
export default {
    name: 'SignUpPage',
    data() {
        return {
            credentials: {
                email: '',
                username: '', // Added this because you have a username field
                password: ''
            },
            passwordVisible: false,
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
        async signUp() {
    try {
      // Create a new user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password);
      const user = userCredential.user;

      // Optionally, update the user's profile with the username
      await user.updateProfile({
        displayName: this.credentials.username,
      });

      // You can now use the updated user information or redirect the user to another page
      console.log('User created and signed in with username:', user.displayName);
      this.$router.push('/dashboard'); // Redirect to the dashboard or another route
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle errors here, such as showing a notification to the user
      // Example: this.errorMessage = error.message;
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
        'form-field': FormField
    }
}
</script>

<style scoped>
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
    z-index: 1;
}

.login-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 450px;
    background: #ffffff;
    font-family: "DM Sans", sans-serif;
    border-radius: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 2;
}

.login-form {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
    padding-right: 50px;
}

.login-form h1 {
    color: #2b3674;
    margin-bottom: 10px;
}

.login-form p {
    color: #2b3674;
    font-family: "DM Sans", sans-serif;
    font-size: 0.9em;
    margin-bottom: 20px;
    width: 100%;
}

.google-signin {
    background-color: #f4f7fe;
    color: #2b3674;
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
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
    margin: 10px;
}

.divider span {
    white-space: nowrap;
    /* Keep the 'or' on the same line */
}

.sign-up-button {
    background-color: #ae76a1;
    color: #fff;
    padding: 15px 15px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    width: 100%;
}

.sign-up-button:hover {
    background-color: #9c6891;
}

.create-account {
    text-align: left;
    margin-top: 10px;
}

.create-account a {
    color: #ae76a1;
    text-decoration: none;
}

.create-account a:hover {
    color: #9c6891;
}

.white-rectangle {
    height: 20px;
    background-color: #ffffff;
}

body,
html {
    margin: 0;
    font-family: "DM Sans", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #f4f7fa;
    background-image: url("/bg.jpeg");
    /* Adjust the path if necessary */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>
