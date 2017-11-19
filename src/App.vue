<template>
  <div id="app">
    <v-app class="secondary">
      <main-nav :sharedPantry="sharedPantry"></main-nav>
      <router-view :sharedPantry="sharedPantry"></router-view>
    </v-app>
  </div>
</template>

<script>
  import MainNav from './partials/MainNav'

  export default {
    name: 'app',
    data() {
      return {
        sharedPantry: []
      }
    },
    components: {
      MainNav
    }
  }
</script>

<style lang="stylus">
  @require './stylus/main.styl'
</style>

<style>
  html {
    overflow-y: auto;
  }
  a {
    text-decoration: none !important; /* Vue Material doesn't play nice with Vuetify */
  }
</style>
