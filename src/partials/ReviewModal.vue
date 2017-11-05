<template>
    <v-layout row justify-center>
        <v-dialog v-model="reviewDialog" width="600px" padding="10px" persistent >
            <v-btn color="primary" dark slot="activator">Open review Dialog</v-btn>
            <v-card>
                <v-card-title class="headline" font-weight: bold>Rate and Review</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    Your rating
                    <md-rating-bar v-model="reviewRating" class="md-primary accent-tertiary"></md-rating-bar>
                    <v-text-field v-model="reviewInfo" label="Your Review (Optional)" multi-line></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.native="reviewDialog = false">Cancel</v-btn>
                    <v-btn color="primary" dark @click.native="reviewDialog = false">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import Firebase from 'firebase';
    import db from '../database';
    import router from 'vue-router';

    export default {
        name: 'reviewModal',
        data () {
            return {
                reviewDialog: false,
                reviewRating: undefined,
                reviewInfo: undefined
            };
        },
    }
</script>