<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <template>
        <span style="margin: 8px;" v-on="on">{{ username }}</span>
      </template>
    </template>
    <v-list dense class="thelist">
      <v-subheader color="primary"><h3>{{ username }}</h3></v-subheader>
      <v-list-item dense to="#profile">
          <v-list-item-icon ><v-icon>mdi-account</v-icon></v-list-item-icon>
        <v-list-item-content>Profile</v-list-item-content>
      </v-list-item>
      <v-list-item dense to="#posts">
          <v-list-item-icon ><v-icon>mdi-book-open-outline</v-icon></v-list-item-icon>
        <v-list-item-content>{{ username }}'s Posts</v-list-item-content>
      </v-list-item>
      <v-list-item dense to="#private">
          <v-list-item-icon><v-icon>mdi-message</v-icon></v-list-item-icon>
        <v-list-item-content>Send A Private Message</v-list-item-content>
      </v-list-item>
      <v-list-item to="#add">
          <v-list-item-icon><v-icon>mdi-account-heart</v-icon></v-list-item-icon>
        <v-list-item-content>Add To Friends List</v-list-item-content>
      </v-list-item>
      <v-list-item to="#block">
          <v-list-item-icon><v-icon>mdi-account-alert</v-icon></v-list-item-icon>
        <v-list-item-content>Block User</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
    data: function() {
        return {
          on: false,

        }
    },
    props: {
        username: String
    }
};
</script>
<style scoped>
.thelist {
  }
</style>