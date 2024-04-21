<template>
  <div class="overlay">
    <div class="login-container">
      <div class="login-form">
        <h1>Sign Up</h1>
        <p>Enter your email and password to sign up!</p>

        <button class="google-signin" @click="signInWithGoogle">
          Sign up with Google
        </button>
        <div class="divider">
          <span>or</span>
        </div>

        <form @submit.prevent="signUp">
          <form-field
            label="Email"
            fieldId="email"
            type="email"
            :value="credentials.email"
            @update:value="credentials.email = $event"
          />
          <form-field
            label="Username"
            fieldId="username"
            type="username"
            :value="credentials.username"
            @update:value="credentials.username = $event"
          />
          <form-field
            label="Password"
            fieldId="password"
            :value="credentials.password"
            :isPassword="true"
            @update:value="credentials.password = $event"
          />
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <div class="white-rectangle"></div>
          <button type="submit" class="sign-up-button">Sign Up</button>
        </form>
        <div class="create-account">
          <p>
            Already have an account?
            <router-link to="/login">Sign in here.</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormField from "@/components/FormField.vue";
import firebase from "@/firebase";
export default {
  name: "SignUpPage",
  data() {
    return {
      credentials: {
        email: "",
        username: "",
        password: "",
      },
      passwordVisible: false,
      errorMessage: "",
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        const usersRef = firebase.firestore().collection("users");
        const query = usersRef.where("email", "==", user.email);
        const querySnapshot = await query.get();

        if (querySnapshot.empty) {
          // No matching user document found, prompt for a username.
          let username = null;
          let usernameExists = false;
          do {
            username = prompt("Please enter your desired username:");
            if (!username) {
              alert("Username is required to proceed.");
              continue;
            }
            // Check for spaces in username
            if (/\s/.test(username)) {
              alert("Username must not contain spaces. Please try again.");
              continue;
            }
            // Check if the username already exists
            const doc = await firebase
              .firestore()
              .collection("users")
              .doc(username)
              .get();
            usernameExists = doc.exists;
            if (usernameExists) {
              alert("Username already taken, please try another one.");
            }
          } while (!username || usernameExists || /\s/.test(username));

          // Update user's profile with the username
          await user.updateProfile({
            displayName: username,
          });

          await firebase.firestore().collection("users").doc(username).set({
            email: user.email,
            friends: {},
            urlblocklist: [],
          });
          this.$router.push("/home");
        } else {
          this.$router.push("/home");
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
        this.errorMessage = error.message;
      }
    },
    async signUp() {
      this.errorMessage = "";
      if (/\s/.test(this.credentials.username)) {
        this.errorMessage = "Username must not contain spaces.";
        return; // Exit the function if validation fails
      }
      try {
        const usernameExists = await firebase
          .firestore()
          .collection("users")
          .doc(this.credentials.username)
          .get();

        if (usernameExists.exists) {
          throw new Error("Username already taken");
        }
        // Create a new user with email and password
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.credentials.email,
            this.credentials.password
          );
        const user = userCredential.user;

        await user.updateProfile({
          displayName: this.credentials.username,
        });

        // Store user information in Firestore under 'users' collection with username as document ID
        await firebase
          .firestore()
          .collection("users")
          .doc(this.credentials.username)
          .set({
            email: this.credentials.email,
            friends: {},
            urlblocklist: [], 
            // Include any other user information here
          });
        console.log(
          "User created and signed in with username:",
          this.credentials.username
        );
        this.$router.push("/verifyemail");
      } catch (error) {
        console.error("Error signing up:", error);
        this.errorMessage = error.message;
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
  computed: {
    passwordFieldType() {
      return this.passwordVisible ? "text" : "password";
    },
  },
  components: {
    "form-field": FormField,
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.login-container {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 450px;
  background: #ffffff;
  font-family: "DM Sans", sans-serif;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.login-form {
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;
}

.login-form h1,
.login-form p {
  text-align: left;
  color: #2b3674;
  font-family: "DM Sans", sans-serif;
}
.login-form h1 {
  margin-bottom: 10px;
}

.login-form p {
  font-size: 0.9em;
  margin-bottom: 20px;
  width: 100%;
}

.google-signin {
  background-color: #f4f7fe;
  color: #2b3674;
  padding: 10px 15px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 16px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
  margin: 10px;
}

.divider span {
  white-space: nowrap;
}

.sign-up-button {
  background-color: #ae76a1;
  color: #fff;
  padding: 15px 15px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  width: 100%;
}

.sign-up-button:hover {
  background-color: #9c6891;
}

.create-account {
  text-align: left;
  margin-top: 10px;
}

.create-account a {
  color: #ae76a1;
  text-decoration: none;
}

.create-account a:hover {
  color: #9c6891;
}

.white-rectangle {
  height: 20px;
  background-color: #ffffff;
}

.error-message {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 4px;
  background-color: #ffdddd;
  border: 1px solid #ffcccc;
  color: #d8000c;
  text-align: center;
  font-family: "Arial", sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}
</style>
