<template>
  <button class="button" @click="togglePopup">+ Add Friends</button>
  <div v-if="showPopup" class="popup">
    <input v-model="friend_username" placeholder="Enter friend's username" />
    <button @click="sendRequest">Send Request</button>
  </div>
</template>

<script>
import firebase from "@/firebase";

export default {
  name: "AddFriendButton",
  data() {
    return {
      showPopup: false,
      friend_username: "",
      currentUser: null,
      username: null,
    };
  },
  created() {
    // Fetch the current user's information
    this.currentUser = firebase.auth().currentUser;
    if (this.currentUser) {
      this.username = this.currentUser.displayName;
      console.log("username:", this.username);
    }
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    sendRequest() {
      const db = firebase.firestore();
      const friend_username = this.friend_username;
      const username = this.username;

      if (!friend_username) {
        alert("Please enter a friend's username.");
        return; // Prevent further execution
      }

      // Step 1: Validate Friend's Username
      db.collection("users")
        .doc(friend_username)
        .get()
        .then((friendDocSnapshot) => {
          if (friendDocSnapshot.exists) {
            // Step 2: Check if they are currently friends
            db.collection("users")
              .doc(username)
              .get()
              .then((userDocSnapshot) => {
                if (
                  userDocSnapshot.exists &&
                  userDocSnapshot.data().friends &&
                  userDocSnapshot.data().friends[friend_username]
                ) {
                  alert("You are already friends with this user.");
                } else {
                  // Step 3: Check for an existing friend request
                  const senderID = username;
                  const receiverID = friend_username;

                  const senderReceiverQuery = db
                    .collection("FriendRequests")
                    .where("senderID", "==", senderID)
                    .where("receiverID", "==", receiverID);

                  const receiverSenderQuery = db
                    .collection("FriendRequests")
                    .where("senderID", "==", receiverID)
                    .where("receiverID", "==", senderID);

                  Promise.all([
                    senderReceiverQuery.get(),
                    receiverSenderQuery.get(),
                  ])
                    .then(
                      ([senderReceiverSnapshot, receiverSenderSnapshot]) => {
                        if (
                          !senderReceiverSnapshot.empty ||
                          !receiverSenderSnapshot.empty
                        ) {
                          // A pending request already exists
                          alert("There is already a pending friend request.");
                        } else {
                          // No existing request found, proceed to send request
                          db.collection("FriendRequests")
                          .add({
                            senderID: username,
                            receiverID: friend_username,
                            status: "pending",
                          })
                          .then(() => {
                            alert("Friend request sent successfully.");
                            this.friend_username = ""; // Reset input
                            this.showPopup = false; // Hide popup
                          })
                          .catch((error) => {
                            console.error(
                              "Error sending friend request:",
                              error
                            );
                            alert("Failed to send friend request.");
                          });
                        }
                      }
                    )
                    .catch((error) => {
                      console.error(
                        "Error checking existing friend requests:",
                        error
                      );
                      alert("An error occurred. Please try again later.");
                    });
                }
              })
              .catch((error) => {
                console.error("Error fetching user:", error);
                alert("An error occurred. Please try again later.");
              });
          } else {
            alert("Username not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching friend:", error);
          alert("An error occurred. Please try again later.");
        });
    },
  },
};
</script>

<style scoped>
.button {
  background-color: black;
  color: white;
  margin-right: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  outline: none;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #878787; /* Darker shade on hover for feedback */
}

.popup {
  position: fixed;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 100; /* Ensure it sits above other content */
}
</style>
