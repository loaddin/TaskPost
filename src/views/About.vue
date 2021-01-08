<template>
  <v-main>
    <v-app id="inspire">
      <div>
        <v-data-table
                :headers="headers"
                :items="todos"
                :options.sync="options"
                :loading="loading"
                class="elevation-1"
        ></v-data-table>
      </div>
    </v-app>
  </v-main>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "index",
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        todos:[],
        loading: true,
        options: {},
        headers: [
          {
            text: 'userId',
            align: 'start',
            sortable: false,
            value: 'userId',
          },
          { text: 'id', value: 'id' },
          { text: 'title', value: 'title' },
          { text: 'completed', value: 'completed' },
        ],
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      async getDataFromApi () {
        this.loading = true
        // this.fakeApiCall().then(data => {
        //     this.desserts = data.items
        //     this.totalDesserts = data.total
        //     this.loading = false
        // })
        let data = await axios.get('todos');
        this.todos = data.data
        this.loading= false
      },
    },
  }
</script>

<style scoped>

</style>