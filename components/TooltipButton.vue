<template>
  <v-tooltip bottom>
    <template #activator="{ on: onTooltip, attrs }">
      <v-btn :to="to ? to : ''" icon v-bind="$attrs" v-on="$listeners">
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
    hover: String,
    to: String,
  },
}
</script>
