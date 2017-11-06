<template>
    <v-card hover :to="'/recipe/' + String(this.id)" class="black--text">
        <v-card-title class="title accent-secondary">
            {{name}}
        </v-card-title>
        <v-card-media class="recipe-image" :src="src" height="150px"></v-card-media>
        <v-card-actions><md-rating-bar class="rating-bar" disabled></md-rating-bar></v-card-actions>
        <v-card-text class="card-text">
            {{description}}
        </v-card-text>
    </v-card>
</template>

<script>
  import VCardMedia from "vuetify/src/components/VCard/VCardMedia";
  import VBtn from "vuetify/es5/components/VBtn/VBtn";

  export default {
    name: 'RecipeCard',
    components: {
      VBtn,
      VCardMedia
    },
    props: [
        'id',
        'name',
        'src',
        'description',
        'rating'
    ],
    data() {
      return {
        showDetails: false
      }
    }
  }
</script>

<style scoped>
    .card-text {
        margin-top: -8px;
        height: 9em;
        overflow: hidden;
    }
    .card-text:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4.5em;
        width: 100%;
        background: linear-gradient(rgba(0,0,0,0), white);
     }
    .rating-bar {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: -16px;
    }
</style>