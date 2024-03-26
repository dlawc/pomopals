<template>
    <div class="modal">
      <input v-model="username" placeholder="Enter friend's username" />
      <button @click="sendRequest">Send Request</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
      };
    },
    methods: {
      sendRequest() {
        // Implementation to send a friend request to the entered username
        // This could involve calling an API endpoint
        this.$emit('requestSent', this.username);
        this.username = ''; // Reset the input field
      },
    },
  };
  </script>
  