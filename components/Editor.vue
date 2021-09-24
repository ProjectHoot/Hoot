<template>
  <div>
    <v-btn @click="preview">
      <v-icon left> mdi-eye </v-icon>
      Preview
    </v-btn>
    <div class="d-flex">
      <v-sheet outlined rounded class="my-4 flex-grow-1">
        <Ink v-model="editorContent" class="editor" />
      </v-sheet>
      <v-sheet
        v-if="previewContent"
        class="flex-grow-1 ma-4 d-flex flex-column"
        outlined
        rounded
      >
        <v-btn tile class="mb-4" text @click="previewContent = ''">
          <v-icon left> mdi-close </v-icon>
          close preview
        </v-btn>
        <div v-html="previewContent"></div>
      </v-sheet>
    </div>
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
      previewContent: '',
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.editorContent)
    },
    async preview() {
      const { content_html: contentHtml } = await this.$axios.$post(
        '/api/misc/render_markdown',
        {
          content_markdown: this.editorContent,
        }
      )
      this.previewContent = contentHtml
    },
  },
}
</script>
<style lang="scss">
.theme--light .editor .cm-line {
  caret-color: #000;
}
</style>
