<template>
  <v-app class="secondary">
  <div id="recipe-submit-page">
    <div>
      <form validate @submit.stop.prevent="submitRecipe">
        <md-layout :mdRow="true">
          <md-layout :mdColumn="true" id="recipe-info-main">
            <md-input-container>
              <label>Recipe name</label>
              <md-input v-model="recipeName" required></md-input>
            </md-input-container>
            <md-input-container>
              <label>Description</label>
              <md-textarea v-model="recipeDescription" required></md-textarea>
            </md-input-container>

            <!-- TODO: Make this required -->
            <v-select v-model="ingredients" label="Ingredients" chips tags :hide-selected="true"
                  :no-data-text="'No suggestions'"
              hint="Enter an ingredient (e.g. &quot;2 eggs&quot;) and press Tab to record it." persistent-hint>
            </v-select>

            <br><br>

            <div class="md-body-2">Directions</div>
            <div style="width: 100%">
              <!-- TODO: Make these re-orderable -->
              <md-list id="recipe-steps-list">
                <md-list-item v-for="(step, index) in recipeSteps" :key="step.id" class="recipe-step">
                  <md-input-container>
                    <label>{{ "Step " + (index + 1) }}</label>
                    <md-textarea v-model="recipeSteps[index].text" :required="index == 0">
                    </md-textarea>
                  </md-input-container>
                  <v-btn flat icon :ripple="false" v-if="!recipeSteps[index].text != null && index != recipeSteps.length - 1"
                       class="step-button" @click="recipeSteps.splice(index, 1)">
                    <v-icon class="error--text step-icon">remove_circle_outline</v-icon>
                  </v-btn>
                </md-list-item>
                <v-btn outline primary v-if="recipeSteps.every(x => x.text)" @click="recipeSteps.push({})">Add Step</v-btn>
              </md-list>
            </div>
          </md-layout>

          <md-layout :mdColumn="true" id="recipe-info-secondary">

            <v-carousel id="img-carousel" :hide-controls="!(localPhotos.length > 1)" :cycle="false"
                  v-if="showCarousel" :left-control-icon="localPhotos.length > 1 ? 'chevron_left' : false"
                  :right-control-icon="localPhotos.length > 1 ? 'chevron_right' : false">

              <label v-if="!localPhotos.length" for="btn-upload" class="custom-file-upload">
                <span style="width: 100%;">
                  <i class="material-icons primary--text">add_a_photo</i><br>Click to upload a photo of this recipe. (Optional)
                </span>
              </label>

              <input @change="onFileChange" id="btn-upload" type="file" width="100%" multiple="multiple">

              <v-carousel-item v-for="(item, i) in localPhotos" v-bind:src="item.src" :key="i">
              </v-carousel-item>
            </v-carousel>

            <!-- TODO: The HH and MM inputs can each be combined into a single masked time input -->
            <!-- TODO: Minutes should never be > 59 -->
            <md-layout :mdRow="true" :md-gutter="16">
              <span class="label">Prep Time:
                <md-avatar>
                  <md-icon class="help-icon">help</md-icon>
                  <md-tooltip class="primary">The amount of time required to prepare food (wash, cut, peel, etc.)
                    but not actually cook it.</md-tooltip>
                </md-avatar>
              </span>
              <md-layout :md-gutter="16">
                <md-layout>
                  <md-input-container :md-inline="true">
                    <label>HH</label>
                    <md-input type="number" v-model="prepTimeHr" required></md-input>
                  </md-input-container>
                </md-layout>
                <md-layout>
                  <md-input-container :md-inline="true">
                    <label>MM</label>
                    <md-input type="number" v-model="prepTimeMin" required></md-input>
                  </md-input-container>
                </md-layout>
              </md-layout>
            </md-layout>
            <md-layout :mdRow="true" :md-gutter="16">
              <span class="label">Cook Time:
                <md-avatar>
                  <md-icon class="help-icon">help</md-icon>
                  <md-tooltip class="primary">The amount of time food for which food is actually cooked.</md-tooltip>
                </md-avatar>
              </span>
              <md-layout :md-gutter="16">
                <md-layout>
                  <md-input-container :md-inline="true">
                    <label>HH</label>
                    <md-input type="number" v-model="cookTimeHr" required></md-input>
                  </md-input-container>
                </md-layout>
                <md-layout>
                  <md-input-container :md-inline="true">
                    <label>MM</label>
                    <md-input type="number" v-model="cookTimeMin" required></md-input>
                  </md-input-container>
                </md-layout>
              </md-layout>
            </md-layout>
            <md-input-container>
              <label>Servings</label>
              <md-input type="number" v-model="servings" required></md-input>
            </md-input-container>

            <v-select v-model="cookware" label="Required cookware" chips tags :items="cookwareOptions"
                  :hide-selected="true" :no-data-text="'No suggestions'"
                hint="Enter a piece of equipment (e.g. &quot;Rolling pan&quot;) and press Tab to record it." persistent-hint>
            </v-select>

            <!-- TODO: Tags -->

          </md-layout>
        </md-layout>
        <md-button type="submit" class="md-raised md-primary">Submit Recipe</md-button>
      </form>
    </div>
  </div>
  </v-app>
