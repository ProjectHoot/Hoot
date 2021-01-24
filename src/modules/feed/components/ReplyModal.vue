<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="1000"
    v-model="value"
    @click:outside="close"
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
    ...mapMutations("$feed", ["setReplyingToId"]),
    ...mapActions("$feed", ["submitReply"]),

    close() {
      this.setReplyingToId(-1);
    },

    submit() {
      if (this.submitting) {
        return false;
      }

      this.submitting = true;

      this.submitReply(this.myReply)
        .then(() => {
          this.close();
        })
        .finally(() => {
          this.submitting = false;
        });
    },
  },

  computed: {
    ...mapState("$preferences", ["dark"]),
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
