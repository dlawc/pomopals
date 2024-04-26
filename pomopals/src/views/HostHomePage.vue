<template>
  <div class="overlay">
    <div class = "toggle">
      <ToggleURL/>
    </div>
    <div id="timerWrapper">
      <XpBar />
      <span id="boostedXPStatement"
        >You’ve earned an XP boost! Enjoy 1.5x XP this session.</span
      >
      <Timer
        @generatedSessionCode="storeSessionCode"
        ref="timerRef"
        :isHost="true"
        :canStartTimer="this.can_start_timer"
      />
    </div>
    <div id="sessionInfo">
      <span id="sessionCode">Session Code: {{ sessionCode }}</span>
      <div id="groupMembers">
        <div
          v-for="(member, index) in members"
          :key="index"
          class="member-badge"
        >
          {{ member }}
        </div>
        <img
          src="@/components/icons/leave.svg"
          alt="Leave"
          class="leave-icon"
          @click="leaveSession"
        />
      </div>
      <div id="memberCount">
        {{ members.length }} member(s) in this group session
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "/src/components/Timer.vue";
import XpBar from "/src/components/XpBar.vue";
import ToggleURL from "@/components/ToggleURL.vue"
import firebase from "@/firebase";
import { firebaseAuth, db } from "@/firebase";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "HostHomePage",
  components: {
    Timer,
    XpBar,
    ToggleURL,
  },
  data() {
    return {
      sessionCode: "",
      members: [],
      groupID: "",

      can_start_timer:true,
    };
  },
  created() {
    // Set the sessionCode based on the router query parameter
    this.sessionCode = this.$route.query.sessionCode;
    this.fetchSessionDetails();
    console.log("Host page received session code:", this.sessionCode);
  },
  computed: {
    memberCount() {
      return `${this.members.length} member(s) in this group session`;
    },
  },
  watch: {
    members() {
      // Set can_start_timer to false if there's only one member
      this.can_start_timer = this.members.length !== 1;
      console.log("Number of members in this session:", this.members.length);
      console.log("can_start_timer:", this.can_start_timer);
    }
  },
  // In HostHomePage.vue script
  methods: {
    fetchSessionDetails() {
      const sessionRef = firebase
        .firestore()
        .collection("groupSession")
        .doc(this.sessionCode);
      sessionRef.onSnapshot(
        (doc) => {
          if (doc.exists) {
            const data = doc.data();
            // Create a new array from the proxy to ensure reactivity
            const membersArray = [data.host, ...(data.members || [])];
            this.members = [...membersArray];
            console.log(this.members);
            console.log("Real-time update of group members:", this.members);
          } else {
            console.error("No such session exists!");
          }
        },
        (error) => {
          console.error("Error fetching session details:", error);
        }
      );
    },
    leaveSession() {
      if (
        window.confirm(
          "Are you sure you want to leave the session and end it for everyone?"
        )
      ) {
        const username = firebaseAuth.currentUser.displayName; // Assuming currentUser is always available
        const sessionRef = db.collection("groupSession").doc(this.sessionCode);

        sessionRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              // Check if the user is the host
              if (doc.data().host === username) {
                sessionRef
                  .update({ active: false }) // Set active to false when the host leaves
                  .then(() => {
                    console.log("Session ended by the host.");
                    this.$router.push("/home");
                  })
                  .catch((error) => {
                    console.error("Error deactivating session: ", error);
                  });
              } else {
                console.error("You are not authorized to end this session.");
              }
            } else {
              console.error("No such session exists!");
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      }
    },
    storeSessionCode(sessionCode) {
      this.sessionCode = sessionCode;
      console.log("host/member page received:", this.sessionCode);
    },

  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh; /* Use viewport height to ensure full height */
  overflow: hidden; /* Prevent scrolling */
  font-family: "DM Sans", sans-serif;
}
#sessionInfo {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 10px;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  left: 50%;
}
#sessionCode {
  font-size: 1.15rem;
  color: white;
  font-weight: 500;
  z-index: 10;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

#friendsButton,
#leaderboardButton {
  position: absolute;
  top: 20%;
  right: 10px;
}

#friendsButton {
  transform: translateY(-100%);
}

#groupMembers {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 0;
  width: 80vw;
  max-width: 600px;
  flex-wrap: wrap;
  gap: 1px;
}

.member-badge {
  background-color: white;
  color: black;
  border-radius: 35px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0.2rem;
  margin-bottom: 3px;
  font-weight: bold;
  text-align: center;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: background-color 0.3s;
}

.member-badge:hover {
  background-color: #e8e8e8; /* Slightly darker background on hover */
}

#timerWrapper {
  margin-bottom: 2vh; /* This provides spacing between your components */
}

#memberCount {
  text-align: center;
  color: white; /* Set the text color */
  font-size: 1.15rem; /* Adjust the font size as needed */
  margin-top: 1px; /* Add some space above the text */
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
.leave-icon {
  cursor: pointer;
  width: 40px; /* or the size you prefer */
  height: 40px; /* or the size you prefer */
  margin-top: 5px; /* adjust as needed */
  cursor: pointer;
  fill: white;
}

#boostedXPStatement {
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translateY(-150%);
  margin-bottom: -50px;
  text-align: center;
  font-size: 1.6rem;
  color: white;
  font-size: 15px;
  font-weight: 450;
  text-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 100);
}

.toggle {
    position: absolute; 
    bottom: 10px; 
    left: 30px; 
    padding: 10px; 
}
</style>
