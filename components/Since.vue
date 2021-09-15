<template>
  <span> {{ timeSince }}</span>
</template>

<script>
export default {
  props: {
    timestamp: String,
  },
  computed: {
    timeSince() {
      const ts = Date.parse(this.timestamp)
      if (!Number.isInteger(ts)) return 'NaN'
      const now = Date.now() / 1000
      const then = ts / 1000
      const diff = now - then
      const minutes = diff / 60
      if (minutes < 1) return 'Just Now'
      if (minutes < 60) return Math.round(minutes) + ' Minutes Ago'
      const hours = minutes / 60
      if (hours < 24) return Math.round(hours) + ' Hours Ago'
      const days = hours / 24
      return Math.round(days) + ' Days Ago'
    },
  },
}
</script>
