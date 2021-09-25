// importing the easymde component for client side rendering only
import Vue from 'vue'
import VueEasymde from 'vue-easymde'
import 'easymde/dist/easymde.min.css'
export default function () {
  Vue.component('vue-easymde', VueEasymde)
}
