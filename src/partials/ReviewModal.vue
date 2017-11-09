<template>
  <v-layout row justify-center>
    <md-button class="activatorButton md-raised md-accent md-dense" slot="activator" @click.native.stop="reviewDialog=true">Review</md-button>
    <v-dialog v-model="reviewDialog" width="600px" padding="10px" persistent >
      <v-card>
        <v-card-title class="headline" font-weight: bold>Rate and Review</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <span class="md-subheading ratingTitle">Your Rating:</span>
          <md-rating-bar v-model="reviewRating" class="md-primary accent-tertiary"></md-rating-bar>
          <v-text-field v-model="reviewInfo" label="Your Review (Optional)" multi-line></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="close()">Cancel</v-btn>
          <v-btn color="primary" dark @click.native="close()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import MdButton from '../../node_modules/vue-material/src/components/mdButton/mdButton.vue';

export default {
  name: 'reviewModal',
  components: {
    MdButton,
  },
  data() {
    return {
      reviewDialog: false,
      reviewRating: undefined,
      reviewInfo: undefined,
    };
  },
  methods: {
    close() {
      this.reviewRating = undefined;
      this.reviewInfo = undefined;
      this.reviewDialog = false;
    },
  },
};
</script>

<style>
  .activatorButton {
    margin: 0 0 0 0;
    border-radius:0px;
    flex: 1;
    width: 50px;
  }
  .ratingTitle {
    margin-bottom: 10px;
  }
</style>
