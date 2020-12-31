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
            <v-list-item-action>
                <v-btn  v-if="c.your_follow==null" @click="subscribe(c.id)">Subscribe</v-btn>
                <v-btn  v-else @click="unsubscribe(c.id)">Unsubscribe</v-btn>
            </v-list-item-action>
                <v-list-item-content>
            <v-list-item-title><router-link :to="'/c/'+ c.id + '/' + c.name ">{{ c.name }}</router-link> - {{ c.description }}</v-list-item-title>
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

export default {
    data: function() {
        return {
            communities: [],
            filter: '',
            loaded: false,
            clicked: null,
            showpop: false,
            subscribed: false,
        }
    },
    beforeMount: function() {
        this.$http.get(this.$LOTIDE + "/unstable/communities?include_your=true").then(this.gotCommunities);
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
            var me=this.getIndexById(i);
            if (!me) return;
            this.communities[me].data=null;
            var postdata={};
            postdata.try_wait_for_accept=true;
            this.$http.post(this.$LOTIDE + "/unstable/communities/" + i + "/follow", postdata).then(this.showcommunitybyid)
        },
        unsubscribe: function(i) {
            var me=this.getIndexById(i);
            if (!me) return;
            this.communities[me].data=null;
            var postdata={};
            postdata.try_wait_for_accept=true;
            this.$http.post(this.$LOTIDE + "/unstable/communities/" + i + "/unfollow", postdata).then(this.showcommunitybyid)

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