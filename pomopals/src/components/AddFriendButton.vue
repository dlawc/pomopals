<template>
  <div class="button-container">
    <button class="button" @click="togglePopup">
      + Add Friends
      <span v-if="pendingRequests.length" class="badge">{{
        pendingRequests.length
      }}</span>
    </button>
    <div v-if="showPopup" class="popup" @click.self="closePopup">
      <div class="input-container">
        <button class="close-btn" @click="closePopup">✖</button>
        <input
          v-model="friend_username"
          class="input-field"
          placeholder="Enter friend's username"
        />
        <button class="send-request-btn" @click="sendRequest">
          Send Request
        </button>
      </div>
      <div class="friend-requests-section">
        <h2 class="pending-requests-title">Pending Friend Requests</h2>
        <div v-if="pendingRequests.length" class="friend-requests-container">
          <div
            v-for="request in pendingRequests"
            :key="request.id"
            class="friend-request" @click.stop>
          >
            <p>{{ request.senderID }}</p>
            <button
              @click="acceptRequest(request.id, request.senderID)"
              class="accept-btn"
            >
              Accept
            </button>
            <button @click="declineRequest(request.id)" class="decline-btn">
              Decline
            </button>
          </div>
        </div>
        <p v-else class="no-requests-message">You have no pending friend requests.</p>
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

    closePopup() {
      this.showPopup = false;
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
        .onSnapshot(
          (snapshot) => {
            const requests = [];
            snapshot.forEach((doc) =>
              requests.push({ id: doc.id, ...doc.data() })
            );
            this.pendingRequests = requests;
          },
          (error) => {
            console.error("Error fetching pending friend requests:", error);
          }
        );
    },
    acceptRequest(requestId, senderID) {
      const db = firebase.firestore();
      const username = this.username;

      const batch = db.batch();

      const currentUserRef = db.collection("users").doc(username);
      batch.update(currentUserRef, {
        [`friends.${senderID}`]: true,
      });

      // Add current user to sender's friends list
      const senderRef = db.collection("users").doc(senderID);
      batch.update(senderRef, {
        [`friends.${username}`]: true,
      });

      // Delete the friend request
      const requestRef = db.collection("FriendRequests").doc(requestId);
      batch.delete(requestRef);

      // Commit the transaction
      batch
        .commit()
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

      db.collection("FriendRequests")
        .doc(requestId)
        .delete()
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

.button-container {
  position: relative;
  display: inline-block; /* Or use 'inline-flex' if needed */
}

.badge {
  position: absolute;
  top: -10px; /* Adjust as needed */
  right: -10px; /* Adjust as needed */
  background-color: red;
  color: white;
  width: 20px; /* You might need to adjust this based on content */
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  font-weight: bold;
  border: 2px solid white; /* This helps the badge stand out against backgrounds */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centralize the input and button */
  margin-bottom: 20px;
}

.input-field {
  width: 90%; /* Smaller width to allow padding space */
  padding: 12px;
  margin-bottom: 10px; /* Space between input and button */
  border: 2px solid #dbdbdb; /* Thicker border with theme color */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centers the popup perfectly */
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* Rounded corners for the popup */
  width: 300px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
  transition: all 0.3s ease; /* Smooth transition for popup */
}
.popup input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px; /* Consistent rounded corners for input fields */
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease; /* Transition for focus effect */
}

.popup input[type="text"]:focus {
  border-color: #ae76a1; /* Highlight color when input is focused */
  outline: none; /* Removes the default focus outline */
}

.send-request-btn {
  width: 50%; 
  padding: 10px;
  border-radius: 20px; 
  border: none;
  background-color: #ae76a1;
  color: white;
  font-weight: bold; 
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.send-request-btn:hover {
  background-color: #9c6891; 
}

.pending-requests-title {
  text-align: center;
  color: #2b3674;
  font-size: 1.1em;
  margin-bottom: 15px; 
}

.friend-requests-container {
  overflow-y: auto;
  margin-top: 10px;
  padding-right: 5px;
  max-height: 220px; 
  transition: max-height 0.3s ease; 
}

.friend-request {
  display: flex;
  align-items: center;
  color: black;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f7f7f7;
  border: 1px solid #eee;
  border-radius: 6px; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.no-requests-message {
  text-align: center;
  color: #757575; 
  font-size: 1em;
  margin-top: 20px; 
}

.accept-btn {
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #ae76a1;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.accept-btn:hover {
  background-color: #9c6891;
}

.decline-btn {
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #89959e;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.decline-btn:hover {
  background-color: #5a6268; 
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background: none;
  color: #a4a4a4;
  font-size: 1.25rem;
  cursor: pointer;
}

.close-btn:hover {
  color: #7e7e7e;
}
</style>
