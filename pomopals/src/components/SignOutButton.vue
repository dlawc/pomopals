<template>
  <button @click="confirmAndSignOut" class="button">Sign Out</button>
</template>

<script>
import firebase from "@/firebase";

export default {
  methods: {
    confirmAndSignOut() {
      const confirmed = window.confirm("Are you sure you want to sign out?");
      if (confirmed) {
        this.signOut();
      }
    },
    async signOut() {
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

<style>

.button {
  background-color: black;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
}
</style>