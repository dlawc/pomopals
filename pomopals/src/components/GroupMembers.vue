<template>
    <div class="group-session">
      <div class="group-code">Group session code: {{ sessionCode }}</div>
      <div class="members">
        <span class="member-initial" v-for="initial in memberInitials" :key="initial">{{ initial }}</span>
        <!-- Use a button or icon to represent the action to join or view the session -->
        <button>➡️</button>
      </div>
    </div>
  </template>
  
  <script>
  import { firebaseAuth, firestore } from "../firebase.js";
  import { doc, getDoc } from 'firebase/firestore';
  
  export default {
    name: 'GroupMembers',
    props: {
      sessionCode: String
    },
    data() {
      return {
        members: []
      };
    },
    computed: {
      memberInitials() {
        return this.members.map(username => username.split(' ').map(name => name[0].toUpperCase()).join(''));
      }
    },
    methods: {
      async fetchMembers() {
        const docRef = doc(db, 'groupSession', this.sessionCode);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          this.members = docSnap.data().members;
        } else {
          console.log('No such document!');
        }
      }
    },
    mounted() {
      this.fetchMembers();
    }
  };
  </script>
  
  <style scoped>
  .group-session {
    /* Your CSS styling */
  }
  
  .member-initial {
    /* Your CSS styling */
  }
  </style>
  