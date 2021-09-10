<template>
     <v-snackbar
      :value="show"
      :color="color"
      timeout="5000"
      @input="setShow"
    >
      <v-icon v-html="snackbaricon"></v-icon>
      {{ snackbartext }}
    </v-snackbar>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['message/message', 'message/color', 'message/icon', 'message/show'])
    },
    methods:{
        ...mapMutations({'message/show':setShow}),
        
    }
}
</script>