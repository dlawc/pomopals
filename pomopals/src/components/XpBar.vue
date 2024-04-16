<template>
  <div class="xpBar">
    <table id="table">
      <tr>
        <th id="totalXPHeader">Total XP</th>
      </tr>
      <tr>
        <td id="totalXP">{{ totalXP }}</td>
      </tr>
    </table>
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
  margin-top: 20px;
  text-align: center;
}

#table {
  transform: translateY(65px);
  width: 60%;
  border-collapse: collapse;
  margin-top: 10vh;
  background-color: white;
}

#table th,
#table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  color: black;
}

#table th {
  background-color: #f2f2f2;
  color: black;
}
</style>
