<template>
    <button class="button" @click="signOut">Sign Out</button>
</template>

<script>
import firebase from "@/firebase";

export default {
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        alert('User signed out successfully');
        this.$router.push('/');
      }).catch((error) => {
        console.error("Error signing out:", error);
      });
    }
  }
};
</script>

<style scoped>

.button {
  background-color: black;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>