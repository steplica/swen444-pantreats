<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <router-link to="/"><v-toolbar-title class="white--text">Pantreats</v-toolbar-title></router-link>
      <v-spacer></v-spacer>

      <v-menu open-on-hover bottom offset-y v-model="showMenu" :offset-overflow="true" :close-on-content-click="false">
        <v-btn v-if="!isUserLoggedIn" flat slot="activator">Log in / Register</v-btn>
        <v-btn flat v-if="isUserLoggedIn" slot="activator">
          <v-icon large left>account_circle</v-icon>My Account<v-icon>arrow_drop_down</v-icon>
        </v-btn>

        <!-- Login form -->
        <v-card v-if="!isUserLoggedIn" style="width: 300px;" class="accent-tertiary">
          <v-alert :color="errorMessage ? 'error' : 'warning'" :icon="errorMessage ? 'warning' : 'priority_high'"
                   :value="errorMessage || warnMessage">
            {{errorMessage ? errorMessage : warnMessage}}
          </v-alert>
          <v-card-actions style="margin: 16px; text-align: center">
            <v-layout column>
              <!-- TODO: Replace native validation with custom validation if it proves to be an issue during user testing -->
              <v-form lazy-validation @submit.stop.prevent="login">
                <v-text-field @input="errorMessage = false; warnMessage = false;" v-model="email" label="Email" type="email" required></v-text-field>
                <v-text-field @input="errorMessage = false; warnMessage = false;" v-model="password" label="Password" type="password" required></v-text-field>
                <v-btn block class="btn-dropdown" type="submit" color="primary">Log in</v-btn>
                <v-btn block class="btn-dropdown" @click.native="googleSignin"><img id="img-google-logo"
                            src="/static/google-favicon-vector.png"/>Sign in with Google</v-btn>
              </v-form>
              <span>Don't have an account? <router-link to="register" class="primary--text" @click.native="showMenu = false">Register.</router-link></span>
            </v-layout>
          </v-card-actions>
        </v-card>

        <!-- Settings -->
        <v-card v-if="isUserLoggedIn" class="accent-tertiary">
            <v-list class="accent-tertiary">
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon >settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile @click="logout">
                <v-list-tile-action>
                  <v-icon >power_settings_new</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Log out</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
        </v-card>

      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
  import Firebase from 'firebase';
  import VCardMedia from "vuetify/src/components/VCard/VCardMedia";
  import VIcon from "vuetify/src/components/VIcon/VIcon";
  import VForm from "vuetify/src/components/VForm/VForm";
  import VList from "vuetify/src/components/VList/VList";
  import VDivider from "vuetify/es5/components/VDivider/VDivider";

  export default {
    name: 'MainNav',
    components: {
      VDivider,
      VList,
      VForm,
      VIcon,
      VCardMedia
    },
    data() {
      return {
        showMenu: undefined,
        isUserLoggedIn: undefined,

        // Login form
        email: undefined,
        password: undefined,
        errorMessage: undefined,
        warnMessage: undefined
      }
    },
    // TODO: The unauthenticated view is briefly visible on refresh; how can we avoid this?
    mounted: function() {
      Firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.isUserLoggedIn = true;
        }
      })
    },
    methods: {
      hideAndClearMenu() {
        this.showMenu = false;
        this.errorMessage = undefined;
        this.warnMessage = undefined;
        this.email = undefined;
        this.password = undefined;
      },
      login(event) {
        Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          // Login was successful
          hideAndClearMenu();
          this.isUserLoggedIn = true;
        })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            switch(errorCode) {
              case 'auth/wrong-password':
                this.errorMessage = 'Incorrect password.';
                this.password = undefined;
                break;
              case 'auth/user-not-found':
                this.errorMessage = 'No user was found with that email address.';
                this.email = undefined;
                break;
              case 'auth/invalid-email':
                this.errorMessage = 'Please check that your email is correct.';
                break;
              case 'auth/user-disabled':
                this.errorMessage = 'Your account has been disabled. Please contact support for assistance.';
                break;
              default:
                this.errorMessage = 'Something went wrong on our end. Please contact support for assistance.'; // This should never happen
            }
            console.log(error);
          });
        },
      logout(event) {
        Firebase.auth().signOut().then((result) => {
          hideAndClearMenu();
          this.isUserLoggedIn = false;
        }, function(error) {

        });
      },
      googleSignin(event) {
        const provider = new Firebase.auth.GoogleAuthProvider();
        Firebase.auth().signInWithPopup(provider).then((result) => {
          hideAndClearMenu();
          this.isUserLoggedIn = true;
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          switch (errorCode) {
            case 'auth/account-exists-with-different-credential':
              // TODO: We *should* link the two accounts but it's pretty much irrelevant for this assignment:
              // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup
              this.errorMessage = 'Please sign in with the method you used to create your account.';
              break;
            case 'auth/cancelled-popup-request':
              this.warnMessage = 'Please only open one popup at a time.';
              break;
            case 'auth/popup-blocked':
              this.errorMessage = 'Your browser blocked the login dialog.';
              break;
            case 'auth/popup-closed-by-user':
              this.warnMessage = 'The popup was closed before you could be authenticated. Please try again.';
              break;
            default: // i.e. errors the user can't fix
              this.errorMessage = 'Something went wrong on our end. Please contact support for assistance.';
          }
          console.log(error);
        });
      },
      routeRegister(event) {
        this.$router.push('/register');
      },
    },
    firebase () {
      return {};
    }
  }
</script>

<style scoped>
  #img-google-logo {
    height: 24px;
    width: 24px;
    margin-right: 8px;
  }
  .btn-dropdown {
    margin-bottom: 16px;
  }
</style>
