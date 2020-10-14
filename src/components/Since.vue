<template>
    <span>{{ timeSince }}</span>
</template>

<script>
    export default {
    props: {
        Timestamp: String,
    },
    computed: {
            timeSince: function() {
                var ts=Date.parse(this.Timestamp);
                if (!Number.isInteger(ts)) return "NaN";
                var now = Date.now() / 1000;
                var then = ts/1000;
                var diff = now - then;
                var minutes = diff / 60;
                if (minutes < 1) return ("Just Now");
                if (minutes < 60) return (Math.round(minutes) + " Minutes Ago");
                var hours = minutes / 60;
                if (hours < 24) return (Math.round(hours) + " Hours Ago");
                var days = hours / 24;
                return (Math.round(days) + " Days Ago");
            },

    }
        
}
</script>