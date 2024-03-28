<!-- Placeholder for Home.vue -->

<template>
    <div>
      <h1>Welcome to Pomopals!</h1>
      <button @click="redirectToFriendsPage">Go to Friends Page</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToFriendsPage() {
        this.$router.push('/friends');
      }
    }
  }
  </script>
  