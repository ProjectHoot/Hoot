<template>
    <div>
        <v-text-field label="Filter" v-model="filter"></v-text-field>
    <v-list v-if="loaded">
              <template v-for="(c) in filteredcommunities">
            <v-list-item :key="c.id" @click="showcommunity(c.id)">
            <v-list-item-title>{{ c.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ c.host }}</v-list-item-subtitle>
        </v-list-item>
        </template>
    </v-list>
    <v-list v-else>
        <h2>Loading...</h2></v-list>
        <v-dialog v-if="showpop" v-model="showpop">
            <v-card>
                <v-card-title>{{ activecommunity.name }}</v-card-title>
                <v-card-subtitle> {{ activecommunity.data.description }}</v-card-subtitle>
                <v-card-actions>
                <v-btn text v-if="activecommunity.data.your_follow==null" @click="subscribe(activecommunity.id)">Subscribe</v-btn>
                <v-btn text v-else @click="unsubscribe(activecommunity.id)">Unsubscribe</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
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
        }
    },
    beforeMount: function() {
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
        showcommunity: function(i) {
            this.clicked=i;
            var me=this.getIndexById(i);
            if (this.communities[me].data==null) {
                console.log("Show community " + me);
                this.$http.get(this.$LOTIDE + "/unstable/communities/" + i + "?include_your=true").then(this.gotCommunity);
            } else this.showpop=true;        },
        gotCommunity: function(data) {
            for (var k in this.communities) {
                if (this.communities[k].id==this.clicked) {
                    this.communities[k].data=data.data;
                    this.loaded=false;
                    this.loaded=true;
                    this.showpop=true;
                    return
                }
            }
        },
        showcommunitybyid: function(data) {
            console.log(data);
            this.showcommunity(this.clicked);
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