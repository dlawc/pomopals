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
import { firebaseAuth, firestore, db } from "../firebase.js";
export default {
  name: "XpBar",
  data() {
    return {
      totalXP: null,
    };
  },
  async mounted() {
    let userId = firebaseAuth.currentUser.uid; // userId as primary key

    let currentUser = firebaseAuth.currentUser;
    let username = currentUser.displayName; // username as primary key
    let userRef = firestore.collection("users").doc(username);
    userRef.onSnapshot(
      (doc) => {
        if (doc.exists) {
          // if doc data exists
          if (doc.data().xp) {
            // if xp is not null
            this.totalXP = doc.data().xp;
          } else {
            this.totalXP = 0;
          }
        } else {
          // if doc doesnt exist
          this.totalXP = "user data unavailable";
        }
      },
      (error) => {
        this.totalXP = "error fetching data";
      }
    );
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
