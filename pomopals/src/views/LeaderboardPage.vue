
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
          <select id="timeframe-dropdown" v-model="selectedTimeframe" @change="changeTimeframe">
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
            
            <div class="item-points">{{ item.points }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import firebase from "@/firebase";
import SignOutButton from "@/components/SignOutButton.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'LeaderboardPage',
  data() {
    return {
      selectedTimeframe: 'all',
      leaderboardItems: [],
      currentUser: null,
      isLoading: true
    };
  },
  watch: {
  currentUser: {
    handler(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchLeaderboard();
      }
    },
    immediate: true, // This will trigger the handler immediately on mount
  },
},
mounted() {
    this.isLoading = true;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
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

        if (this.selectedTimeframe === 'all') {
          points = data.xp || 0;
        } else if (this.selectedTimeframe === 'monthly') {
          Object.entries(data.xpWithTime || {}).forEach(([dateString, xpRecord]) => {
            const date = new Date(dateString);
            if (isDateInCurrentMonth(date)) {
              points += Object.values(xpRecord).reduce((sum, xp) => sum + xp, 0);
            }
          });
        }

        return {
              username: doc.id === this.currentUser.displayName ? 'You' : doc.id,
              points: points, 
              isUser: doc.id === this.currentUser.displayName
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
    changeTimeframe() {
      console.log(this.selectedTimeframe + ' leaderboard selected');
      this.fetchLeaderboard();
    },
    redirectToGlobal() {
    },
    redirectToFriends() {
      this.$router.push('/friendsleaderboard');
    },
    redirectToHome() {
      this.$router.push('/home');
    },
    // Additional methods if needed
  },
  components: {
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
  z-index: 10; /* Higher z-index ensures the header stays above the content */
}

.leaderboard-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e0e0e0;
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
  flex: 0 0 275px;
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
}

.add-friend-btn.added {
  background-color: #7927b0;
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