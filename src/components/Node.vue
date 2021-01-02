<template>
    <div>
    </div>
    
</template>
<script>
import EventBus from '../EventBus.js'
export default {
    mounted: function() {
        this.$http.get(this.$LOTIDE +"/unstable/instance").then(this.gotServerInfo);
    },
    methods: {
        gotServerInfo: function(d) {
            EventBus.$emit("message", "Connected to server " + d.data.software.name + " version " + d.data.software.version);
}
    },
    data: function() {
        return {
        theInfo: "Loading"
    }
    }

}
</script>