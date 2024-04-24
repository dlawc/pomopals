<template>
  <div class="overlay">
    <div class = "toggle">
      <ToggleURL/>
    </div>
    <div class="home">
      <div v-show="buttonText == 'Start!'">
        <SignOutButton class="signout" />
      </div>
      <div v-show="buttonText == 'Start!'"><NavBar /></div>
      <div><XpBar /></div>

      <div>
        <Timer
          :sessionCode="sessionCode"
          @clickOnButtonEvent="updateButtonText"
          :isHost="true"
        />
      </div>
      <div v-show="buttonText == 'Start!'"><SessionCode @generatedSessionCode="storeSessionCode" /></div>
    </div>
  </div>
</template>

<script>
import Timer from "/src/components/Timer.vue";
import XpBar from "/src/components/XpBar.vue";
import NavBar from "@/components/NavBar.vue";
import SessionCode from "/src/components/SessionCode.vue";
import SignOutButton from "@/components/SignOutButton.vue";
import ToggleURL from "@/components/ToggleURL.vue"

export default {
  name: "HomePage",
  components: { SignOutButton, XpBar, Timer, NavBar, SessionCode, ToggleURL},

  data() {
    return {
      buttonText: "Start!",
      sessionCode: "",
    };
  },
  methods: {
    updateButtonText(data) {
      console.log("home page received buttonText from Timer:", this.buttonText);
      this.buttonText = data;
    },
    storeSessionCode(sessionCode) {
      this.sessionCode = sessionCode;
      console.log("home page received session code:", this.sessionCode);
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
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

#groupStudy {
  color: black;
  font-size: 500px;
}

.signout {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
}
.toggle {
    position: absolute; 
    bottom: 10px; 
    left: 30px; 
    padding: 10px; 
}
</style>
