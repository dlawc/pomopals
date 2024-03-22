<template>
  <div class="overlay">
    <div class="login-container">
      <div class="landing-page">
        <img src="@/assets/pomopals_icon.png" alt="PomoPals Icon" class="landing-icon">
        <h1>PomoPals</h1>
        <p>Welcome to our productivity-boosting app!<br>
           Stay focused and productive with our customizable Pomodoro timers and group study sessions. <br>
           Achieve your academic goals with ease!</p>
        <button type="button" class="landing-button" @click="navigateToLogin">Log In</button>
        <button type="button" class="landing-button" @click="navigateToSignup">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    navigateToLogin() {
      this.$router.push({ name: 'LoginPage' }); 
    },
    navigateToSignup() {
      this.$router.push({ name: 'SignupPage' }); 
    }
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
  font-family: 'DM Sans', sans-serif;
  margin-bottom: 1rem;
}

p {
  font-family: 'DM Sans', sans-serif;
  margin-bottom: 2rem;
  color: #333;
}

.landing-button {
    background-color: #AE76A1; /* Use your theme color */
    color: white;
    padding: 15px 30px; /* Adjust padding as needed */
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin: 10px auto; /* Auto margins for horizontal centering */
    width: 80%; /* Adjust width as needed or use max-width for larger viewports */
    font-size: 1em;
    display: block; /* This will stack the buttons */
    text-align: center; /* Align the text in the center of the button */
}

.landing-button:hover {
  background-color: #9c6891;
}
</style>

