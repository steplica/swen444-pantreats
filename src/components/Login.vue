<template>
  <div class="login">
    <div style="margin: 0 auto;">
      <md-button class="md-raised md-primary" @click.native="routeRegister">Register</md-button>

      <md-button class="md-raised md-primary" @click.native="googleSignin">Sign In With Google</md-button>

      <form novalidate @submit.stop.prevent="login">
        <md-input-container>
          <label>Email</label>
          <md-input v-model="email" required></md-input>
        </md-input-container>

        <md-input-container>
          <label>Password</label>
          <md-input v-model="password" required type="password"></md-input>
        </md-input-container>

        <md-button type="submit" class="md-raised md-primary">Login</md-button>
      </form>
    </div>
  </div>
</template>

<script>
  import Firebase from 'firebase';

  export default {
    name: 'login',
    data () {
      return {
        email: undefined,
        password: undefined,
      };
    },
    methods: {
      login(event) {
        Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
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
