<!-- Recipe Page : The primary Vue component for looking at a recipe's details
     - Author: Robert Nill
     - Note: Currently indented with 4 spaces, can be changed later
-->
<!-- HTML -->
<!-- Break down the screen into five major components... -->
    <!-- Summary: Has a title, buttons for actions such as leaving a review -->
    <!-- Images: A grid of images of the recipe -->
    <!-- Details: Details such as cook/prep/full time, serving size -->
    <!-- Ingredients: A list of ingredients used by the recipe -->
    <!-- Cookware: Pots, pans, optionally listed out if they're detailed in the recipe -->
    <!-- Steps: Steps required to complete the recipe -->
<template>
    <!-- Single root element: Required for Vue -->
    <div id="recipePage">
        <!-- Summary -->
        <div id="recipeSummary">
            <div id="recipeSummaryTitle">
                <!-- Title and ratings -->
                <span class="md-display-1">{{recipe.name}}</span>
                <md-rating-bar style="margin:auto" v-model="reviewScore" :md-max-rating="5" class="md-primary" disabled></md-rating-bar>

                <!-- Reviews | made it | photos -->
                <md-button class="md-primary">{{recipe.reviews.length}} Reviews</md-button>
                <md-button class="md-primary">{{recipe.madeIt}} Made It</md-button>
                <md-button class="md-primary">{{recipe.photos.length}} Photos</md-button>
            </div>

            <!-- Recipe author and description -->
            <span class="md-body-2">Recipe by <u>{{recipe.submitter}}</u></span><br>
            <span class="md-subheading">{{recipe.description}}</span><br>

            <!-- Save | Made It | Review | Report -->
            <div id="summaryFlexButtons">

                <!-- Save buttons -->
                <md-button v-if="!mock.savedIt" class="summaryButtons md-raised md-accent md-dense" v-on:click="toggleSavedIt">Save</md-button>
                <md-button v-else class="summaryButtons" v-on:click="toggleSavedIt">Saved</md-button>

                <!-- Made it buttons -->
                <md-button v-if="!mock.madeIt" class="summaryButtons md-raised md-accent md-dense" v-on:click="toggleMadeIt">I Made It</md-button>
                <md-button v-else class="summaryButtons" v-on:click="toggleMadeIt">Made It</md-button>

                <!-- Review buttons -->
                <!--<md-button id="reviewButton" class="summaryButtons md-raised md-accent md-dense">Review</md-button>-->
                <review-modal class="summaryButtons"></review-modal>

                <!-- Report buttons -->
                <!--<md-button class="summaryButtons md-raised md-accent md-dense">Report</md-button>-->
                <report-modal class="summaryButtons"></report-modal>

            </div>
        </div>

        <!-- Images -->
        <div id="recipeImages">
            <!-- Primary image -->
            <md-image class="recipePrimaryImage" :md-src="recipe.photos[0]" alt="Recipe Image"></md-image>

            <!-- Show smaller previews for non-primary images -->
            <div id="recipeSecondaryImages">
                <md-image v-for="photo, key, index in recipe.photos" :key="key" v-if="key + 1 < 3" class="recipeSecondaryImage" :md-src="photo" alt="Recipe"></md-image>
                <md-button id="recipeImageGallery" class="md-raised md-accent" v-else-if="key + 1 == 4">+</md-button>
            </div>
        </div>

        <!-- Toggle bar for switching between recipe and reviews views -->
        <div id="recipeReviewsToggle">
            <md-tabs class="md-transparent recipeReviewsToggleBar">
                <!-- Recipe tab -->
                <md-tab md-label="Recipe" class="recipeReviewsToggleBar">
                    <!-- Details -->
                    <div id="recipeDetails">
                        <div class="detailsFlexItem">
                            <span class="md-subheading"><b>Prep Time</b></span><br>
                            <span class="md-body-1">{{recipe.prepTime}} Minutes</span>
                        </div>
                        <div class="detailsFlexItem">
                            <span class="md-subheading"><b>Cook Time</b></span><br>
                            <span class="md-body-1">{{recipe.cookTime}} Minutes</span>
                        </div>
                        <div class="detailsFlexItem">
                            <span class="md-subheading"><b>Total Time</b></span><br>
                            <span class="md-body-1">{{recipe.prepTime + recipe.cookTime}} Minutes</span>
                        </div>
                        <div class="detailsFlexItem">
                            <span class="md-subheading"><b>Serves</b></span><br>
                            <span class="md-body-1">{{recipe.servings}} People</span>
                        </div>
                    </div>
                    <md-layout md-gutter>
                        <md-layout md-column md-gutter md-flex="25">
                            <!-- Ingredients -->
                            <div id="recipeIngredients">
                                <span class="md-title"><b>Ingredients</b></span><br>
                                <ul><li v-for="ingredient in recipe.ingredients">{{ingredient}}</li></ul>
                            </div>

                            <!-- Cookware -->
                            <div id="recipeCookware">
                                <span class="md-title"><b>Cookware</b></span><br>
                                Nothing here!
                            </div>
                        </md-layout>
                        <md-layout md-column md-gutter>
                            <!-- Steps -->
                            <div id="recipeSteps">
                                <span class="md-title"><b>Steps!</b></span><br>
                                <div v-for="step, key, index in recipe.steps" class="recipeStepsStep">
                                    <span class="md-subheading"><b>Step {{key + 1}}</b></span><br>
                                    <span class="md-body-1">{{step}}</span>
                                </div>
                            </div>
                        </md-layout>
                    </md-layout>
                </md-tab>

                <!-- Reviews tab -->
                <md-tab md-label="Reviews">
                    <div class="userReview" v-for="review in recipe.reviews">
                        <md-layout md-gutter>
                            <md-layout md-flex="70">
                                <span class="md-subheading userReviewName"><b>Reviewer: {{review.name}}</b></span><br>
                            </md-layout>
                            <md-layout md-flex="20">
                                <md-rating-bar v-model="review.score" :md-max-rating="5" class="md-primary userReviewScore" disabled></md-rating-bar>
                            </md-layout>
                            <md-layout md-flex="10">
                                <md-button class="md-dense userReviewButton">Report</md-button>
                            </md-layout>
                        </md-layout>

                        <md-layout md-gutter>
                            <span class="md-body-1 userReviewText">{{review.text}}</span>
                        </md-layout>
                    </div>
                </md-tab>
            </md-tabs>
        </div>
    </div>
