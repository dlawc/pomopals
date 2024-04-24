<style>
h1 {
  text-align: center;
  color: white;
  font-size: 50px;
  margin-top: 20px;
  margin-bottom: 1px;
  text-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 100);
}
.bwt {
  background-color: #c20606;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 40px;
  padding: 5px 10px;
}
.bwt:hover {
  background-color: #960c0c;
}

#input-container {
  text-align: center;
  margin-top: 20px;
}

.url-input {
  padding: 20px 15px;
  border-radius: 50px;
  width: 28em;
  border: 2px solid white;
  font-size: 17px;
  color: #333;
  text-align: center;
}

.url-input:focus {
  outline: none;
  border-color: rgb(3, 110, 217);
}

#urls td {
  padding: 5px 10px;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
  vertical-align: middle;
  text-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 100);
}

#urls .urlcell {
  width: 100%; /* Ensures URL cells use full width */
}

#urls .deleteCell {
  visibility: hidden; /* Hide the cell initially */
  width: 0; /* No initial width */
  transition: width 0.3s ease; /* Smooth transition for width */
}

#urls tr:hover .deleteCell {
  visibility: visible; /* Make cell visible on hover */
  width: 100px; /* Assign width that will fit the delete button */
}

#urls .invisibleCell {
  visibility: hidden;
    width: 100px;
}


</style>
<template>
  <!-- <div id="input-container"> -->
    <input
      type="text"
      v-model="url"
      required="true"
      placeholder="Please enter the URL of the website you wish to block"
      @keydown.enter="saveurl"
      class="url-input"
    />
  <!-- </div> -->
  <h1>My Blocklist</h1>
  <table id="urls"></table>
</template>
<script>
import firebase from "@/firebase";
export default {
  data() {
    return {
      url: "",
      currentUser: null,
    };
  },
  watch: {
    currentUser: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.display();
        }
      },
    },
  },
  async mounted() {
    this.display();
    this.isLoading = true;
    firebase.auth().onAuthStateChanged((user) => {
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

            const invisibleButton = document.createElement("button");
            invisibleButton.className = "dwt";
            invisibleButton.textContent = "Delete";

            const invisibleCell = newRow.insertCell();
            invisibleCell.className = "invisibleCell";
            invisibleCell.appendChild(invisibleButton);

            const urlCell = newRow.insertCell();
            urlCell.className = "urlcell";
            urlCell.textContent = url;

            const deleteButton = document.createElement("button");
            deleteButton.className = "bwt";
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => {
              this.deleteUrl(url);
            };

            const deleteCell = newRow.insertCell();
            deleteCell.className = "deleteCell"; 
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
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const existingUrlBlocklist = data.urlblocklist || [];

            if (existingUrlBlocklist.includes(this.url.trim())) {
              alert("This URL has already been blocked.");
              return;
            }

            const updatedUrlBlocklist = [
              ...existingUrlBlocklist,
              this.url.trim(),
            ];
            userRef
              .update({ urlblocklist: updatedUrlBlocklist })
              .then(async () => {
                console.log("URL added successfully!");
                this.url = "";
                await this.display();
              })
              .catch((error) => {
                console.error("Error updating blocklist:", error);
              });
          } else {
            console.log("No such user!");
          }
        })
        .catch((error) => {
          console.log("Error getting user:", error);
        });
    },
  },
};
</script>
