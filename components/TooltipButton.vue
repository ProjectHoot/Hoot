<template>
  <v-tooltip bottom>
    <template #activator="{ on: onTooltip, attrs }">
      <v-btn :to="to ? to : ''" icon @click="onClicked">
        <v-icon v-bind="attrs" class="text--primary" v-on="onTooltip">
          {{ icon }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ hover }}</span>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    icon: String,
    clicked: Function,
    hover: String,
    to: String,
    clickarg: String,
  },
  methods: {
    onClicked() {
      if (this.clicked !== null)
        if (this.clickarg !== null) this.clicked(this.clickarg)
        else this.clicked()
    },
  },
}
</script>
