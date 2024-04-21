<template>
  <div class="stateBanner">
    <div id="studyBox">
      <span id="study">Study</span>
    </div>
    <div id="restBox">
      <span id="rest">Rest</span>
    </div>
  </div>
</template>

<script>
import { firebaseAuth, firestore, firebase } from "../firebase.js";

export default {
  name: "StateBanner",
  data() {
    return {};
  },
};
</script>

<style scoped>
#studyBox {
  box-sizing: border-box;
  position: absolute;
  width: 163px;
  height: 45px;
  left: 321px;
  top: 245px;
  background: #ffffff;
  border: 3px solid #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
}
#study {
  position: absolute;
  width: 79px;
  height: 41px;
  left: 363px;
  top: 248px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 41px;
  text-align: center;
  color: #3a0404;
}

#restBox {
  box-sizing: border-box;
  position: absolute;
  width: 163px;
  height: 45px;
  left: 321px;
  top: 245px;
  background: #ffffff;
  border: 3px solid #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
}
#rest {
  position: absolute;
  width: 79px;
  height: 41px;
  left: 363px;
  top: 248px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 41px;
  text-align: center;
  color: #3a0404;
}
</style>
