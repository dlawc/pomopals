<template>
  <div class="friends-page">
    <div class="header">
      <div class="signout">
        <SignOutButton />
      </div>
      <div class="header-content">
        <h1 class="header-title">My Friends</h1>
        <div class="header-controls">
          <AddFriendButton @onAddFriend="showAddFriendModal = true" />
          <AddFriendModal
            v-if="showAddFriendModal"
            @requestSent="handleFriendRequest"
          />
          <input
            type="search"
            placeholder="Search Friends"
            v-model="searchQuery"
          />
        </div>
      </div>
    </div>

    <div class="friends-list">
      <div class="list-header">
        <span>Username</span>
      </div>
      <ul>
        <li v-for="friend in filteredFriends" :key="friend">
          <span>{{ friend }}</span>
          <button class="delete-button" @click="deleteFriend(friend)">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AddFriendButton from "@/components/AddFriendButton.vue";
import AddFriendModal from "@/components/AddFriendModal.vue";
import SignOutButton from "@/components/SignOutButton.vue";
export default {
  data() {
    return {
      showAddFriendModal: false,
      friends: [
        "Josh123",
        "Kylie",
        "johnappleseed",
        "JJ",
        "arissa7",
        "isabel",
        "david",
        "Edwin",
        "Angelina55",
        "windows",
      ],
      searchQuery: "",
    };
  },
  computed: {
    filteredFriends() {
      return this.friends.filter((friend) =>
        friend.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleFriendRequest(username) {
      // Send the friend request using the username
      // This might involve calling an API and then updating the UI accordingly
      this.showAddFriendModal = false; // Hide the modal after sending the request
    },
    deleteFriend(friend) {
      this.friends = this.friends.filter((f) => f !== friend);
    },
  },
  components: {
    AddFriendButton,
    AddFriendModal,
    SignOutButton,
  },
};
</script>

<style scoped>
.friends-page {
  margin: 0;
  padding: 0;
  font-family: "DM Sans", sans-serif;
  background-color: #4d003c;
  color: white;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.signout {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
}

.header {
  background-color: #4d003c;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header-content {
  width: 80%;
  max-width: 800px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title h1 {
  margin: 0;
  color: white;
}

.header-controls {
  display: flex;
  align-items: center;
}

.header-controls input[type="search"] {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  outline: none;
  margin-left: 10px;
}

.header-controls input[type="search"] {
  background-color: white;
  color: grey;
  margin-right: 10px;
}

.friends-list {
  background: white;
  color: black;
  margin: 0 auto;
  width: 80%;
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list-header {
  background: black;
  color: aliceblue;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  text-align: left;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul li {
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-button {
  background-color: #c20606;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
