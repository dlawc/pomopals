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
            <input type = "text" id = "url" required = "true" placeholder = "Enter URL of website here"> 
            <button id = "save" type = "button" onclick="saveurl()">Save</button>
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
    methods: {
        saveurl() {
            const db = firebase.firestore(); 
            const username = this.username; 
            let url = document.getElementById("save").value

            //const batch = db.batch();
            const currentUserRef = db.collection("users").doc(username);

            try{
                const urlRef = db.collection("urls").doc(url); //check if this saves to username.. smthg seems missing
                document.getElementById("url").reset(); 
                this.$emit("added") //took from cpp idk
            }
            catch(error){
                console.error("Error adding document: ", error); 
            }

            
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