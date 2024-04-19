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
            :class="{ 'highlighted': item.username === 'YourUsername (You)' }">
            <div class="item-rank">
              <span class="rank-medal">{{ item.medal }}</span>
            </div>
            <div class="item-username">{{ item.username }}</div>
            <div class="item-button">
              <button v-if="item.showButton" class="add-friend-btn" :class="{ 'add-friend-btn': true, added: item.friendStatus === 'added', pending: item.friendStatus === 'pending' }" @click="toggleAdd(item)">
                {{ item.friendStatus === 'none' ? '+ Add Friend' : item.friendStatus === 'pending' ? 'Pending...' : 'Added!' }}
              </button>
            </div>
            <div class="item-points">{{ item.points }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SignOutButton from "@/components/SignOutButton.vue";
  import NavBar from "@/components/NavBar.vue"

  export default {
    name: 'LeaderboardPage',
    data() {
      return {
        selectedTimeframe: 'all',
        leaderboardItems: [
        { username: 'Josh123', points: 1793, medal: '🥇', showButton: true, friendStatus: 'added' },
        { username: 'elli065', points: 1652, medal: '🥈', showButton: true, friendStatus: 'none' },
        { username: 'johnappleseed', points: 1574, medal: '🥉', showButton: true, friendStatus: 'added' },
        { username: 'YourUsername (You)', points: 1502, medal: '4', showButton: false, friendStatus: 'none' },
        { username: 'imthebest01', points: 1496, medal: '5', showButton: true, friendStatus: 'none' },
        { username: 'tricia!', points: 1493, medal: '6', showButton: true, friendStatus: 'none' },
        { username: 'studying567', points: 1421, medal: '7', showButton: true, friendStatus: 'added' },
        { username: 'eddie', points: 1400, medal: '8', showButton: true, friendStatus: 'pending' },
        { username: 'ilove2study462', points: 1357, medal: '9', showButton: true, friendStatus: 'none' },
        { username: 'penelope', points: 1244, medal: '10', showButton: true, friendStatus: 'pending' }
        ],
        currentLeaderboard: 'global'
      };
    },
    methods: {
      toggleAdd(item) {
        switch (item.friendStatus) {
          case 'none':
            item.friendStatus = 'pending';
            break;
          case 'pending':
            item.friendStatus = 'added';
            break;
          case 'added':
            item.friendStatus = 'none';
            break;
        }
      },
      changeTimeframe() {
        console.log(timeframe + ' leaderboard selected');
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
        SignOutButton,
        NavBar, 
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
  display: flex;
  flex-direction: column;
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