<template>
    <div class="overlay">
      <div class="login-container">
        <div class="landing-page">
          <img src="@/assets/pomopals_icon.png" alt="PomoPals Icon" class="landing-icon"/>
          <h1>Email Verification</h1>
          <p>
            Hey {{ displayName }}, you're almost ready to start enjoying PomoPals. Click on
            the button below to verify your email address!
          </p>
          <button type="button" class="landing-button" @click="verifyEmail">{{ buttonLabel }}</button>
          <p v-if="emailSent">
            Once verified, you can <router-link to="/login">return to login.</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  

  <script>
  import { firebaseAuth } from "../firebase.js";
  import { RouterLink } from 'vue-router';
  
  export default {
    name: "VerifyEmailPage",
    components: {
      RouterLink,
    },
    data() {
      return {
        displayName: '',  // Initialize displayName as empty
        emailSent: false, // Track if the verification email has been sent
        buttonLabel: 'Verify my Email Address', // Dynamic button label
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        const user = firebaseAuth.currentUser;
        if (user) {
          this.displayName = user.displayName || 'there'; // Set displayName or default to 'there'
        }
      },
      async verifyEmail() {
        const user = firebaseAuth.currentUser; // Get the current user from Firebase Auth
        if (user) { // Check if the user object exists
          try {
            await user.sendEmailVerification();
            console.log("Verification email sent! Redirecting you to the log in page.");
            alert("Verification email sent! Redirecting you to the log in page.");
            this.$router.push("/login");
          } catch (verificationError) {
            console.error("Error sending verification email:", verificationError);
            alert("Failed to send verification email. Please try again.");
          }
        } else {
          console.error("No user logged in.");
          alert("No user logged in. Please login to send verification.");
        }
      },
    },
  };
  </script>
  

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url("/bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  background: white;
  padding: 1rem;
  max-width: 450px;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.landing-page {
  max-width: 400px;
  text-align: center;
}

.landing-icon {
  width: 220px;
  height: auto;
}

h1 {
  font-family: "DM Sans", sans-serif;
  margin-bottom: 1rem;
  margin-top: 1rem;
  color: #333;
  font-weight: 600;
  font-size: xx-large;
}

p {
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  margin-bottom: 2rem;
  color: #333;
}

.landing-button {
    background-color: #AE76A1; 
    color: white;
    padding: 15px 30px; 
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin: 10px auto; 
    width: 80%; 
    font-size: 1em;
    display: block; 
    text-align: center; 
}

.landing-button:hover {
  background-color: #9c6891;
}
</style>
