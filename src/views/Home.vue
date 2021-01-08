<template>
     <v-main>
         <v-row>
             <v-col>
                 <v-card
                         class="mx-auto"
                         max-width="300"
                         color="blue"
                         dark
                         justify="start"
                 >
                     <v-card-text>
                         <h1 class="pa-5"> Post</h1>
                         <h1 class="pa-5">{{postCount}}</h1>
                     </v-card-text>
                 </v-card>

             </v-col>
         </v-row>

      </v-main>
</template>
<script>
    import { mapGetters } from 'vuex'
  export default {
    name: "Home",
    data() {
      return {

      };
    },

    created() {
        this.$store.dispatch('postCount')

    },
      computed: {
          // count () {
          //     return this.$store.state.postCount
          // }
          ...mapGetters({
              postCount: 'getPostCount',
          })
      },
    methods: {

    }
  };
</script>
<style lang="scss" scoped>
  .viewCard {
    transition: transform 1s;

    &:hover {
      -ms-transform: scale(1.1); /* IE 9 */
      -webkit-transform: scale(1.1); /* Safari 3-8 */
      transform: scale(1.1);
    }
  }
</style>