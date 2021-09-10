<template>
    <div>
    </div>
    
</template>
<script>
export default {
    mounted: function() {
        this.$http.get(this.$LOTIDE +"/unstable/instance").then(this.gotServerInfo);
    },
    methods: {
        gotServerInfo: function(d) {
            this.$store.dispatch("message/showMessage", {message: "Connected to server " + d.data.software.name + " version " + d.data.software.version});
}
    },
    data: function() {
        return {
        theInfo: "Loading"
    }
    }

}
</script>