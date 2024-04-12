<template>
    <h1>My Blocklist</h1>
    <table id = urls>
    </table>
</template>
<style>
    h1{
        text-align: center;
        color: white;
        font-size: 60px;
    }
</style>
<script>
import firebase from "@/firebase";
//import { toDisplayString } from "vue"; //where did this come from...
export default {
    Name: "Blocklist", 
    methods: {
        async display() { 
            let index = 1; 
            const db = firebase.firestore(); 
            let allDocuments = await getDocs(collection(db, "urls"));
        }
    }
}
</script>