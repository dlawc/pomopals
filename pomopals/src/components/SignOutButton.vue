<template>
    <button class="button" @click="signOut">Sign Out</button>
</template>

<script>
export default {
  methods: {
    signOut() {

    }
  }
};
</script>

<style scoped>

.button {
  background-color: black;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>