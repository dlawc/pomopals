<script>
export default {
  name: "XpBar",
  components: {},
};
</script>

<template>
  <div class="xpBar">
    <div id="currentXP">Current XP</div>
    <div id="totalXP">Total XP</div>
  </div>
</template>

<style scoped>
.xpBar {
  display: flex; /* Use Flexbox */
  justify-content: space-around; /* Distribute space around items */
  align-items: center; /* Align items vertically in the center */
}

#currentXP,
#totalXP {
  transform: translateY(125px);
  width: 100px; /* Smaller width */
  height: 34px; /* Smaller height */
  background: white;
  border-radius: 10px; /* Adjusted border radius */
  font-size: 18px; /* Smaller font size */
  border: none;
  text-align: center;
}
</style>
