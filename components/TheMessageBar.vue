<template>
     <v-snackbar
      :value="show"
      :color="color"
      timeout="5000"
      @input="setShow"
    >
      <v-icon>
          {{icon}}
      </v-icon>
      {{ message }}
    </v-snackbar>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
    computed:{
        ...mapState('message', ['message', 'color', 'icon', 'show'])
    },
    methods:{
        ...mapMutations('message', {setShow:'show'}),
        
    }
}
</script>