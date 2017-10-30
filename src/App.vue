<template>
  <div id="app">
    <main-nav></main-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import MainNav from './partials/MainNav'

  export default {
    name: 'app',
    components: {
      MainNav
    }
  }
</script>

<style lang="stylus">
  @require './stylus/main.styl'
</style>
