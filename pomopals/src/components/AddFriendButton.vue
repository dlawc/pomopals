<template>
  <button class="button" @click="togglePopup">+ Add Friends</button>
  <div v-if="showPopup" class="popup">
    <input v-model="friend_username" placeholder="Enter friend's username" />
    <button @click="sendRequest">Send Request</button>
    <div class="friend-requests-container"> 
      <div
      v-for="request in pendingRequests"
      :key="request.id"
      class="friend-request"
    >
      <p>{{ request.senderID }}</p>
      <button @click="acceptRequest(request.id, request.senderID)">
        Accept
      </button>
      <button @click="declineRequest(request.id)">Decline</button>
    </div>
    </div>
    
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
      pendingRequests: [],
    };
  },
  created() {
    // Fetch the current user's information
    this.currentUser = firebase.auth().currentUser;
    if (this.currentUser) {
      this.username = this.currentUser.displayName;
      console.log("username:", this.username);
    }
    this.fetchPendingRequests(this.username);
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
    fetchPendingRequests(username) {
      const db = firebase.firestore();

      db.collection("FriendRequests")
        .where("receiverID", "==", username)
        .where("status", "==", "pending")
        .onSnapshot((snapshot) => {
          const requests = [];
          snapshot.forEach((doc) =>
            requests.push({ id: doc.id, ...doc.data() })
          );
          this.pendingRequests = requests; 
        }, (error) => {
          console.error("Error fetching pending friend requests:", error)
        });
    },
    acceptRequest(requestId, senderID) {
    const db = firebase.firestore();
    const username = this.username;

    const batch = db.batch();

    const currentUserRef = db.collection("users").doc(username);
    batch.update(currentUserRef, {
      [`friends.${senderID}`]: true
    });

    // Add current user to sender's friends list
    const senderRef = db.collection("users").doc(senderID);
    batch.update(senderRef, {
      [`friends.${username}`]: true
    });

    // Delete the friend request
    const requestRef = db.collection("FriendRequests").doc(requestId);
    batch.delete(requestRef);

    // Commit the transaction
    batch.commit()
      .then(() => {
        alert("Friend request accepted.");
      })
      .catch((error) => {
        console.error("Error accepting friend request:", error);
        alert("An error occurred. Please try again later.");
      });
  },
  declineRequest(requestId) {
    const db = firebase.firestore();

    db.collection("FriendRequests").doc(requestId).delete()
      .then(() => {
        alert("Friend request declined.");
      })
      .catch((error) => {
        console.error("Error declining friend request:", error);
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
  top: 50%;
  left: 50%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 300px; /* Set a fixed width for your popup */
  max-height: 400px; /* Set a max height for your popup */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* This ensures the popup respects max-height */
  z-index: 100;
}

.popup input[type="text"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.friend-requests-container {
  overflow-y: auto; /* Enables scrolling for the friend requests */
  margin-top: 10px;
  padding-right: 5px; /* Prevents the scrollbar from overlapping content */
}

.friend-request {
  margin-bottom: 10px;
  color: black; /* Add space between friend requests */
}

/* You may also want to adjust the button styles for better usability */
.button {
  background-color: black;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  outline: none;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #878787;
}
</style>
