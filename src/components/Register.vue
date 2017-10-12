<template>
  <div class="register">
    <div style="margin: 0 auto;">
      <form novalidate @submit.stop.prevent="register">
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
  import db from '../database';
  import router from 'vue-router';


  export default {
    name: 'register',
    data () {
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
        Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            user.updateProfile({
              firstName: this.firstName,
              lastName: this.lastName,
              college: this.college,
            });
            this.$router.push('/');
          }).catch((error) => {
            //Handle error
          });
      },
    },
    firebase () {
      return {};
    }
  }
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
