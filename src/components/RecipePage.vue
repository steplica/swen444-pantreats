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
            Summary Placeholder
        </div>
        <!-- Images -->
        <div id="recipeImages">
            Images Placeholder
        </div>
        <!-- Details -->
        <div id="recipeDetails">
            Details Placeholder
        </div>
        <!-- Ingredients -->
        <div id="recipeIngredients">
            Ingredients Placeholder
        </div>
        <!-- Cookware -->
        <div id="recipeCookware">
            Cookware Placeholder
        </div>
        <!-- Steps -->
        <div id="recipeSteps">
            Steps Placeholder
        </div>
    </div>
</template>

<!-- JS -->
<script>
    export default {
      name: 'recipePage'
    }
</script>

<!-- CSS; scoped keyword added to restrict CSS to this component -->
<style scoped>
    #recipePage { /* Grid */
        display: grid;
        grid-template-rows: repeat(3, minmax(50px ,auto));
        grid-template-columns: repeat(5, minmax(50px, auto));
        grid-gap: 5px;
        background-color: #ffffff;
    }
    #recipeSummary {
        grid-row: 1 / 2;
        grid-column: 1 / 4;

        outline-color: blueviolet;
        outline-width: 2px;
        outline-style: solid;
    }
    #recipeImages {
        grid-row: 1 / 2;
        grid-column: 4 / 6;

        outline-color: #32e24b;
        outline-width: 2px;
        outline-style: solid;
    }
    #recipeDetails {
        grid-row: 2 / 3;
        grid-column: 1 / 6;

        outline-color: #e27219;
        outline-width: 2px;
        outline-style: solid;
    }
    #recipeIngredients {
        grid-row: 3 / 4;
        grid-column: 1 / 2;

        outline-color: #3db8e2;
        outline-width: 2px;
        outline-style: solid;
    }
    #recipeCookware {

        outline-color: #d3e23b;
        outline-width: 2px;
        outline-style: solid;
    }
    #recipeSteps {
        grid-row: 3 / 5;
        grid-column: 2 / 6;

        outline-color: #32e233;
        outline-width: 2px;
        outline-style: solid;
    }
</style>