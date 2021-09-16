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
  async mounted() {
    const { software } = await this.$axios.$get('/api/instance')
    this.$store.dispatch('message/showMessage', {
      message: `Connected to server ${software.name} version ${software.version}`,
    })
  },
}
</script>
