<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-switch v-model="subscribed" label="Show Subscribed Communities" />
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="filter" label="Filter" />
      </v-col>
    </v-row>
    <v-list v-if="loaded">
      <template v-for="c in filteredcommunities">
        <v-list-item v-if="subscribed ? c.your_follow : true" :key="c.id">
          <v-list-item-action v-if="$auth.loggedIn">
            <TooltipButton
              v-if="c.your_follow === null || c.your_follow === false"
              icon="mdi-plus-box"
              hover="Subscribe"
              @click="subscribe(c.id)"
            />
            <TooltipButton
              v-else
              icon="mdi-trash-can"
              hover="Unsubscribe"
              @click="unsubscribe(c.id)"
            />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link :to="'/communities/' + c.id">
                {{ c.name }}
              </nuxt-link>
              - {{ c.description }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ c.host }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-list v-else>
      <h2>Loading...</h2>
    </v-list>
  </v-container>
</template>
<script>
import TooltipButton from '@/components/TooltipButton'

export default {
  components: { TooltipButton },
  data() {
    return {
      communities: [],
      filter: '',
      loaded: false,
      clicked: null,
      showpop: false,
      subscribed: false,
      me: null,
    }
  },
  computed: {
    filteredcommunities() {
      const out = []
      for (const k in this.communities) {
        if (this.communities[k].name.includes(this.filter)) {
          out.push(this.communities[k])
        }
      }
      out.sort()
      return out
    },
    activecommunity() {
      if (this.clicked === null) return false
      const me = this.getIndexById(this.clicked)
      return this.communities[me]
    },
  },
  beforeMount() {
    if (this.$auth.loggedIn)
      this.$axios
        .get('/api/communities?include_your=true')
        .then(this.gotCommunities)
    else this.$axios.get('/api/communities').then(this.gotCommunities)
  },
  methods: {
    gotCommunities(d) {
      this.communities = d.data
      for (const k in this.communities) {
        this.communities[k].data = null
      }
      this.loaded = true
    },
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
        .post('/api/communities/' + i + '/follow', postdata)
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
        .post('/api/communities/' + i + '/unfollow', postdata)
        .then(this.gotunsubscribed)
    },
  },
}
</script>
