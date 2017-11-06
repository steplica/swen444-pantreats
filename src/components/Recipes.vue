<template>
    <div id="recipe-search-page">
        <!--<v-toolbar dense :fixed="isToolbarFixed" color="accent-tertiary">-->
            <!--<v-text-field prepend-icon="search" hide-details single-line></v-text-field>-->
            <!--<v-btn icon>-->
                <!--<v-icon>more_vert</v-icon>-->
            <!--</v-btn>-->
        <!--</v-toolbar>-->

        <v-container fluid grid-list-lg>
            <v-layout row wrap>
                <v-flex xs3 v-for="i in 1" :key="i">
                    <recipe-card name="Delicious Test Recipe"
                                 src="https://i.imgur.com/A2SzoRp.jpg"
                                 description="This is a fantastic recipe with an even more fantastic description. In fact, some would say it's the best description in the world. You can click on this card to find out how to make it!"
                                 :rating="5"
                                 :id="recipes[i-1]">
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
      data() {
        return {
          isToolbarFixed: false,

          recipes: []
        };
      },
      mounted: function() {
        this.updateSearchResults();
      },
      methods: {
        updateSearchResults() {
          // TODO: Replace with actual updates based on pantry ingredients
          // For now, we just load the recipes in the database
          let recipes = this.recipes;

          recipesRef.on('child_added', (recipe) => {
            recipes.push(recipe);
          });

          this.recipes = recipes;
        }
//        handleScroll() {
//            this.isToolbarFixed = $(window).scrollTop() >= 100;
//        }
      },
//      created() {
//        window.addEventListener('scroll', this.handleScroll);
//      },
//      destroyed() {
//        window.removeEventListener('scroll', this.handleScroll);
//      }
    }
</script>