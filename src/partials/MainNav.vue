<template>
  <div>
    <!-- TODO: Move this into a separate Pantry component -->
    <v-navigation-drawer v-model="showDrawer" width="500" :temporary="!showDeleteModal" :persistent="showDeleteModal" class="secondary">
      <v-toolbar flat dark color="primary">
        <v-toolbar-title class="white--text">Pantry</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn left flat @click.stop="showDrawer = false"><v-icon>close</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- Search bar -->
      <v-toolbar v-if="!pantryEditMode" dense flat color="white">
        <v-select solo class="white" style="margin: 0 auto;" prepend-icon="search" placeholder="Add ingredients..."
                  single-line hide-details multiple max-height="auto" autocomplete
                  v-bind:items="ingredients" v-model="ingredientsToAdd"
                  item-text="name" item-value="name">
          <template slot="item" scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
      </v-toolbar>

      <div>
        <v-toolbar dense flat color="accent-secondary">
          <span class="primary--text subheading"><b>My Ingredients</b></span>
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="pantryEditMode">
            <v-btn flat @click="pantryEditMode = false">Cancel</v-btn>
          </v-toolbar-items>
          <v-btn v-if="!pantryEditMode" icon flat @click="pantryEditMode = true"><v-icon>edit</v-icon></v-btn>
          <v-btn v-else icon flat @click="selectAllPantryItems()"><v-icon>select_all</v-icon></v-btn>
        </v-toolbar>
        <v-list dense class="secondary">
          <template v-for="(ingredient, index) in pantry">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ingredient}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-menu left v-if="!pantryEditMode">
                  <v-btn icon slot="activator"><v-icon>more_vert</v-icon></v-btn>
                  <v-list dense>
                    <v-list-tile avatar @click="pantry.splice(index, 1)">
                      <v-list-tile-avatar class="dense"><v-icon class="error--text">delete</v-icon></v-list-tile-avatar>
                      <v-list-tile-content class="dense error--text">Delete</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-flex v-else xs4 style="margin-right: 2px;">
                  <v-checkbox :value="ingredient" v-model="pantrySelections"></v-checkbox>
                </v-flex>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </template>
        </v-list>
      </div>

      <!-- FIXME: Bug where the delete button becomes visible once the scrollbar appears in the pantry -->
      <v-bottom-nav v-model="pantryEditMode && pantrySelections.length" class="error" value="true">
        <v-dialog max-width="400" persistent v-model="showDeleteModal">
          <v-btn flat slot="activator"><v-icon>delete</v-icon></v-btn>
          <v-card>
            <v-card-title class="headline">Remove items?</v-card-title>
            <v-card-text>You are about to remove <b>{{pantrySelections.length}}</b> items from your pantry. Are you sure you want to do this?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.native="showDeleteModal = false">Cancel</v-btn>
              <v-btn color="error" flat
                     @click.native="pantry = pantry.filter(function(e){return !pantrySelections.includes(e)});
                     showDeleteModal = false;">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-bottom-nav>
    </v-navigation-drawer>

    <v-toolbar clipped-left dark color="primary">
      <v-toolbar-items>
        <v-btn right flat @click.stop="showDrawer = !showDrawer"><v-icon>{{showDrawer ? 'close' : 'shopping_basket'}}</v-icon></v-btn>
      </v-toolbar-items>

      <router-link to="/recipes"><v-toolbar-title class="white--text">Pantreats</v-toolbar-title></router-link>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-menu bottom offset-y v-model="showMenu" :offset-overflow="true" :close-on-content-click="false">
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
                <span>Don't have an account? <router-link id="link-register" to="register" class="primary--text" @click.native="showMenu = false">Register.</router-link></span>
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
      </v-toolbar-items>
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
  import VNavigationDrawer from "vuetify/src/components/VNavigationDrawer/VNavigationDrawer";
  import VToolbar from "vuetify/src/components/VToolbar/VToolbar";
  import VCardTitle from "vuetify/src/components/VCard/VCardTitle";
  import VBottomNav from "vuetify/es5/components/VBottomNav/VBottomNav";

  export default {
    name: 'MainNav',
    components: {
      VBottomNav,
      VCardTitle,
      VToolbar,
      VNavigationDrawer,
      VDivider,
      VList,
      VForm,
      VIcon,
      VCardMedia
    },
    data() {
      return {
        // UI state toggles
        showMenu: undefined,
        showDrawer: undefined,
        isUserLoggedIn: undefined,
        pantryEditMode: undefined,
        showDeleteModal: undefined,

        // Login form
        email: undefined,
        password: undefined,
        errorMessage: undefined,
        warnMessage: undefined,

        ingredientsToAdd: [],
        ingredients: [
          {name: 'Flour'},
          {name: 'Milk'},
          {name: 'Eggs'},
          {name: 'Salt'},
          {name: 'Sugar'},
          {name: 'Butter'}
        ],
        pantry: [],
        pantrySelections: []
      }
    },
    // TODO: The unauthenticated view is briefly visible on refresh; how can we avoid this?
    mounted: function() {
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isUserLoggedIn = true;
        }
      })
    },
    watch: {
      pantryEditMode: function(editMode) {
        if (!editMode) {
          this.pantrySelections = [];
        }
      },
      ingredientsToAdd: function(selections) {
        let pantry = this.pantry;
        if (selections.length) {
          selections.forEach((ingredient) => {
            this.ingredientsToAdd = [];
            if (!(pantry.includes(ingredient))) {
              pantry.push(ingredient);
            } else {
              let index = pantry.indexOf(ingredient);
              pantry.splice(index, 1);
            }
          });
          this.pantry = pantry;
        }
      },
      pantry: function() {
        // TODO: Rewrite to be more efficient
        let ingredients = this.ingredients;
        ingredients.forEach((ingredient) => {
          if (this.pantry.includes(ingredient.name)) {
            ingredient.group = 'In your pantry';
          } else {
            ingredient.group = '';
          }
        });
        this.ingredients = ingredients;
      }
    },
    methods: {
      selectAllPantryItems() {
        let pantrySelections = this.pantrySelections;
        if (this.pantry.length !== pantrySelections.length) {
          this.pantry.forEach((ingredient) => {
            if (!(pantrySelections.includes(ingredient))) {
              pantrySelections.push(ingredient);
            }
          });
        } else {
          pantrySelections = [];
        }
        this.pantrySelections = pantrySelections;
      },
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
          this.hideAndClearMenu();
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
          this.hideAndClearMenu();
          this.isUserLoggedIn = false;
        }, function(error) {

        });
      },
      googleSignin(event) {
        const provider = new Firebase.auth.GoogleAuthProvider();
        Firebase.auth().signInWithPopup(provider).then((result) => {
          this.hideAndClearMenu();
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
  #link-register {
    text-decoration: underline !important;
  }
  .dense {
    margin-left: -8px;
  }
  .btn-dropdown {
    margin-bottom: 16px;
  }
</style>
