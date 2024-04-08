<template>
  <div class="sessionCodeContainer">
    <div class="generateSession">
      <button @click="generateCode">Generate Session Code</button>
      <input type="text" v-model="sessionCode" readonly />
    </div>
    <div class="inputSession">
      <input type="text" v-model="inputCode" placeholder="Input Group Code" />
      <button @click="enterCode">Enter</button>
    </div>
  </div>
</template>

<script>
import { firebaseAuth, firestore } from "../firebase.js";

export default {
  name: "SessionCode",
  data() {
    return {
      sessionCode: "",
      inputCode: "",
    };
  },
  methods: {
    generateCode() {
      // Implement code generation logic here
      // For now, just simulating a generated code
      this.sessionCode = Math.random().toString(36).substring(2, 8);
    },
    enterCode() {
      // Implement code to handle the inputCode, such as joining a session
      console.log("Entered code:", this.inputCode);
    },
  },
};
</script>

<style scoped>
.sessionCodeContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align items to the right */
  justify-content: center; /* Center items vertically */
  position: fixed;
  top: 0;
  bottom: 0;
  right: 20px; /* Adjust based on preference */
  z-index: 10;
}

.generateSession,
.inputSession {
  margin-bottom: 20px; /* Space between the two sections */
}

.generateSession button,
.inputSession button,
.generateSession input,
.inputSession input {
  display: block;
  margin: 5px 0;
}

input[type="text"] {
  margin-top: 10px; /* Additional margin for text inputs */
}
</style>
