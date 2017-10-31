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
        <v-card v-if="!isUserLoggedIn" class="accent-tertiary">
          <v-card-actions style="margin: 16px; text-align: center">
            <v-layout column>
              <v-form lazyValidation @submit.stop.prevent="login">
                <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
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
      login(event) {
        Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          // Login was successful
          this.showMenu = false;
          this.isUserLoggedIn = true;
        })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              // TODO: Replace with snackbar or error text
              alert('Wrong password.');
            } else {
              // TODO: Replace with snackbar or error text
              alert(errorMessage);
            }
            console.log(error);
          });
        },
      logout(event) {
        Firebase.auth().signOut().then((result) => {
          this.showMenu = false;
          this.isUserLoggedIn = false;
        }, function(error) {
          // TODO
        });
      },
      googleSignin(event) {
        const provider = new Firebase.auth.GoogleAuthProvider();
        Firebase.auth().signInWithPopup(provider).then((result) => {
          const token = result.credential.accessToken;
          const user = result.user;
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
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