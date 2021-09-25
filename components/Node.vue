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
    try {
      const { software } = await this.$axios.$get(
        `${this.$config.lotide}/instance`
      )
      this.$store.dispatch('message/showMessage', {
        message: `Connected to server ${software.name} version ${software.version}`,
      })
    } catch (err) {
      console.error(err)
    }
  },
}
</script>
