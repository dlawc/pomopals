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
            <h1 class="header-title">Friends Leaderboard</h1>
        </div>

        <div class="tabs">
            <button class="tab-button" @click="redirectToGlobal">
                Global Leaderboard
            </button>
            <button class="tab-button active-tab" @click="redirectToFriends">
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
                v-for="(item, index) in leaderboardWithMedals" 
                :key="index"
                :class="{ 'highlighted': item.isUser }">
                <div class="item-rank">
                <div class="item-rank">{{ item.displayRank }}</div>
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
  name: 'FriendsLeaderboardPage',
  data() {
    return {
      selectedTimeframe: 'all',
      leaderboardItems: [],
      currentUser: null,
      isLoading: true
    };
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
    fetchLeaderboard() {
      this.isLoading = true;
      const db = firebase.firestore();

      function getStartOfCurrentMonth() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
      }

      if (!this.currentUser) {
        console.error('No current user set');
        this.isLoading = false;
        return;
      }

      const startOfCurrentMonth = getStartOfCurrentMonth();
      const currentUserRef = db.collection("users").doc(this.currentUser.displayName);

      currentUserRef.get().then(doc => {
        if (!doc.exists) {
          console.error('Current user document does not exist');
          this.isLoading = false;
          return;
        }

        const friends = doc.data().friends || {};
        const leaderboardPromises = Object.keys(friends)
          .filter(friendKey => friends[friendKey] === true)
          .map(friendKey => db.collection("users").doc(friendKey).get());

        leaderboardPromises.push(currentUserRef.get());

        Promise.all(leaderboardPromises).then(docs => {
          let leaderboardData = docs.map(doc => {
            const xpEntries = doc.data().xpWithTime || {};
            let points = 0;

            if (this.selectedTimeframe === 'all') {
              points = doc.data().xp || 0; 
            } else if (this.selectedTimeframe === 'monthly') {
              points = Object.entries(xpEntries)
              .filter(([date, _]) => {
                const entryDate = new Date(date.split('T')[0]);
                return entryDate >= startOfCurrentMonth && entryDate < new Date();
              })
              .reduce((total, [_, timesXP]) => {
                return total + Object.values(timesXP).reduce((sum, xp) => sum + xp, 0);
              }, 0);
          }

            return {
              username: doc.id === this.currentUser.displayName ? `${doc.id} (You)` : doc.id,
              points: points, 
              isUser: doc.id === this.currentUser.displayName
            };
          });

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

          this.leaderboardItems = leaderboardData;
          this.isLoading = false;
        }).catch(error => {
          console.error("Error getting leaderboard data:", error);
          this.isLoading = false;
        });
      });
    },
    changeTimeframe() {
      console.log(this.selectedTimeframe + ' leaderboard selected');
      this.fetchLeaderboard();
    },
    redirectToGlobal() {
      this.$router.push('/leaderboard');
    },
    redirectToFriends() {
      this.fetchLeaderboard();
    },
    redirectToHome() {
      this.$router.push('/home');
    },
  },
  computed: {
    leaderboardWithMedals() {
      return this.leaderboardItems.map(item => {
        let displayRank;
        if (item.rank === 1) {
          displayRank = '🥇';
        } else if (item.rank === 2) {
          displayRank = '🥈';
        } else if (item.rank === 3) {
          displayRank = '🥉';
        } else {
          displayRank = item.rank;
        }

        return {
          ...item,
          displayRank
        };
      });
    }
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

.item-username {
  white-space: nowrap; /* Prevent the text from wrapping */
  overflow: hidden; /* Hide text that doesn't fit in the container */
  text-overflow: ellipsis; /* Add an ellipsis (...) at the end of the cut text */
  margin-right: 0.5rem; /* Ensure there's a space between the username and the points */
}

.item-points {
  min-width: 50px; /* Ensure the points don't shrink below a certain width */
  text-align: right;
}
.leaderboard-item.highlighted {
  background-color: orange; /* Highlight color */
  font-weight: bold;
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
  color: #FFD700; /* Gold color for the active tab */
  border-bottom: 2px solid #FFD700; /* Underline effect for the active tab */
}

</style>