</template>

<!-- JS -->
<script>
  import MdInputContainer from "../../node_modules/vue-material/src/components/mdInputContainer/mdInputContainer";
  import MdButton from "../../node_modules/vue-material/src/components/mdButton/mdButton.vue";
  import ReportModal from "../partials/ReportModal.vue";
  import ReviewModal from "../partials/ReviewModal.vue";
  import db from "../database";
  const recipeRef = db.ref("recipes");


    export default {
      components: {
        MdButton,
        MdInputContainer,
        reportModal: ReportModal,
        reviewModal: ReviewModal
      },
      name: 'recipePage',
      data() {
        return {
          //Temporary recipe data
          "recipeName": this.$route.params.id,
          "mock" : {
            "madeIt": false,
            "savedIt": false,
            "page": 1
          }
        };
      },
      firebase() {
        return {
          recipe: {
            source: recipeRef.child(this.recipeName),
            asObject: true
          }
        }
      },
      methods: {
        toggleMadeIt() {
          this.mock.madeIt = !this.mock.madeIt;
        },
        toggleSavedIt() {
          this.mock.savedIt = !this.mock.savedIt;
        }
      },
      computed: {
        reviewScore() {
          let total = 0;
          let count = 0;
          this.recipe.reviews.forEach(function(review){
            total += review.score;
            count++;
          });
          if(count == 0)
            return 0;
          else
            return (total / count);
        }
      }
    }
</script>

<!-- CSS; scoped keyword added to restrict CSS to this component -->
<style scoped>
    #summaryFlexButtons {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .summaryButtons {
        flex: 1;
        margin: 4px 0px;
        border-radius:0px;
    }
    #recipePage {
        display: grid;
        grid-template-rows: repeat(3, minmax(50px ,auto));
        grid-template-columns: repeat(5, minmax(50px, 20%));
        grid-gap: 15px;
        margin-top: 3%;
        margin-left: 5%;
        margin-right: 5%;
    }
    #recipeSummary {
        grid-row: 1 / 2;
        grid-column: 1 / 4;
    }
    #recipeSummaryTitle {
        text-align: center;
    }
    #recipeImages {
        grid-row: 1 / 2;
        grid-column: 4 / 6;
        margin-left: 10px;
    }
    .recipePrimaryImage {
        width:320px;
    }
    #recipeSecondaryImages {
        display: flex;
        flex-wrap: wrap;
        max-width: 320px;
    }
    .recipeSecondaryImage {
        flex: 1;
        max-width: 77px;
        align-self: center;
    }
    #recipeImageGallery {
        flex: 1;
        margin: 0 0;
        padding: 0 0;
        border-radius:0;
        font-size: 24px;
        max-width: 72px
    }
    #recipeReviewsToggle {
        grid-row: 2 / 3;
        grid-column: 1 / 6;
        margin-bottom: 0;
    }
    #recipeDetails {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 10px;

        outline-color: #e0d5c5;
        outline-width: 2px;
        outline-style: solid;
    }
    .detailsFlexItem {
        flex: 1;
        margin: 4px 4px;
        border-radius:0;
        text-align: center;
    }
    #recipeCookware {
        margin-top: 10px;
    }
    .userReview {
        border-top: 2px solid #e0d5c5;
        margin-top: 10px;
    }
    .userReviewScore {
        margin-top: 0;
    }
    .userReviewButton {
        margin-top: 0;
    }
    .recipeStepsStep {
        margin-top: 10px;
    }
</style>