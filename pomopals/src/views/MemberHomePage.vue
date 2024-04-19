<script>
import Timer from "/src/components/Timer.vue";

export default {
  name: "MemberHomePage",
  components: {Timer},
  methods: {},
};
</script>

<template>
  <div class="home">
    <div><Timer :isHost="false"/></div>
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
