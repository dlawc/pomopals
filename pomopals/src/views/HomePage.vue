<!-- Placeholder for Home.vue -->

<template>
    <div>
      <div class = "navbar">
        <NavBar :homeview="true"/>
      </div>
      <h1>Welcome to Pomopals!</h1>
      <button @click="redirectToFriendsPage">Go to Friends Page</button>
      <button @click="redirectToLeaderboardPage">Go to Leaderboard Page</button>
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/NavBar.vue"

  export default {
    methods: {
      redirectToFriendsPage() {
        this.$router.push('/friends');
      },
      redirectToLeaderboardPage() {
        this.$router.push('/leaderboard');
      }
    }, 
    components: {
      NavBar, 
    }, 
  }
  </script>
  