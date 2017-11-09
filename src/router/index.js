import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import RecipeSubmit from '@/components/RecipeSubmit';
import RecipePage from '@/components/RecipePage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/recipes/submit',
      component: RecipeSubmit,
    },
    {
      path: '/recipes/:id', // Temporary path for testing recipe page
      component: RecipePage,
    },
  ],
});
