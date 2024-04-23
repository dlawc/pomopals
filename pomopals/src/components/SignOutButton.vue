<template>
  <button @click="confirmAndSignOut" class="button">Sign Out</button>
</template>

<script>
import firebase from "@/firebase";
import { firebaseAuth, firestore } from "../firebase.js";

export default {
  methods: {
    confirmAndSignOut() {
      const confirmed = window.confirm("Are you sure you want to sign out?");
      if (confirmed) {
        this.signOut();
        this.updateCurrentSegment();
      }
    },
    async signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("User signed out successfully");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    },
    updateCurrentSegment() {
      let currentUser = firebaseAuth.currentUser;
      let username = currentUser.displayName; // username as primary key
      let userRef = firestore.collection("users").doc(username);
      userRef.update({ currentSegment: 1 });
    },
  },
};
</script>

<style>
.button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold; 
  font-size: large; 
  text-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 100);
}

</style>
