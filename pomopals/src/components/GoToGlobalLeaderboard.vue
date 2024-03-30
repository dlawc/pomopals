<template>
    <button @click="redirectToGlobalPage">Global Leaderboard</button>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToGlobalPage() {
        this.$router.push('/leaderboard');
      },
    },
  };
  </script>
  
  <style scoped>
  .tab-button {
    background-color: transparent;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    margin-right: 0.5rem;
  }
  
  .active-tab {
    color: #FFD700; /* Gold color for the active tab */
    border-bottom: 2px solid #FFD700; /* Underline effect for the active tab */
  }
  </style>
  