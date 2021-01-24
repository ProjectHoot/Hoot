<template>
  <v-tooltip :top="top" :bottom="bottom" :left="left" :right="right">
    <template v-slot:activator="{ on }">
      <span v-on="on">{{ label }}</span>
    </template>

    <span>{{ value }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    value: {
      type: null,
      required: true
    },
    label: {
      type: null,
      required: true
    },
    top: {
      type: Boolean,
    },
    bottom: {
      type: Boolean,
    },
    left: {
      type: Boolean,
    },
    right: {
      type: Boolean,
    },
  },
};
</script>
