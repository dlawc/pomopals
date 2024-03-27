<script>
import Timer from "/src/components/Timer.vue";
import XpBar from "/src/components/XpBar.vue";

export default {
  name: "Home",
  components: { XpBar, Timer },
};
</script>

<template>
  <div class="home">
    <div><XpBar /></div>
    <div><Timer /></div>
  </div>
</template>

<style scoped></style>
