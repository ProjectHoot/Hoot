<template>
    <v-tooltip bottom>
      <template v-slot:activator="{ on: onTooltip, attrs }">
        <v-btn :to="to ? to : ''" @click="onClicked" icon>
        <v-icon
          v-bind="attrs"
          v-on="onTooltip"
          v-html="icon"
          class='text--primary'
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
        hover: String,
        to: Object,
      clickarg: String,

    },
    methods: {
        onClicked: function() {
          if (this.clicked!=null)
            if (this.clickarg!=null)
              this.clicked(this.clickarg);
            else
              this.clicked();

        }
    }
}
</script>