</template>

<script>
import Firebase from 'firebase';
import uuidV4 from 'uuid/v4';
import VSelect from 'vuetify/es5/components/VSelect/VSelect';
import VTextField from 'vuetify/es5/components/VTextField/VTextField';
import db from '../database';
import MdLayout from '../../node_modules/vue-material/src/components/mdLayout/mdLayout.vue';

const storageRef = Firebase.storage().ref(); // TODO: How do I put this in database.js like we did with db?
const ingredientsRef = db.ref('ingredients');
const cookwareRef = db.ref('cookware');
export default {
  name: 'recipeSubmit',
  components: {
    VTextField,
    VSelect,
    MdLayout,
  },
  data() {
    return {
      showCarousel: true,
      localPhotos: [], // Photos stored in the browser
      recipeName: undefined,
      recipeDescription: undefined,
      ingredients: [],
      ingredientOptions: [],
      prepTimeHr: undefined,
      prepTimeMin: undefined,
      cookTimeHr: undefined,
      cookTimeMin: undefined,
      servings: undefined,
      cookware: [],
      cookwareOptions: [],
      photos: [],
      tags: [],
      recipeSteps: [
        {},
      ],
    };
  },
  mounted() {
    // Load cookware dropdown options
    const cookware = [];
    cookwareRef.orderByChild('description').on('child_added', (c) => {
      cookware.push(c.val().description);
    });
    this.cookwareOptions = cookware;

    // Load ingredient dropdown options
    const ingredients = [];
    ingredientsRef.orderByChild('name').on('child_added', (i) => {
      ingredients.push(i.val().name);
    });
    this.ingredientOptions = ingredients;
  },
  methods: {
    onFileChange(e) {
      this.showCarousel = false; // Reinitialization hack because dynamic images won't be supported until v1.0
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }

      const fileList = [];
      const photoList = [];
      files.forEach((file) => {
        fileList.push({ src: window.URL.createObjectURL(file) });

        const uploadTask = storageRef.child(`images/recipes/${uuidV4()}`).put(file);
        uploadTask.on('state_changed', (snapshot) => {
          // TODO: Show upload progress?
        }, (error) => {
          // TODO: Show snackbar
        }, () => { // Success
          // TODO: Show snackbar
          photoList.push(uploadTask.snapshot.downloadURL); // TODO: Might want to store ref instead of just retrieval URL
        });
      });
      this.localPhotos = fileList;
      this.photos = photoList;
      this.$nextTick(() => {
        this.showCarousel = true;
      });
    },
    // TODO: Handle undefineds since Firebase will reject the whole request if they're present.
    submitRecipe() {
      db.ref().child('recipes').push().set({
        submitter: Firebase.auth().currentUser.uid,
        name: this.recipeName,
        description: this.recipeDescription,
        ingredients: this.ingredients.filter(x => x.trim() !== ''),
        prepTime: (parseInt(this.prepTimeHr, 10) * 60) + parseInt(this.prepTimeMin, 10),
        cookTime: (parseInt(this.cookTimeHr, 10) * 60) + parseInt(this.cookTimeMin, 10),
        servings: this.servings,
        cookware: this.cookware.filter(x => x.trim() !== ''),
        photos: this.photos,
        tags: this.tags.filter(x => x.trim() !== ''),
        steps: this.recipeSteps.map(x => x.text).filter(x => x.trim() !== ''),
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #recipe-submit-page {
    padding: 16px 10%;
  }
  #recipe-info-main {
    /* TODO: Margin still exists in portrait layout (do we even need this to work on mobile?) */
    margin-right: 10%;
    display: inline;
  }
  #recipe-info-secondary {
    display: inline;
  }
  .recipe-step {
    margin: -8px;
  }
  .label {
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
    margin-right: 8px;
  }
  .help-icon {
    opacity: 0.75;
    font-size: 1.5em;
  }
  i {
    font-size: 2.5em;
  }
  .step-icon {
    /* FIXME: Bug where hover is off-center as a result of resizing */
    font-size: 1.5em;
    margin-left: 8px;
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }
  #img-carousel {
    max-height: 200px;
    width: 100%;
    text-align: center;
    align-items: center;
    display: inline-flex;
    box-shadow: none;
  }
  .custom-file-upload {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
  }
</style>
