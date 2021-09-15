<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      theInfo: 'Loading',
    }
  },
  mounted() {
    this.$axios.get('/api/instance').then(this.gotServerInfo)
  },
  methods: {
    gotServerInfo(d) {
      this.$store.dispatch('message/showMessage', {
        message:
          'Connected to server ' +
          d.data.software.name +
          ' version ' +
          d.data.software.version,
      })
    },
  },
}
</script>
