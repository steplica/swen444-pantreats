<template>
    <v-layout row justify-center>
        <md-button class="activatorButton md-raised md-accent md-dense" slot="activator" @click.native.stop="reportDialog=true">Report</md-button>
        <v-dialog v-model="reportDialog" width="600px" padding="10px" persistent >
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
                    <v-btn color="primary" flat @click.native="close(false)">Cancel</v-btn>
                    <v-btn color="primary" dark @click.native="close(true)">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import Firebase from 'firebase';
    import db from '../database';
    import router from 'vue-router';
    import MdButton from "../../node_modules/vue-material/src/components/mdButton/mdButton.vue";

    export default {
      components: {MdButton},
      name: 'ReportModal',
        data () {
            return {
                reportDialog: false,
                reportRadio: undefined,
                reportInfo: undefined,
                vueRouter: this.$router
            };
        },
      methods: {
        close(redirect) {
          //Clean out dialog data
          this.reportRadio = undefined;
          this.reportInfo = undefined;
          this.reportDialog = false;

          if(redirect) {
            //this.vueRouter.go(-1);
            this.vueRouter.push('../recipes');
          }
        }
      }
    }
</script>

<style>
    .activatorButton {
        margin: 0 0 0 0;
        border-radius:0px;
        flex: 1;
        width: auto;
    }
</style>