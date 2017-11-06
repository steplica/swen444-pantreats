import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Recipes from '@/components/Recipes';
import RecipeSubmit from '@/components/RecipeSubmit';
import RecipePage from '@/components/RecipePage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', redirect: 'recipes'
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/recipes/submit',
      component: RecipeSubmit
    },
    { //Temporary path for testing recipe page
      path: '/recipes/:id',
      component: RecipePage
    }
  ]
});
