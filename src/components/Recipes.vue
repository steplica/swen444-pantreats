<template>
    <div id="recipe-search-page">
        <v-container fluid grid-list-lg>
            <v-layout v-if="!sharedPantry.length" row>
                <v-flex xs6>
                    <img src="/static/empty_pantry.png"/>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs3 v-for="recipe in recipes" :key="recipe.id">
                    <recipe-card :name="recipe.name"
                                 :src="recipe.photos[0]"
                                 :description="recipe.description"
                                 :rating="recipe.rating"
                                 :id="recipe.id">
                    </recipe-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import Firebase from 'firebase';
    import db from '../database';
    import RecipeCard from '../partials/RecipeCard';
    import $ from 'jquery/dist/jquery.min';

    const recipesRef = db.ref('recipes/');

    export default {
      name: 'recipes',
      components: {
        RecipeCard
      },
      props: ['sharedPantry'],
      data() {
        return {
          recipes: [] // TODO: Use VueFire
        };
      },
      created: function () {
        this.updateSearchResults();
      },
      watch: {
        sharedPantry() {
          this.updateSearchResults();
        }
      },
      methods: {
        updateSearchResults() {
          // TODO: Replace with actual updates based on pantry ingredients
          // For now, we just load the recipes that are in the database
          this.recipes = [];
          let recipes = this.recipes;

          recipesRef.orderByChild('rating').on('child_added', (snapshot) => {
            let recipe = snapshot.val();
            recipe['id'] = snapshot.key; // TODO: Would it make sense to just store this in the database?

            if (recipe.ingredients.every(ingredient => this.sharedPantry.includes(ingredient))) {
              recipes.push(recipe);
            }
          });

          this.recipes = recipes.reverse();
        }
      }
    }
</script>