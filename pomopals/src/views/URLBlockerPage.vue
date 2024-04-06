<template>
    <div class="signout">
        <SignOutButton />
      </div>
    <div class = navbar>
        <NavBar/>
    </div>
    
    <div class = center>
        <h2>Block sites <u>distracting</u> you:</h2>
        <div id = form> 
            <input type = "text" v-model = "url" required = "true" placeholder = "Enter URL of website here"> 
            <button id = "save" type = "button" @click="saveurl()">Save</button>
        </div>
        <h1>My Blocklist</h1>
        <table id = urls>
            <tr>
                <td></td>
            </tr>
        </table>
    </div>
</template>
<script>
import firebase from "@/firebase";
import NavBar from "@/components/NavBar.vue"
import SignOutButton from "@/components/SignOutButton.vue"
import URLDisplay from "@/components/URLDisplay.vue"

export default {
    name: "URLBlocker", 
    components: {
        NavBar, 
        SignOutButton, 
        URLDisplay
    }, 
    data() {
        return {
            url: ''
        }
    }, 
    methods: {
        saveurl() {
            const db = firebase.firestore(); 
            const username = firebase.auth().currentUser.displayName;
            const userRef = db.collection("users").doc(username);
            userRef.get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const existingUrlBlocklist = data.urlblocklist || [];
                    // Append the new URL to the existing list
                    const updatedUrlBlocklist = [...existingUrlBlocklist, this.url.trim()];
                    // Update the user document with the updated urlblocklist
                    userRef.update({ urlblocklist: updatedUrlBlocklist });
                } else {
                    console.log("No such document!");
                }
            }).catch(error => {
                console.log("Error getting document:", error);
            });
        }
    }
}
</script>
<style>
    h1{
        text-align: center;
        color: white;
        font-size: 60px;
    }
    h2{
        text-align: center;
        color: white;
    }
    #form {
        text-align: center;
        display: flex;
    }
    input {
        padding: 5px 10px; 
        width: 100%; 
    }
</style>