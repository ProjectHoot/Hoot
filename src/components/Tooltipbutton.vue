<template>
    <v-tooltip bottom>
      <template v-slot:activator="{ on: onTooltip, attrs }">
        <v-btn @click="onClicked" icon>
        <v-icon
          v-bind="attrs"
          v-on="onTooltip"
          v-html="icon"
        >
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
        hover: String
    },
    methods: {
        onClicked: function() {
            this.clicked();
        }
    }
}
</script>