<template>
    <v-layout row justify-center>
        <v-dialog v-model="reportDialog" width="600px" padding="10px" persistent >
            <v-btn color="primary" dark slot="activator">Open Report Dialog</v-btn>
            <v-card>
                <v-card-title class="headline" font-weight: bold>Report Inappropriate Content</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-radio-group v-model="reportRadio">
                        <v-radio label="Spam or Misleading" value="radio-1"></v-radio>
                        <v-radio label="Violent or Explicit Content" value="radio-2"></v-radio>
                        <v-radio label="Other (Describe below)" value="radio-3"></v-radio>
                    </v-radio-group>
                    <v-text-field v-model="reportInfo" label="Describe the problem" multi-line></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.native="reportDialog = false">Cancel</v-btn>
                    <v-btn color="primary" dark @click.native="reportDialog = false">Submit</v-btn>
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
        name: 'ReportModal',
        data () {
            return {
                reportDialog: false,
                reportRadio: undefined,
                reportInfo: undefined
            };
        },
    }
</script>