<template>
  <div>
    <div class="d-flex">
      <v-sheet outlined rounded class="my-4 flex-grow-1">
        <vue-easymde v-model="editorContent" class="editor" />
      </v-sheet>
    </div>
    <v-btn depressed color="primary" @click="submit"> Submit </v-btn>
  </div>
</template>
<script>
export default {
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
.editor {
  .CodeMirror {
    border: none !important;
  }
  .editor-toolbar {
    border: none;
  }
  button {
    &.active,
    &:hover {
      background: inherit;
    }
  }
}

$dark-body-background: #121212;
$dark-border-color: #3a3a3a;
$dark-toolbar-color: #212121;
.theme--dark .editor {
  .vue-easymde,
  .CodeMirror {
    background-color: $dark-body-background;
    color: #fff;
  }
  .editor-preview {
    background: $dark-body-background;
    border: none;
    &-side {
      background-color: $dark-body-background;
      border-left: 1px solid $dark-border-color;
    }
  }
  .CodeMirror-cursor {
    border-left: 1px solid #fff;
  }
  .editor-toolbar {
    background: $dark-toolbar-color;
    border-bottom: 1px solid $dark-border-color;
    button {
      background: $dark-toolbar-color;
    }
  }
  .editor-statusbar {
    border-top: 1px solid $dark-border-color;
  }
}
$light-body-background: #f7f7f7;
$light-border-color: #dadfea;
$light-toolbar-color: #eee;
.theme--light .editor {
  .vue-easymde,
  .CodeMirror {
    background-color: $light-body-background;
    color: #000;
  }
  .editor-preview {
    background: $light-body-background;
    border: none;
    &-side {
      background-color: $light-body-background;
      border-left: 1px solid $light-toolbar-color;
    }
  }
  .CodeMirror-cursor {
    border-left: 1px solid #000;
  }
  .editor-toolbar {
    background-color: $light-toolbar-color;
    border-bottom: 1px solid $light-border-color;
  }
  .editor-statusbar {
    border-top: 1px solid $light-border-color;
  }
}
</style>
