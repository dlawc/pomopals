<script>
import Timer from "/src/components/Timer.vue";
import XpBar from "/src/components/XpBar.vue";

export default {
  name: "HomePage",
  components: { XpBar, Timer },
  methods: {
    redirectToFriendsPage() {
      this.$router.push("/friends");
    },
    redirectToLeaderboardPage() {
      this.$router.push("/leaderboard");
    },
  },
};
</script>

<template>
  <div class="home">
    <div><XpBar /></div>
    <div><Timer /></div>
    <button id="friendsButton" @click="redirectToFriendsPage">
      Go to Friends Page
    </button>
    <button id="leaderboardButton" @click="redirectToLeaderboardPage">
      Go to Leaderboard Page
    </button>
  </div>
</template>

<style scoped>
#friendsButton,
#leaderboardButton {
  position: absolute;
  right: 10px;
}

#friendsButton {
  top: 19%;
  transform: translateY(-100%);
}

#leaderboardButton {
  top: 19%;
}
</style>
