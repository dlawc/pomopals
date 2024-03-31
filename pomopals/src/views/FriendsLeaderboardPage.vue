<template>
    <div class="leaderboard-page">
      <div class="header">
        <div class="signout">
          <SignOutButton />
        </div>
        <div class="header-content">
            <h1 class="header-title">Friends Leaderboard</h1>
        </div>
        
        <div class="tabs">
            <GoToGlobalLeaderboardButton
            :is-active="currentLeaderboard === 'global'"
            @clicked="handleTabClick"
            />
            <GoToFriendsLeaderboardButton
            :is-active="currentLeaderboard === 'friends'"
            @clicked="handleTabClick"
            />
        </div>

        <div class="timeframe-selector">
          <select id="timeframe-dropdown" v-model="selectedTimeframe" @change="changeTimeframe">
            <option value="all">All Time</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
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
                :class="{ 'highlighted': item.username === 'YourUsername (You)' }">
                <div class="item-rank">
                <span class="rank-medal">{{ item.medal }}</span>
                </div>
                <div class="item-username">{{ item.username }}</div>
                <div class="item-points">{{ item.points }}</div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SignOutButton from "@/components/SignOutButton.vue";
  import GoToFriendsLeaderboardButton from "@/components/GoToFriendsLeaderboard.vue";
  import GoToGlobalLeaderboardButton from "@/components/GoToGlobalLeaderboard.vue"


  export default {
    name: 'LeaderboardPage',
    data() {
      return {
        selectedTimeframe: 'all',
        leaderboardItems: [
        { username: 'Josh123', points: 1793, medal: '🥇'},
        { username: 'johnappleseed', points: 1574, medal: '🥈'},
        { username: 'YourUsername (You)', points: 1502, medal: '🥉', showButton: false},
        { username: 'studying567', points: 1421, medal: '4', showButton: true},
        ]
      };
    },
    methods: {
      toggleAdd(item, index) {
        this.leaderboardItems[index].added = !this.leaderboardItems[index].added;
      },
      changeTimeframe() {
        console.log(timeframe + ' leaderboard selected');
      }
    },
    components: {
        SignOutButton,
        GoToFriendsLeaderboardButton,
        GoToGlobalLeaderboardButton,
    },
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
}

.table-header {
  background-color: #000000;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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