<template>
  <div id="app">
    <v-app class="secondary">
      <main-nav></main-nav>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import MainNav from './partials/MainNav';

export default {
  name: 'app',
  components: {
    MainNav,
  },
};
</script>

<style lang="stylus">
  @require './stylus/main.styl'
</style>

<style>
  html {
    overflow-y: auto;
  }
</style>
