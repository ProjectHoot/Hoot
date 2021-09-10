<template>
<v-container>
<v-row>
    <v-col cols="2">
        <v-switch v-model="subscribed" label="Show Subscribed Communities"></v-switch>
    </v-col>
    <v-col cols="6">
        <v-text-field label="Filter" v-model="filter"></v-text-field>
    </v-col>
</v-row>
    <v-list v-if="loaded">
              <template v-for="(c) in filteredcommunities">
            <v-list-item :key="c.id"  v-if="subscribed ? c.your_follow : true">
            <v-list-item-action v-if="$store.state.LoggedIn">
              <tooltipbutton v-if="c.your_follow==null || c.your_follow==false" :clicked="subscribe" :clickarg="String(c.id)" icon="mdi-plus-box" hover="Subscribe"></tooltipbutton>
              <tooltipbutton v-else :clicked="unsubscribe" :clickarg="String(c.id)" icon="mdi-trash-can" hover="Unsubscribe"></tooltipbutton>
            </v-list-item-action>
                <v-list-item-content>
            <v-list-item-title><nuxt-link :to="'/c/'+ c.id + '/' + c.name ">{{ c.name }}</nuxt-link> - {{ c.description }}</v-list-item-title>
            <v-list-item-subtitle>{{ c.host }}</v-list-item-subtitle>
                </v-list-item-content>
        </v-list-item>
        </template>
    </v-list>
    <v-list v-else>
        <h2>Loading...</h2></v-list>

    </v-container>
</template>
<script>
import Tooltipbutton from "@/components/Tooltipbutton";

export default {
  components: { Tooltipbutton, },
    data: function() {
        return {
            communities: [],
            filter: '',
            loaded: false,
            clicked: null,
            showpop: false,
            subscribed: false,
            me: null
        }
    },
    beforeMount: function() {
        if (this.$store.state.LoggedIn)
            this.$http.get(this.$LOTIDE + "/unstable/communities?include_your=true").then(this.gotCommunities);
        else 
        this.$http.get(this.$LOTIDE + "/unstable/communities").then(this.gotCommunities);
    },
    methods: {
        gotCommunities: function(d) {
            this.communities=d.data;
            for (var k in this.communities) {
                this.communities[k].data=null;
            }
            this.loaded=true;
        },
        getIndexById: function(i) {
            for (var k in this.communities) {
                if (this.communities[k].id==i) return k
            }
            return null;
        },
        subscribe: function(i) {
            this.me=this.getIndexById(i);
            if (!this.me) return;
            var postdata={};
            postdata.try_wait_for_accept=true;
            this.$http.post(this.$LOTIDE + "/unstable/communities/" + i + "/follow", postdata).then(this.gotsubscribed);
        },
        gotunsubscribed: function() {
            this.communities[this.me].your_follow=false;
        },
        gotsubscribed: function() {
            this.communities[this.me].your_follow=true;
        },
        unsubscribe: function(i) {
            this.me=this.getIndexById(i);
            if (!this.me) return;
            var postdata={};
            postdata.try_wait_for_accept=true;
            this.$http.post(this.$LOTIDE + "/unstable/communities/" + i + "/unfollow", postdata).then(this.gotunsubscribed);

        }
    },
    computed: {
        filteredcommunities: function() {
            var out=[];
            for (var k in this.communities) {
                if (this.communities[k].name.includes(this.filter)) {
                    out.push(this.communities[k]);
                }
            }
            out.sort();
            return out;
        },
        activecommunity: function() {
            if (this.clicked==null) return false;
            var me=this.getIndexById(this.clicked);
            return this.communities[me];
        }
    }
    
}
</script>