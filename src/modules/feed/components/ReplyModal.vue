<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="1000"
    v-model="value"
    @click:outside="close"
    @keydown.esc="close"
  >
    <template v-slot:default>
      <VueEasyMde v-model="myReply" :class="{ dark }" />

      <v-btn @click="submit" class="pa-2">
        <span v-if="!submitting">Submit</span>
        <v-progress-linear
          v-else
          :color="dark ? 'white' : 'black'"
          indeterminate
        ></v-progress-linear>
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import VueEasyMde from "vue-easymde";

export default {
  name: "ReplyModal",
  components: { VueEasyMde },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    myReply: "",
    submitting: false,
  }),

  methods: {
    ...mapMutations("$feed", ["setReplyingToState"]),
    ...mapActions("$feed", ["submitReply"]),

    /**
     * @param {boolean} override
     * @returns {boolean}
     */
    close(override = false) {
      if (this.submitting && !override) {
        return false;
      }

      this.setReplyingToState({
        type: "",
        id: -1,
      });
    },

    submit() {
      if (this.submitting) {
        return false;
      }

      this.submitting = true;

      this.submitReply({
        author: this.user,
        post: this.post,
        reply: this.myReply,
      })
        .then(() => {
          this.close(true);
        })
        .finally(() => {
          this.submitting = false;
        });
    },
  },

  computed: {
    ...mapState("$auth", ["user"]),
    ...mapState("$preferences", ["dark"]),
    ...mapState("$feed", ["post"]),
  },
};
</script>

<style scoped>
>>> .EasyMDEContainer {
  background: white;
}

>>> .EasyMDEContainer .editor-toolbar {
  color: black;
}

>>> .dark .EasyMDEContainer {
  background: black;
}

>>> .dark .EasyMDEContainer .editor-toolbar {
  color: white;
}

>>> .dark .EasyMDEContainer button.active,
>>> .dark .EasyMDEContainer button:hover {
  background: black;
}
</style>
