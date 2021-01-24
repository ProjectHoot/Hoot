<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="1000"
    v-model="value"
    @click:outside="close"
  >
    <template v-slot:default>
      <VueEasyMde v-model="myReply" :class="{ dark }" />

      <v-btn @click="submit">Submit</v-btn>
    </template>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
  }),

  methods: {
    ...mapMutations("$feed", ["setReplyingToId"]),

    close() {
      this.setReplyingToId(-1);
    },

    submit() {},
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
</style>
