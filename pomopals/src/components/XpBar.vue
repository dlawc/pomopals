<template>
  <div class="xpBar">
    <span>⌁₊˚⊹   Total XP: {{ totalXP }}  ⊹˚₊⌁</span>
  </div>
</template>

<script>
import { firebaseAuth, firestore } from "../firebase.js";

export default {
  name: "XpBar",
  data() {
    return {
      totalXP: null,
    };
  },
  mounted() {
    this.handleAuthStateChanged();
  },
  methods: {
    handleAuthStateChanged() {
      firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in, fetch the data
          this.fetchUserData(user.displayName);
        } else {
          // No user is signed in
          this.totalXP = "User not logged in";
        }
      });
    },
    fetchUserData(username) {
      let userRef = firestore.collection("users").doc(username);
      userRef.onSnapshot(
        (doc) => {
          if (doc.exists && doc.data().xp !== undefined) {
            // Checks if the document exists and xp is not undefined
            this.totalXP = doc.data().xp;
          } else if (doc.exists) {
            // Document exists but xp might be undefined
            this.totalXP = 0;
          } else {
            // Document does not exist
            this.totalXP = "User data unavailable";
          }
        },
        (error) => {
          console.error("Error fetching XP data:", error);
          this.totalXP = "Error fetching data";
        }
      );
    }
  },
};

</script>

<style scoped>
.xpBar {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
}

.xpBar span {
  font-size: 1.6rem;
  color: white;
  font-weight: 600;
  text-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 100);
}
</style>
