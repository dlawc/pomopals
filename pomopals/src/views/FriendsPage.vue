<template>
  <div class="friends-page">
    <div class = "navbar">
      <NavBar/>
    </div>
    <div class="header">
      <div class="signout">
        <SignOutButton />
      </div>
      <div class="header-content">
        <h1 class="header-title">My Friends</h1>
        <div class="header-controls">
          <AddFriendButton/>
          <input
            type="search"
            placeholder="Search Friends"
            v-model="searchQuery"
          />
        </div>
      </div>
    </div>

    <FriendsList :searchQuery="searchQuery"/>
  </div>
</template>

<script>
import AddFriendButton from "@/components/AddFriendButton.vue";
import FriendsList from "@/components/FriendsList.vue";
import SignOutButton from "@/components/SignOutButton.vue";
import NavBar from "@/components/NavBar.vue"

export default {
  data() {
    return {
      showAddFriendModal: false,
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
      this.showAddFriendModal = false; // Hide the modal after sending the request
    },
    deleteFriend(friend) {
      this.friends = this.friends.filter((f) => f !== friend);
    },
  },
  components: {
    AddFriendButton,
    FriendsList,
    SignOutButton,
    NavBar, 
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

</style>
