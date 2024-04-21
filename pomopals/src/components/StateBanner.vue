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
export default {
  name: "StateBanner",
};
</script>

<style scoped>
.stateBanner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transform: translateY(35px);
}

#studyBox,
#restBox {
  box-sizing: border-box;
  position: absolute;
  width: 163px;
  height: 45px;
  background: #ffffff;
  border: 3px solid #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
}

#studyBox {
  left: calc(50% - 216px);
}

#restBox {
  left: calc(50% + 53px);
}

#study,
#rest {
  position: absolute;
  width: 79px;
  height: 41px;
  left: 42px;
  top: 2px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 35px;
  text-align: center;
  color: #3a0404;
}
</style>
