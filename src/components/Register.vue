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
          <!-- placeholder button to bring up report dialogue -->
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="reportDialog" width="600px" padding="10px" persistent >
                <v-btn color="primary" dark slot="activator">Open Report Dialog</v-btn>
                <v-card>
                  <v-card-title class="headline" font-weight: bold>Report Inappropriate Content</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-radio-group v-model="ex8">
                      <v-radio label="Spam or Misleading" value="spam-radio"></v-radio>
                      <v-radio label="Violent or Explicit Content" value="explicit-radio"></v-radio>
                      <v-radio label="Other (Describe below)" value="other-radio"></v-radio>
                    </v-radio-group>
                    <v-text-field name="reportDescription" label="Describe the problem" multi-line></v-text-field>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click.native="reportDialog = false">Cancel</v-btn>
                    <v-btn color="primary" dark @click.native="reportDialog = false">Submit</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
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


          //report dialogue
          reportDialog:false
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
