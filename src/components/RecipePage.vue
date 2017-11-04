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
                <span class="md-display-1">{{name}}</span>
                <md-rating-bar style="margin:auto" v-model="rating" :md-max-rating="5" class="md-primary" disabled></md-rating-bar>

                <!-- Reviews | made it | photos -->
                <md-button class="md-primary">{{reviews.length}} Reviews</md-button>
                <md-button class="md-primary">{{madeIt}} Made It</md-button>
                <md-button class="md-primary">{{photos.length}} Photos</md-button>
            </div>
            <!-- Recipe author and description -->
            <span class="md-body-2">Recipe by <u>{{submitter}}</u></span><br>
            <span class="md-subheading">{{description}}</span><br>

            <!-- Save | Made It | Review | Report -->
            <div id="summaryFlexButtons">
                <md-button class="summaryButtons md-raised md-accent">Save</md-button>
                <md-button class="summaryButtons md-raised md-accent">Made It</md-button>
                <md-button class="summaryButtons md-raised md-accent">Review</md-button>
                <md-button class="summaryButtons md-raised md-accent">Report</md-button>
            </div>
        </div>
        <!-- Images -->
        <div id="recipeImages">
            <!-- Primary image -->
            <md-image class="recipePrimaryImage" :md-src="photos[0]" alt="Recipe Image"></md-image>

            <!-- Show smaller previews for non-primary images -->
            <div id="recipeSecondaryImages">
                <md-image v-for="photo, key, index in photos" v-if="index < 3" class="recipeSecondaryImage" :md-src="photo" alt="Recipe"></md-image>
                <md-button id="recipeImageGallery" class="md-raised md-accent" v-else-if="index == 4">+</md-button>
            </div>
        </div>
        <!-- Details -->
        <div id="recipeDetails">
            <div class="detailsFlexItem">
                <span class="md-subheading"><b>Prep Time</b></span><br>
                <span class="md-body-1">{{prepTime}} Minutes</span>
            </div>
            <div class="detailsFlexItem">
                <span class="md-subheading"><b>Cook Time</b></span><br>
                <span class="md-body-1">{{cookTime}} Minutes</span>
            </div>
            <div class="detailsFlexItem">
                <span class="md-subheading"><b>Total Time</b></span><br>
                <span class="md-body-1">{{prepTime + cookTime}} Minutes</span>
            </div>
            <div class="detailsFlexItem">
                <span class="md-subheading"><b>Serves</b></span><br>
                <span class="md-body-1">{{servings}} People</span>
            </div>
        </div>
        <!-- Ingredients -->
        <div id="recipeIngredients">
            <span class="md-title"><b>Ingredients</b></span><br>
            <ul><li v-for="ingredient in ingredients">{{ingredient}}</li></ul>
        </div>
        <!-- Cookware -->
        <div id="recipeCookware">
            <span class="md-title"><b>Cookware</b></span><br>
            Nothing here!
        </div>
        <!-- Steps -->
        <div id="recipeSteps">
            <span class="md-title"><b>Steps!</b></span><br>
            <div v-for="step, key, index in steps" class="recipeStepsStep">
                <span class="md-subheading"><b>Step {{index + 1}}</b></span><br>
                <span class="md-body-1">{{step}}</span>
            </div>
        </div>
    </div>
</template>

<!-- JS -->
<script>
  import MdInputContainer from "../../node_modules/vue-material/src/components/mdInputContainer/mdInputContainer";
  import MdButton from "../../node_modules/vue-material/src/components/mdButton/mdButton.vue";
    export default {
      components: {
        MdButton,
        MdInputContainer},
      name: 'recipePage',
      data() {
        return {
          //Temporary recipe data
          "submitter": "TxNVpLUsgAZc5yuoGul",
          "name": "Chicken Pot Pie",
          "description": "A delicious chicken pot pie!",
          "ingredients": {
            "0": "Chicken",
            "1": "Flour"
          },
          "steps": {
            "0": "Somebody once told me the world is gonna roll me",
            "1": "I ain't the sharpest tool in the shed",
            "2": "She was looking kind of dumb with her finger and her thumb",
            "3": "In the shape of an \"L\" on her forehead",
            "4": "Well the years start coming and they don't stop coming",
            "5": "Fed to the rules and I hit the ground running",
          },
          "prepTime": 20,
          "cookTime": 60,
          "servings": 5,
          "photos": {
            "0": "https://i.imgur.com/YWbMCs0.png",
            "1": "https://i.imgur.com/YWbMCs0.png",
            "2": "https://i.imgur.com/YWbMCs0.png",
            "3": "https://i.imgur.com/YWbMCs0.png",
            "4": "https://i.imgur.com/YWbMCs0.png"
          },
          "rating": 4.3,
          "reviews": [

          ],
          "madeIt": 45
        };
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
    #recipeDetails {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        grid-row: 2 / 3;
        grid-column: 1 / 6;
        margin-top: 10px;
        margin-bottom: 10px;

        outline-color: #ccdae2;
        outline-width: 2px;
        outline-style: solid;
    }
    .detailsFlexItem {
        flex: 1;
        margin: 4px 4px;
        border-radius:0;
        text-align: center;
    }
    /* Screen width more than 760 px */
    @media screen and (min-width:760px) {
        #recipeIngredients {
            grid-row: 3 / 4;
            grid-column: 1 / 2;
        }
        #recipeCookware {
            grid-column: 1 / 2;
        }
        #recipeSteps {
            grid-row: 3 / 5;
            grid-column: 2 / 6;
            margin-left: 10px;
        }
    }
    /* Screen width less than 760 px */
    @media screen and (max-width:760px) {
        #recipeIngredients {
            grid-row: 3 / 4;
            grid-column: 1 / 6;
        }
        #recipeCookware {
            grid-column: 1 / 6;
        }
        #recipeSteps {
            grid-column: 1 / 6;
        }
    }
    .recipeStepsStep {
        margin-top: 10px;
    }
</style>