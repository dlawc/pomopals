<template>
  <div class="sessionCodeContainer">
    <div v-if="viewState == 'start'">
      <button @click="setViewState('host')">Host</button>
      <p1>|</p1>
      <button @click="setViewState('join')">Join</button>
    </div>
    <div v-if="viewState == 'host'">
      <button id="generateButton" @click="generateCode">
        Generate Session Code
      </button>

      <button id="leaveButton" @click="setViewState('start')">
        <img src="@/assets/leave.png" width="20" alt="Leave" />
      </button>
    </div>
    <div v-if="viewState == 'join'">
      <input
        type="text"
        v-model="inputCode"
        placeholder="Input Group Code"
        ref="groupCodeInput"
      />
      <button @click="enterCode">Enter</button>
      <button id="leaveButton" @click="setViewState('start')">
        <img src="@/assets/leave.png" width="20" alt="Leave" />
      </button>
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
      viewState: "start",
      currentUser: null,
    };
  },
  mounted() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        // User is logged in, you can perform additional setup here
      } else {
        // User is not logged in or session expired
        console.error("No user is logged in. Redirecting to login page.");
        this.$router.replace("/login");
      }
    }, error => {
      console.error("Failed to authenticate user:", error);
      alert("Authentication error. Please try again.");
    });
  },
  methods: {
    generateCode() {
      if (!this.currentUser) {
        alert("You must be logged in to generate a session code.");
        return;
      }

      this.sessionCode = Date.now().toString(36) + Math.random().toString(36).substr(2);
      this.$emit("cancelDurationEvent");
      this.$emit("generatedSessionCode", this.sessionCode);

      let userRef = firestore.collection("groupSession").doc(this.sessionCode);
      let data = {
        active: true,
        host: this.currentUser.displayName,
        members: [],
        restDuration: 0,
        pomodoroDuration: 0,
        xp: 0,
        timeStamp: Date.now(),
      };

      userRef.set(data)
        .then(() => {
          this.$router.push({
            path: "/host",
            query: { sessionCode: this.sessionCode },
          });
        })
        .catch(error => {
          console.error("Error setting session data:", error);
          alert("Failed to create session. Please try again.");
        });

      this.updateUserGroupCount();
    },
    updateUserGroupCount() {
      const userDocRef = firestore.collection("users").doc(this.currentUser.displayName);

      userDocRef.get().then(doc => {
        if (doc.exists) {
          let currentCount = doc.data().groupstudy || 0;
          userDocRef.update({ groupstudy: currentCount + 1 });
        } else {
          userDocRef.set({ groupstudy: 1 });
        }
      }).catch(error => {
        console.error("Error updating user data:", error);
      });
    },
    enterCode() {
      if (!this.currentUser) {
        alert("You must be logged in to join a group.");
        return;
      }

      let sessionCode = this.inputCode; // Assume you have a two-way binding on inputCode
      let docRef = firestore.collection("groupSession").doc(sessionCode);

      docRef.get().then(doc => {
        if (!doc.exists) {
          alert("No such group found.");
          return;
        }

        let data = doc.data();
        if (data.host === this.currentUser.displayName) {
          alert("You are the host and cannot join as a member.");
          return;
        }

        if (data.members.includes(this.currentUser.displayName)) {
          alert("You are already a member of this group.");
          return;
        }

        docRef.update({ members: [...data.members, this.currentUser.displayName] })
          .then(() => {
            alert("Group joined successfully");
            this.$router.push({
              path: "/member",
              query: { sessionCode: sessionCode },
            });
          })
          .catch(error => {
            console.error("Error updating group session document:", error);
            alert("Error updating group. Please try again.");
          });
      }).catch(error => {
        console.error("Error getting group session document:", error);
        alert("Error accessing group. Please try again.");
      });
    },
    setViewState(state) {
      this.viewState = state;
      this.sessionCode = "";
    },
  },
};
</script>


<style scoped>
.sessionCodeContainer {
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally in the container */
  justify-content: center; /* Center children vertically in the container */
  position: fixed; /* Fix position relative to the viewport */
  left: 50%; /* Position the left edge of the container in the middle of the viewport */
  bottom: 0; /* Align the container to the bottom of the viewport */
  transform: translateX(
    -50%
  ); /* Shift the container left by half its width to center it */
  z-index: 1000; /* Ensure it sits above other content; adjust as necessary */
}

/* You may want to add styles for the buttons and inputs to ensure they look good when centered */
.sessionCodeContainer button,
.sessionCodeContainer input[type="text"] {
  margin: 0.5rem; /* Spacing around buttons and input */
  /* Additional styles for buttons and input */
}

p1 {
  color: white;
  font-size: 25px;
}

/* Styles for buttons */
.sessionCodeContainer button {
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.6rem;
  color: white;
  font-weight: 600;
  text-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 100);
}

/* Styles for inputs */
.sessionCodeContainer input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

#leaveButton {
  width: 100%;
  max-width: 20px;
  height: auto;
  background: transparent;
  border: 0;
}
</style>
