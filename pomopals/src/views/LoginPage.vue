<template>
  <div class="overlay">
    <div class="login-container">
      <div class="login-form">
        <h1>Sign In</h1>
        <p>Enter your email and password to sign in!</p>

        <button class="google-signin" @click="signInWithGoogle">
          Sign in with Google
        </button>
        <div class="divider">
          <span>or</span>
        </div>

        <form @submit.prevent="signIn">
          <form-field
            label="Email"
            fieldId="email"
            type="email"
            :value="credentials.email"
            @update:value="credentials.email = $event"
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
          <div class="forgot-password">
            <a href="#" @click="sendPasswordResetEmail">Forgot password?</a>
          </div>

          <button type="submit" class="sign-in-button">Sign In</button>
        </form>

        <div class="create-account">
          <p>
            Not registered yet?
            <router-link to="/signup">Create an Account</router-link>
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
  name: "SignInPage",
  data() {
    return {
      credentials: {
        email: "",
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

        // Check if user is new or hasn't verified their email
        if (
          user.metadata.creationTime === user.metadata.lastSignInTime ||
          !user.emailVerified
        ) {
          user
            .sendEmailVerification()
            .then(() => {
              console.log("Verification email sent.");
            })
            .catch((error) => {
              console.error("Error sending verification email:", error);
            });
        }

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
            // initialise home page data tracking
            xp: 0,
            currentSegment: 1,
            restDuration: 300,
            pomodoroDuration: 1500,
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
    async signIn() {
      this.errorMessage = "";
      try {
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.credentials.email,
            this.credentials.password
          );
        const user = userCredential.user;
        // Check if the user's email is not verified
        if (!user.emailVerified) {
          // Prevent login for any unverified email addresses, except the test account
          if (user.displayName !== "BT3103user") {
            this.errorMessage = "Please verify your email before signing in.";
            firebase.auth().signOut(); // Optionally sign out the user
            return;
          }
          
        }
        // Continue with the sign-in process
        console.log("Email has been verified, proceed with login.");
        this.$router.push("/home");
      } catch (error) {
        console.error(error);
        this.errorMessage = error.message;
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async sendPasswordResetEmail() {
      if (!this.credentials.email) {
        this.errorMessage =
          "Please enter your email address to reset your password.";
        return;
      }
      try {
        await firebase.auth().sendPasswordResetEmail(this.credentials.email);
        alert("Password reset email sent. Please check your inbox.");
        this.errorMessage = "";
      } catch (error) {
        console.error("Error sending password reset email:", error);
        this.errorMessage = error.message;
      }
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

.forgot-password {
  text-align: right;
  margin-bottom: 20px;
  font-size: 0.9em;
}

.forgot-password a {
  color: #ae76a1;
  text-decoration: none;
}

.sign-in-button {
  background-color: #ae76a1;
  color: #fff;
  padding: 15px 15px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  width: 100%;
}

.sign-in-button:hover {
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
