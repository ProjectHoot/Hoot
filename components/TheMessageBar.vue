<template>
  <v-snackbar
    v-bind="position"
    :value="show"
    :color="color"
    timeout="5000"
    @input="setShow"
  >
    <v-icon left>
      {{ icon }}
    </v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('message', ['message', 'color', 'icon', 'show', 'position']),
  },
  methods: {
    ...mapMutations('message', { setShow: 'show' }),
  },
}
</script>
