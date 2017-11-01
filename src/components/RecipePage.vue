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

</style>