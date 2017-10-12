<template>
  <div>
    <md-toolbar>
      <h2 class="md-title" style="flex: 1">Use It Or Lose It</h2>

      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>

      <md-button @click.native="$router.push('/login')">Login / Sign Up</md-button>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: 'MainNav'
}
</script>

<style scoped>

</style>
