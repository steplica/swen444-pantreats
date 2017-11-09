<template>
  <div class="register">
    <div style="margin: 20px auto auto;
                .flex-container {
                  display: flex;
                  width: 400px;
                  height: 575px;
                  border: 4px solid tan;
                  border-radius: 5px;
                  background-color: white;
                  padding: 10px;
                }">
      <form novalidate @submit.stop.prevent="register">
        <h4 align="center">Register</h4>

        <md-input-container>
          <label>First Name</label>
          <md-input v-model="firstName" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Last Name</label>
          <md-input v-model="lastName" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Email</label>
          <md-input v-model="email" required></md-input>
        </md-input-container>

        <md-input-container>
          <label for="college">College</label>
          <md-select id="college" v-model="college">
            <md-option value="monroe_community_college">Monroe Community College</md-option>
            <md-option value="university_of_rochester">University of Rochester</md-option>
            <md-option value="rochester_institute_of_technology">Rochester Institute of Technology</md-option>
            <md-option value="suny_geneseo">SUNY Geneseo</md-option>
            <md-option value="empire_state_college">Empire State College</md-option>
            <md-option value="st_john_fisher_college">St. John Fisher College</md-option>
            <md-option value="nazareth_college">Nazareth College</md-option>
          </md-select>
        </md-input-container>

        <md-input-container>
          <label>Password</label>
          <md-input v-model="password" required type="password"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Confirm Password</label>
          <md-input required type="password"></md-input>
        </md-input-container>

        <md-button type="submit" class="md-raised md-primary">Register</md-button>
      </form>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase';

export default {
  name: 'register',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const userNotAnonymous = Firebase.auth().currentUser
                               && !Firebase.auth().currentUser.isAnonymous;
      if (userNotAnonymous) {
        next('/');
      } else {
        next();
      }
    });
  },
  data() {
    return {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      college: undefined,
      password: undefined,
    };
  },
  methods: {
    register(event) {
      const unregisteredAndNotAnonymous = !(Firebase.auth().currentUser
                                              && Firebase.auth().currentUser.isAnonymous
                                              && this.convertAnonymousUser());
      if (unregisteredAndNotAnonymous) {
        Firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          user.updateProfile({
            firstName: this.firstName,
            lastName: this.lastName,
            college: this.college,
          });
          this.$router.push('/');
        }).catch((error) => {
          const errorMessage = error.message;
          const errorCode = error.code;
          switch (errorCode) {
            // TODO: Alert the user in a prettier way than through the default alert box
            case 'auth/email-already-in-use':
              alert('This email is already in use. Please sign in or use a different email.');
              break;
            case 'auth/invalid-email':
              alert('Your email is invalid. Please check that it is typed correctly and try again.');
              break;
            case 'auth/weak-password':
              alert('Your password must be a minimum of 6 characters.');
              break;
            default:
              break;
          }
        });
      }
    },
    convertAnonymousUser() {
      const credential = Firebase.auth.EmailAuthProvider.credential(this.email, this.password);
      Firebase.auth().currentUser.linkWithCredential(credential)
        .then(user => true)
        .catch(error => false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
