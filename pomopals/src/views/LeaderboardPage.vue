<template>
  <div class="leaderboard-page">
    <div class = "navbar">
      <NavBar/>
    </div>
    <div class="header">
      <div class="signout">
        <SignOutButton />
      </div>
      <div class="header-content">
          <h1 class="header-title">Leaderboard</h1>
      </div>
      
      <div class="tabs">
          <button class="tab-button active-tab" @click="redirectToGlobal">
              Global Leaderboard
          </button>
          <button class="tab-button" @click="redirectToFriends">
              Friends Leaderboard
          </button>
      </div>

      <div class="timeframe-selector">
        <select id="timeframe-dropdown" v-model="selectedTimeframe" @change = "changeTimeframe">
          <option value="all">All Time</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div class="leaderboard-container">
        <div class="table-header">
          <div class="header-rank">Rank</div>
          <div class="header-username">Username</div>
          <div class="header-points">Points</div>
        </div>
        <div class="leaderboard-item" 
          v-for="(item, index) in leaderboardItems" 
          :key="index"
          :class="{ 'highlighted': item.isUser }">
          <div class="item-rank">
            <span class="rank-medal">{{ item.displayRank }}</span>
          </div>
          <div class="item-username">{{ item.username }}</div>
          <div class="item-button">
            <LeaderboardAddFriendButton
              v-if="item.showButton && !item.isUser"
              :friend-username="item.username"
              :friend-status="item.friendStatus"
              @send-friend-request="sendFriendRequest"
            />
          </div>
          <div class="item-points">{{ item.points }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
import SignOutButton from "@/components/SignOutButton.vue";
import LeaderboardAddFriendButton from '@/components/LeaderboardAddFriendButton.vue';
import NavBar from "@/components/NavBar.vue";

export default {
name: 'LeaderboardPage',
data() {
  return {
    selectedTimeframe: 'all',
    leaderboardItems: [],
    currentUser: null,
    isLoading: true,
    friendsMap: {}, 
    friendRequests: {}, 
  };
},
watch: {
  currentUser: {
    handler(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchLeaderboard();
      }
    },
    immediate: true, 
  },
},
mounted() {
  this.isLoading = true;
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.currentUser = user;
      this.fetchFriends(user.uid);
      this.fetchFriendRequests(user.uid);
      this.fetchLeaderboard();
    } else {
      this.currentUser = null;
      this.isLoading = false;
    }
  });
},
methods: {
  fetchLeaderboard() {
    this.isLoading = true;
    const db = firebase.firestore();

    db.collection("users").get().then(querySnapshot => {
        let leaderboardData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            let points = 0;

            points = data.xp || 0;

            let friendStatus = this.determineFriendStatus(doc.id); // Ensure this is always checked

            return {
              username: doc.id === this.currentUser.displayName ? `${doc.id} (You)` : doc.id,
                points: points,
                isUser: doc.id === this.currentUser.displayName,
                showButton: doc.id !== this.currentUser.displayName,
                friendStatus: friendStatus, // Ensure this status is updated appropriately
            };
        });

        this.sortAndRankLeaderboard(leaderboardData);
        this.isLoading = false;
    }).catch(error => {
        console.error("Error getting documents:", error);
        this.isLoading = false;
    });
},

  refreshFriendStatus() {
    // Only update the friend status and pending requests if necessary
    this.leaderboardItems = this.leaderboardItems.map(item => {
        return {
            ...item,
            friendStatus: this.determineFriendStatus(item.username),
        };
    });
  },


  determineFriendStatus(userId) {
      if (this.friendsMap[userId]) {
          return 'added';
      } else if (this.friendRequests[userId] && this.friendRequests[userId].status === 'pending') {
          return 'pending';
      }
      return 'none';
  },

  sortAndRankLeaderboard(leaderboardData) {
      // Sort leaderboard data by points in descending order
      leaderboardData.sort((a, b) => b.points - a.points);

      let rank = 1; // Start ranking at 1
      let prevPoints = null; // Variable to store points of the previous item in the loop

      // Loop through the sorted leaderboard data to assign ranks
      leaderboardData.forEach((item, index) => {
          if (prevPoints !== item.points) { // If current item's points are different from the previous one
              rank = index + 1; // Update rank to current index + 1
              prevPoints = item.points; // Update prevPoints to current item's points
          }
          item.rank = rank; // Assign the rank to the current item

          // Assign display rank, use medal emojis for top 3
          item.displayRank = item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank.toString();
      });

      this.leaderboardItems = leaderboardData; // Update the leaderboardItems with the ranked data
  },
  changeTimeframe() {
    this.$router.push('/monthlyleaderboard'); 
  },
  redirectToGlobal() {
  },
  redirectToFriends() {
    this.$router.push('/friendsleaderboard');
  },
  redirectToHome() {
    this.$router.push('/home');
  },
},
components: {
  LeaderboardAddFriendButton,
  SignOutButton,
  NavBar,
}
}
</script>


<style scoped>
.leaderboard-page {
margin: 0;
padding: 0;
font-family: "DM Sans", sans-serif;
background-color: #4d003c;
color: white;
text-align: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
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
font-size: 20px;
}
.timeframe-selector {
margin-top: 1rem;
text-align: center;
}

.timeframe-selector select {
padding: 0.5rem 1.5rem;
background-color: #000000;
color: white;
border: none;
border-radius: 20px;
cursor: pointer;
font-size: 1rem;
}

.leaderboard-container {
background-color: #FFFFFF;
color: #000000;
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
margin-top: 1rem;
width: 70%;
display: flex;
flex-direction: column;
max-height: 60vh;
overflow-y: auto;
}

.table-header {
background-color: #000000;
color: white;
display: flex;
justify-content: space-between;
padding: 0.5rem 1rem;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
position: sticky;
top: 0;
z-index: 10;
}

.leaderboard-item {
display: flex;
justify-content: space-between;
align-items: center;
padding: 0.5rem 1rem;
border-bottom: 1px solid #e0e0e0;
}

.item-username {
flex: 2; 
text-align: left; 
margin-right: 0.5rem; 
overflow-wrap: break-word;
word-wrap: break-word; 
overflow: hidden;
text-overflow: visible;
text-overflow: clip;
}

.item-points {
min-width: 50px;
text-align: right;
}

.leaderboard-item:nth-child(even) {
background-color: #F3E5F5;
}

.leaderboard-item.highlighted {
background-color: orange; 
font-weight: bold;
}

.header-rank, .header-username, .header-points, 
.item-rank, .item-username, .item-points, .item-button {
flex: 1;
text-align: left;
}

.header-rank, .item-rank {
flex: 0 0 200px;
}

.header-username, .item-username {
flex: 2; 
text-align: left;
}

.item-button {
flex: 1; 
display: flex;
justify-content: center; 
}

.header-points, .item-points {
flex: 1;
text-align: right;
}

.item-button {
flex: 1;  
display: flex;
justify-content: flex-end; 
}

.tabs {
margin: 1rem 0;
}

.tab-button {
background-color: transparent;
color: white;
border: none;
padding: 0.5rem 1rem;
cursor: pointer;
font-size: 1rem;
margin-right: 0.5rem;
}

.active-tab {
color: #FFD700; 
border-bottom: 2px solid #FFD700; 
}

</style>