<template>
  <div>
    <v-sheet outlined rounded class="my-4">
      <Ink v-model="editorContent" class="editor" />
    </v-sheet>
    <v-btn @click="submit"> Submit </v-btn>
  </div>
</template>
<script>
import Ink from '@writewithocto/vue-ink'
export default {
  components: {
    Ink,
  },
  props: {
    initialContent: String,
  },
  data() {
    return {
      editorContent: this.initialContent,
      editorconfig: {
        hideIcons: ['fullscreen', 'side-by-side'],
      },
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.editorContent)
    },
  },
}
</script>
<style lang="scss">
.theme--light .editor .cm-line {
  caret-color: #000;
}
</style>
