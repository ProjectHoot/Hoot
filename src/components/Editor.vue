<template>
    <div>
         <vue-easymde v-model="editorcontent" :configs="editorconfig" ></vue-easymde>
                         <v-btn @click="Submit">Submit</v-btn>

    </div>
</template>
<script>
import VueEasymde from "vue-easymde";

export default {
    components: {
            VueEasymde,
    },
    props: {
        submit: Function,
    },
    data: function() {
        return {
            editorcontent: '',
      editorconfig: {
          hideIcons:["fullscreen", "side-by-side" ],

      },

        }
    },
    methods: {
        Submit: function() {
            this.submit(this.editorcontent);
        }
    }
    
}
</script>
