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
name: 'MonthlyLeaderboardPage',
data() {
  return {
      selectedTimeframe: 'monthly',
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
  getStartOfCurrentMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  },
    fetchLeaderboard() {
    this.isLoading = true;
    const db = firebase.firestore();

    const getStartOfCurrentMonth = () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    };

    // Helper function to check if a date is within the current month
    const isDateInCurrentMonth = (date) => {
      const startOfCurrentMonth = getStartOfCurrentMonth();
      const endOfCurrentMonth = new Date(new Date(startOfCurrentMonth).setMonth(startOfCurrentMonth.getMonth() + 1));
      return date >= startOfCurrentMonth && date < endOfCurrentMonth;
    };

    db.collection("users").get().then(querySnapshot => {
      let leaderboardData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        let points = 0;

        Object.entries(data.xpWithTime || {}).forEach(([dateString, xpRecord]) => {
          const date = new Date(dateString);
          if (isDateInCurrentMonth(date)) {
            points += Object.values(xpRecord).reduce((sum, xp) => sum + xp, 0);
          }
        });

        let friendStatus = 'none';
          if (this.currentUser && this.friendsMap[doc.id]) {
            friendStatus = 'added';
          } else if (this.friendRequests[doc.id] === 'pending') {
            friendStatus = 'pending';
          }
      
        return {
              username: doc.id === this.currentUser.displayName ? `${doc.id} (You)` : doc.id,
              points: points, 
              isUser: doc.id === this.currentUser.displayName,
              showButton: doc.id !== this.currentUser.displayName, // Don't show button for self or already friends
              friendStatus: friendStatus,
            };
          });

      // Sort and assign ranks
      leaderboardData.sort((a, b) => b.points - a.points);
      let rank = 1;
      let prevPoints = null;
      leaderboardData.forEach((item, index) => {
        if (prevPoints !== item.points) {
          rank = index + 1;
          prevPoints = item.points;
        }
        item.rank = rank;
      });

      this.leaderboardItems = leaderboardData.map(item => ({
        ...item,
        displayRank: item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank.toString()
      }));

      this.isLoading = false;
      }).catch(error => {
        console.error("Error getting documents:", error);
        this.isLoading = false;
      });
    },
  fetchFriends(userId) {
      const db = firebase.firestore();
      db.collection("users").doc(userId).onSnapshot(doc => {
        if (doc.exists && doc.data().friends) {
          this.friendsMap = doc.data().friends;
        } else {
          this.friendsMap = {};
        }
        this.isLoading = false;
      }, error => {
        console.error("Error fetching friends:", error);
        this.isLoading = false;
      });
    },
    updateLocalFriendStatus(friendUsername, status) {
      this.$set(this.friendRequests, friendUsername, status);
      this.leaderboardItems = this.leaderboardItems.map(item => {
        if (item.username === friendUsername) {
          return { ...item, friendStatus: status };
        }
        return item;
      });
    },
  changeTimeframe() {
    this.$router.push('/leaderboard');
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