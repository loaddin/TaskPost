<template>
  <v-app id="inspire">
    <NavBar></NavBar>
    <div class="pa-10">
      <router-view/>
    </div>
    <v-footer color="blue lighten-1"
              app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import NavBar from './components/Navbar'
  export default {
    components: {
      NavBar
    },
    data() {
      return {
        drawer: null
      }
    },
    computed: {},
    created() {
      this.getMenuData()
    },
    methods: {
      async getMenuData() {
      }
    }

  }
</script>

<style lang="scss" scoped>
  .bread {
    margin: 0;
  }
</style>