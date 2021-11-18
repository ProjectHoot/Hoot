<template>
  <v-row justify="center">
    <v-col md="6">
      <v-row>
        <v-col v-if="$auth.loggedIn">
          <CreateCommunityDialog />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="filter"
            label="Filter"
            rounded
            filled
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details
          />
          <v-switch v-model="subscribed" label="Show Subscribed Communities" />
        </v-col>
      </v-row>
      <v-list>
        <template v-for="c in filteredCommunities">
          <v-list-item v-if="subscribed ? c.your_follow : true" :key="c.id">
            <v-list-item-action v-if="$auth.loggedIn">
              <TooltipButton
                v-if="c.your_follow === null || c.your_follow === false"
                icon="mdi-plus-circle-outline"
                hover="Subscribe"
                @click="subscribe(c.id)"
              />
              <TooltipButton
                v-else
                icon="mdi-minus-circle"
                hover="Unsubscribe"
                @click="unsubscribe(c.id)"
              />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <nuxt-link
                  :class="
                    $vuetify.theme.dark
                      ? 'primary--text text--darken-2'
                      : 'primary--text text--darken-4'
                  "
                  :to="'/communities/' + c.id"
                >
                  {{ c.name }}
                </nuxt-link>
                - {{ c.description }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ c.host }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
import TooltipButton from '@/components/TooltipButton'
import CreateCommunityDialog from '~/components/CreateCommunityDialog.vue'

export default {
  components: { TooltipButton, CreateCommunityDialog },
  async asyncData({ $auth, $axios, $config }) {
    let data = []
    if ($auth.loggedIn) {
      const { items } = await $axios.$get(`/communities?include_your=true`)
      data = items
    } else {
      const { items } = await $axios.$get(`/communities`)
      data = items
    }
    let communities = []
    if (data) {
      communities = data.map((community) => ({
        ...community,
        data: null,
      }))
    }
    return { communities }
  },
  data() {
    return {
      filter: '',
      clicked: null,
      showpop: false,
      subscribed: false,
      me: null,
    }
  },
  computed: {
    filteredCommunities() {
      if (this.filter.length > 0) {
        return this.communities.filter((community) =>
          this.filter
            .toLocaleLowerCase()
            .includes(community.name.toLocaleLowerCase())
        )
      } else return this.communities
    },
    activecommunity() {
      if (this.clicked === null) return false
      const me = this.getIndexById(this.clicked)
      return this.communities[me]
    },
  },
  methods: {
    getIndexById(i) {
      for (const k in this.communities) {
        if (this.communities[k].id === i) return k
      }
      return null
    },
    subscribe(i) {
      this.me = this.getIndexById(i)
      if (!this.me) return
      const postdata = {}
      postdata.try_wait_for_accept = true
      this.$axios
        .post(`/communities/${i}/follow`, postdata)
        .then(this.gotsubscribed)
    },
    gotunsubscribed() {
      this.communities[this.me].your_follow = false
    },
    gotsubscribed() {
      this.communities[this.me].your_follow = true
    },
    unsubscribe(i) {
      this.me = this.getIndexById(i)
      if (!this.me) return
      const postdata = {}
      postdata.try_wait_for_accept = true
      this.$axios
        .post(`/communities/${i}/unfollow`, postdata)
        .then(this.gotunsubscribed)
    },
  },
}
</script>
