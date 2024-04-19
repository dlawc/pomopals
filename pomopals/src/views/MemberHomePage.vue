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
  position: relative;
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
<!-- <script>

import Timer from "/src/components/Timer.vue";

export default {
  name: "MemberHomePage",
  components: {Timer},
  data() {
    return {
      sessionCode: "",
      members: [],
    };
  },
  created() {
    // Set the sessionCode based on the router query parameter
    this.sessionCode = this.$route.query.sessionCode;
    this.fetchSessionDetails();
    console.log("Received session code:", this.sessionCode);
  },

  methods: {},
};
</script>

<template>
  <div class="home">
    <div><Timer :isHost="false"/></div>
    <div id="groupMembers">
        <div
          v-for="(member, index) in members"
          :key="index"
          class="member-badge"
        >
          {{ member }}
        </div>
      </div>
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
</style> -->
