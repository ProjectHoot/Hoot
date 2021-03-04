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
        initialcontent: String,
    },
    data: function() {
        return {
            editorcontent: this.initialcontent,
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
<style>
</style>