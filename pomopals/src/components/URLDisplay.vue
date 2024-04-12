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
    .bwt{
        background-color: red;
        color: white; 
        border: none;
    }
</style>
<script>
import firebase from "@/firebase";
export default {
    async mounted() {
        this.display();  
    }, 
    Name: "Blocklist", 
    methods: {
        async display() { 
            //let index = 1; 
            const db = firebase.firestore(); 
            const username = firebase.auth().currentUser.displayName;
            const userRef = db.collection("users").doc(username);
            userRef.get().then((doc) => {
                if (doc.exists) {
                    // Document exists, retrieve the urlblocklist array
                    const urlBlocklist = doc.data().urlblocklist;

                    // Reference to the table
                    const table = document.getElementById('urls');

                    // Loop through the urlblocklist array and add each URL to the table
                    urlBlocklist.forEach((url) => {
                        // Create a new row
                        const newRow = table.insertRow();

                        // Create a cell for the URL and add it to the row
                        const urlCell = newRow.insertCell();
                        urlCell.classname = "urlcell"
                        urlCell.textContent = url;
                        urlCell.style.color = "white";
                        urlCell.style.fontWeight = "bold";

                        let deleteButton = document.createElement("button") 
                        deleteButton.id = String(url)
                        deleteButton.className = "bwt"
                        deleteButton.innerHTML = "Delete"
                        urlCell.appendChild(deleteButton)
                        deleteButton.onclick = function() {
                            deleteUrl(url)
                        }
                    });
                } else {
                // Document does not exist
                console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }, 
        async deleteUrl(url) {
            const db = firebase.firestore(); 
            const username = firebase.auth().currentUser.displayName;
            const userRef = db.collection("users").doc(username); 
            userRef.get().then((doc) => {
                if (doc.exists) {
                    // Document exists, retrieve the urlblocklist array
                    const urlBlocklist = doc.data().urlblocklist;

                    // Find the index of the URL to delete in the urlblocklist array
                    const indexToDelete = urlBlocklist.indexOf(urlToDelete);

                    if (indexToDelete !== -1) {
                        // Remove the URL from the urlblocklist array
                        urlBlocklist.splice(indexToDelete, 1);

                        // Update the document with the modified urlblocklist array
                        userRef.update({ urlblocklist: urlBlocklist }).then(() => {
                            console.log("URL deleted successfully!");
                        }).catch((error) => {
                            console.error("Error updating document:", error);
                        });
                    } else {
                        console.log("URL not found in the blocklist.");
                    }
                } else {
                    // Document does not exist
                 console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }
}
</script>