<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                permanent
                expand-on-hover
                app
        >
            <v-list dense>

                <v-list-item to="/">
                    <v-list-item-action>
                        <v-icon>mdi-desktop-mac</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
                <v-list-item to="/about">
                    <v-list-item-action>
                    <v-icon>mdi-file-powerpoint</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Post</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!--
            <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-1" dark>

            </v-app-bar>-->
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp"
                   app color="blue darken-1" dark
                   class="pb-2"
        >
            <!-- <v-app-bar-nav-icon>Menu</v-app-bar-nav-icon>-->

        </v-app-bar>

    </div>
</template>

<script>

    export default {
        name: "NavBar",
        computed: {

        },
        data() {
            return{
                drawer:{}
            }
        },
        created() {

        },
        methods: {
        }
    };
</script>
<style lang="scss">
    .grid-container {
        display: grid;
        grid-template-columns: 1fr auto;
        color: #fff;
        justify-content: center;
        align-items: center;
        grid-gap: 2px;
    }

    .bread {
        margin-top: 4em;
    }

    .v-breadcrumbs {
        background-color: #f9f7f72e !important;
    }

    .v-avatar {
        margin-left: -0.4em;

        .v-icon {
            color: #1e88e5;
            font-size: 2.5em;
        }
    }
</style>