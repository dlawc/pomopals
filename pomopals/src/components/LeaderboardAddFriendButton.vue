<template>
    <div>
      <button
        v-if="showButton"
        :class="buttonClass"
        @click="handleButtonClick"
      >
        {{ buttonText }}
      </button>
      <div v-if="showPopup" class="popup">
        <p>Add {{ friendUsername }} as friend?</p>
        <div class="button-container">
          <button class="cute-button" @click="sendRequest">Yes</button>
          <button class="cute-button" @click="togglePopup">No</button>
        </div>
      </div>
    </div>
  </template>

<script>
import firebase from "@/firebase";

export default {
  name: "LeaderboardAddFriendButton",
  props: {
    friendUsername: {
      type: String,
      required: true
    },
    friendStatus: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showPopup: false,
      currentUser: null,
      pendingRequests: [],
      isFriend: false, 
      requestInitiator: null,
    };
  },
  watch: {
    friendStatus(newValue) {
      if (newValue === 'added') {
        this.isFriend = true;
      } else {
        this.isFriend = false;
      }
    }
  },
  created() {
        this.currentUser = firebase.auth().currentUser;
        if (this.currentUser) {
        this.checkFriendStatus(this.currentUser.displayName, this.friendUsername);
        this.fetchPendingRequests(this.currentUser.displayName, this.friendUsername); // Pass both currentUser and friendUsername
        }
    },
    computed: {
        buttonText() {
        if (this.isFriend) {
        return 'Added!';
        } else if (this.hasPendingRequest()) {
        // Check if the current user sent the request
        if (this.requestInitiator === this.currentUser.displayName) {
            return 'Pending...';
        } else {
            // The other user sent the request
            return 'New Friend Request!';
        }
        } else {
        return '+ Add Friend';
        }
    },
    buttonClass() {
        if (this.isFriend) {
            return 'add-friend-btn added';
        } else if (this.hasPendingRequest() && this.requestInitiator !== this.currentUser.displayName) {
            return 'add-friend-btn new-request'; // New class for new friend request
        } else if (this.hasPendingRequest()) {
            return 'add-friend-btn pending';
        } else {
            return 'add-friend-btn';
        }
        },
    showButton() {
        return true; // Always show the button
    }
    },
    methods: {
        togglePopup() {
        if (this.friendStatus === 'none') {
            this.showPopup = !this.showPopup;
        }
        // When the status is 'pending' or 'added', clicking the button will not toggle the popup.
        },
        sendRequest() {
            const db = firebase.firestore();
            const friendUsername = this.friendUsername;
            const username = this.currentUser.displayName;

            db.collection("users").doc(friendUsername).get()
                .then((friendDocSnapshot) => {
                    if (friendDocSnapshot.exists) {
                        db.collection("users").doc(username).get()
                            .then((userDocSnapshot) => {
                                if (userDocSnapshot.exists && userDocSnapshot.data().friends && userDocSnapshot.data().friends[friendUsername]) {
                                    alert("You are already friends with this user.");
                                } else {
                                    const senderID = username;
                                    const receiverID = friendUsername;

                                    const senderReceiverQuery = db.collection("FriendRequests").where("senderID", "==", senderID).where("receiverID", "==", receiverID);
                                    const receiverSenderQuery = db.collection("FriendRequests").where("senderID", "==", receiverID).where("receiverID", "==", senderID);

                                    Promise.all([senderReceiverQuery.get(), receiverSenderQuery.get()])
                                        .then(([senderReceiverSnapshot, receiverSenderSnapshot]) => {
                                            if (!senderReceiverSnapshot.empty || !receiverSenderSnapshot.empty) {
                                                alert("There is already a pending friend request.");
                                            } else {
                                                db.collection("FriendRequests").add({
                                                        senderID: username,
                                                        receiverID: friendUsername,
                                                        status: "pending",
                                                    })
                                                    .then(() => {
                                                        alert("Friend request sent successfully.");
                                                        this.friendUsername = ""; // Reset input
                                                        this.showPopup = false; // Hide popup
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error sending friend request:", error);
                                                        // No need to display an alert here as the user already received a success message
                                                    });
                                            }
                                        })
                                        .catch((error) => {
                                            console.error("Error checking existing friend requests:", error);
                                            alert("An error occurred while checking existing friend requests. Please try again later.");
                                        });
                                }
                            })
                            .catch((error) => {
                                console.error("Error fetching user:", error);
                                alert("An error occurred while fetching user data. Please try again later.");
                            });
                    } else {
                        alert("Username not found.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching friend:", error);
                    alert("An error occurred while fetching friend data. Please try again later.");
                });
                this.showPopup = false; 
        },
        fetchPendingRequests(username, friendUsername) {
            const db = firebase.firestore();
            // Adjust the query to check if either the currentUser is the sender or receiver of a pending request
            db.collection("FriendRequests")
            .where("status", "==", "pending")
            .onSnapshot((snapshot) => {
                const requests = [];
                let initiator = null;
                snapshot.forEach((doc) => {
                const data = doc.data();
                // Check if either the receiverID or senderID matches the currentUser and friendUsername
                if (data.receiverID === username && data.senderID === friendUsername) {
                    initiator = data.senderID;
                    requests.push({ id: doc.id, ...data });
                } else if (data.receiverID === friendUsername && data.senderID === username) {
                    initiator = data.senderID;
                    requests.push({ id: doc.id, ...data });
                }
                });
                this.pendingRequests = requests;
                this.requestInitiator = initiator;
                this.checkFriendStatus(username, friendUsername);
            }, (error) => {
                console.error("Error fetching pending friend requests:", error);
            });
        },
        hasPendingRequest() {
            const username = this.currentUser.displayName;
            const friendUsername = this.friendUsername;
            // Check if there is at least one pending request and if they are not friends already
            return this.pendingRequests.some(request => {
            const isPendingWithCurrentUser = (request.senderID === username && request.receiverID === friendUsername) || 
                                                (request.senderID === friendUsername && request.receiverID === username);
            return isPendingWithCurrentUser && !this.isFriend;
            });
        },
        checkFriendStatus(username, friendUsername) {
            const db = firebase.firestore();
            db.collection("users")
            .doc(username)
            .get()
            .then((doc) => {
                if (doc.exists) {
                const friendsList = doc.data().friends || {};
                this.isFriend = !!friendsList[friendUsername];
                this.friendStatus = this.isFriend ? 'added' : this.hasPendingRequest() ? 'pending' : 'none';
                } else {
                this.isFriend = false;
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        },
        handleButtonClick() {
            if (this.isFriend || this.hasPendingRequest()) {
                return;
            }
            this.togglePopup();
            }
        }
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: purple;
  color: white;
  font-size: 20px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.popup p {
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.cute-button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  background-color: #ff69b4; 
  color: white;
  font-size: 20px;
  font-weight: bold;
  transition: background-color 0.3s;
}
.cute-button:hover {
  background-color: #ff1493;
}
.item-button {
display: flex;
justify-content: flex-end; 
} 
.add-friend-btn {
background-color: #55bc47;
border: none;
border-radius: 20px;
color: white;
cursor: pointer;
font-size: 1rem;
padding: 0.5rem 1rem;
}
.add-friend-btn:hover {
background-color: #47a83e;
}
.add-friend-btn.pending {
background-color: #a4a0a0;
cursor: default;
}
.add-friend-btn.added {
background-color: #7927b0;
cursor: default;
}
.add-friend-btn.new-request {
background-color: red; 
font-weight: bold;
cursor: default;
}
</style>
  
  