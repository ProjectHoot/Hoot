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
    <v-list>
      <template v-for="c in filteredCommunities">
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
  </v-container>
</template>
<script>
import TooltipButton from '@/components/TooltipButton'

export default {
  components: { TooltipButton },
  async asyncData({ $auth, $axios }) {
    let data
    if ($auth.loggedIn) {
      data = await $axios.$get('/api/communities?include_your=true')
    } else {
      data = await $axios.$get('/api/communities')
    }
    const communities = data.items.map((community) => ({
      ...community,
      data: null,
    }))
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
        .post(`/api/communities/${i}/follow`, postdata)
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
        .post(`/api/communities/${i}/unfollow`, postdata)
        .then(this.gotunsubscribed)
    },
  },
}
</script>
