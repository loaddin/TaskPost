<template>
    <v-main>
        <div id="app">
            <v-app id="inspire">
                <v-data-table
                        :headers="headers"
                        :items="posts"
                        sort-by="calories"
                        class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar
                                flat
                        >
                            <v-toolbar-title>Posts</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog
                                    v-model="dialog"
                                    max-width="500px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            color="primary"
                                            dark
                                            class="mb-2"
                                            v-bind="attrs"
                                            v-on="on"
                                    >
                                        New Post
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle | capitalize }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                        cols="12"
                                                >
                                                    <v-text-field
                                                            v-model="editedItem.title"
                                                            label="Title"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                        cols="12"
                                                >
                                                    <v-text-field
                                                            v-model="editedItem.body"
                                                            label="Body"
                                                    ></v-text-field>
                                                </v-col>

                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="close"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                                color="blue darken-1"
                                                text
                                                @click="save"
                                        >
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:no-data>
                        <v-btn
                                color="primary"
                                @click="initialize"
                        >
                            Reset
                        </v-btn>
                    </template>
                </v-data-table>
            </v-app>
        </div>
    </v-main>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "index",
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'userId',
                    align: 'start',
                    sortable: false,
                    value: 'userId',
                },
                { text: 'id', value: 'id' },
                { text: 'title', value: 'title' },
                { text: 'body', value: 'body' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            posts: [],
            editedIndex: -1,
            editedItem: {
                userId:1,
                title:'',
                completed:false
            },
            defaultItem: {
                userId  :1,
                title:'',
                completed:false
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'new post' : 'edit post'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            async initialize () {
                let data = await axios.get('posts')
                this.posts = data.data
            },

            editItem (item) {
                this.editedIndex = this.posts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                axios.delete('posts/'+item.id).then(()=>{
                        this.editedIndex = this.posts.indexOf(item)
                        this.editedItem = Object.assign({}, item)
                        this.dialogDelete = true
                }
                )
                // this.editedIndex = this.posts.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                // this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.posts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    let ind = this.editedIndex

                    axios.put('posts/'+this.editedItem.id,this.editedItem).then((res)=> {
                        Object.assign(this.posts[ind], res.data)
                    })
                } else {
                    axios.post('posts',this.editedItem).then((res)=>{
                        this.posts.push(res.data)
                    })
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>