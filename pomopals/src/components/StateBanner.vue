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
  position: relative; /* This is key for absolutely positioned children */
  display: flex; /* Makes stateBanner a flex container */
  justify-content: center; /* Horizontally centers the children */
  align-items: center; /* Vertically centers the children */
  width: 100%; /* Adjust this as needed, maybe a fixed width */
  height: 100%;
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
  left: calc(50% - 246px); /* Shifts left from the center */
}

#restBox {
  left: calc(50% + 83px); /* Shifts right from the center */
}

#study,
#rest {
  position: absolute;
  width: 79px;
  height: 41px;
  left: 42px; /* Centered within their respective boxes */
  top: 2px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 41px;
  text-align: center;
  color: #3a0404;
}
</style>
