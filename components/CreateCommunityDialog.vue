<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn
        :class="
          $vuetify.theme.dark
            ? 'primary--text text--darken-2'
            : 'primary--text text--darken-4'
        "
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left> mdi-plus-circle </v-icon>
        Create Community
      </v-btn>
    </template>
    <v-card>
      <v-tabs v-model="tab">
        <v-tab> Create Local Community </v-tab>
        <v-tab> Add Remote Community </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card-text>
            <v-text-field v-model="name" label="Community Name" hide-details />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="cancel"> cancel </v-btn>
            <v-btn v-bind="loading" color="primary" @click="createLocal">
              create
            </v-btn>
          </v-card-actions>
        </v-tab-item>
        <v-tab-item>
          <v-card-text>
            <v-text-field
              v-model="remoteId"
              label="Remote Community"
              placeholder="community@www.example.com"
              hide-details
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="cancel"> cancel </v-btn>
            <v-btn v-bind="loading" color="primary" @click="createRemote">
              create
            </v-btn>
          </v-card-actions>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      name: '',
      remoteId: '',
      showDialog: false,
      tab: 0,
    }
  },
  computed: {
    ...mapState('communities', ['loading']),
  },
  methods: {
    ...mapActions('communities', ['createCommunity', 'createRemoteCommunity']),
    async createLocal() {
      const [response] = await this.createCommunity({ name: this.name })
      this.$router.push(`/communities/${response.data.community.id}`)
    },
    async createRemote() {
      const [response] = await this.createRemoteCommunity({
        remoteId: this.remoteId,
      })
      this.$router.push(`/communities/${response.data.community.id}`)
    },
    cancel() {
      this.showDialog = false
      this.name = ''
    },
  },
}
</script>
