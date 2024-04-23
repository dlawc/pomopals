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
    .bwt{
        background-color:crimson; 
        color: white; 
        border: none;
        cursor: pointer;
        border-radius: 40px;
        padding: 5px 10px;
    }
    .bwt:hover {
        background-color: brown;
    }
    #form {
        text-align: center;
        display: flex;
    }
    input {
        padding: 5px 10px; 
        width: 100%; 
        border-radius: 50px;
        border-color: white;
    }
</style>
<template>
    <h2>Block sites <u>distracting</u> you:</h2>
    <div id = form> 
        <input type = "text" v-model = "url" required = "true" 
            placeholder = "Please enter URL of the website here" @keydown.enter="saveurl()"> 
        <!--<button id = "save" type = "button" @click="saveurl()">Save</button>-->
    </div>
    <h1>My Blocklist</h1>
    <table id = urls>
    </table>
</template>
<script>
import firebase from "@/firebase";
export default {
    data() {
        return {
            url: '', 
            currentUser: null, 
        }
    }, 
    watch : {
        currentUser : {
        handler(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.display();
            }
        },
        }
    }, 
    async mounted() {
        this.display();
        this.isLoading = true;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.currentUser = user;
                this.fetchLeaderboard();
            } else {
                this.currentUser = null;
                this.isLoading = false;
            }
        });
    }, 
    methods: {
        async display() {
            const db = firebase.firestore();
            const username = firebase.auth().currentUser.displayName;
            const userRef = db.collection("users").doc(username);

            try {
                const doc = await userRef.get();
                if (doc.exists) {
                    const urlBlocklist = doc.data().urlblocklist;
                    const table = document.getElementById("urls");

                    table.innerHTML = "";

                    urlBlocklist.forEach((url) => {
                        const newRow = table.insertRow();

                        const urlCell = newRow.insertCell();
                        urlCell.className = "urlcell";
                        urlCell.textContent = url;
                        urlCell.style.color = "white";
                        urlCell.style.fontWeight = "bold";

                        const deleteButton = document.createElement("button");
                        const deleteCell = newRow.insertCell(); 
                        deleteCell.style.textAlign = "right";
                        deleteCell.style.width = "100%";

                        deleteButton.className = "bwt";
                        deleteButton.textContent = "Delete";
                        deleteButton.onclick = () => {
                            this.deleteUrl(url);
                        };
                        deleteCell.appendChild(deleteButton);
                    });
                } else {
                    console.log("No such URLs!");
                }
            } catch (error) {
                console.error("Error getting user:", error);
            }
        },
        async deleteUrl(url) {
            const db = firebase.firestore();
            const username = firebase.auth().currentUser.displayName;
            const userRef = db.collection("users").doc(username);

            try {
                const doc = await userRef.get();
                if (doc.exists) {
                    let urlBlocklist = doc.data().urlblocklist;
                    const indexToDelete = urlBlocklist.indexOf(url);
                    if (indexToDelete !== -1) {
                        urlBlocklist.splice(indexToDelete, 1);
                        await userRef.update({ urlblocklist: urlBlocklist });
                        console.log("URL deleted successfully!");

                    } else {
                        console.log("URL not found in the blocklist.");
                    }
                } else {
                    console.log("No such user!");
                }
            } catch (error) {
                console.error("Error updating URLBlockList:", error);
            }
            await this.display(); 
        }, 
        async saveurl() {
            const db = firebase.firestore(); 
            const username = firebase.auth().currentUser.displayName;
            const userRef = db.collection("users").doc(username);
            userRef.get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const existingUrlBlocklist = data.urlblocklist || [];

                    if (existingUrlBlocklist.includes(this.url.trim())) {
                        alert("This URL has already been blocked.");
                        return; 
                    }

                    const updatedUrlBlocklist = [...existingUrlBlocklist, this.url.trim()];
                    userRef.update({ urlblocklist: updatedUrlBlocklist }).then(async () => {
                        console.log("URL added successfully!");
                        this.url = '';
                        await this.display()
                    }).catch(error => {
                        console.error("Error updating blocklist:", error);
                    });
                } else {
                    console.log("No such user!");
                }
            }).catch(error => {
                console.log("Error getting user:", error);
            });
        }
    }
};
</script>