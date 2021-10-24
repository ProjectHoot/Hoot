<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn color="primary" text v-bind="attrs" v-on="on">
        <v-icon left>
          mdi-plus-circle
        </v-icon>
        Create Community
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Create New Community</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="Community Name" filled hide-details />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="cancel">
          cancel
        </v-btn>
        <v-btn v-bind="loading" color="primary" @click="create">
          create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      name: '',
      showDialog: false,
    }
  },
  computed: {
    ...mapState('communities', ['loading']),
  },
  methods: {
    ...mapActions('communities', ['createCommunity']),
    async create() {
      const [response] = await this.createCommunity({ name: this.name })
      this.$router.push(`/communities/${response.data.community.id}`)
    },
    cancel() {
      this.showDialog = false
      this.name = ''
    },
  },
}
</script>
