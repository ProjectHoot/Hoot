<template>
  <v-dialog max-width="600px">
    <template #activator="{ on }">
      <template>
        <span @click="loaduser" v-on="on">{{ username }}</span>
      </template>
    </template>
    <template #default="dialog">
      <v-col>
        <v-card v-if="loaded">
          <v-card-title class="primary white--text">
            {{ username }}</v-card-title
          >
          <v-divider />
          <v-card-subtitle>{{ username }}@{{ user.host }}</v-card-subtitle>
          <v-card-text>
            <h2>Description</h2>
            {{ user.description }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <h2>Notes</h2>
            <v-textarea v-model="your_note"></v-textarea>
          </v-card-text>
          <v-card-actions
            ><v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn v-if="your_note !== your_note_initial" @click="updatenote"
              >Save Changes</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </template>
  </v-dialog>
</template>
<script>
export default {
  props: {
    username: String,
    userid: Number,
  },
  data() {
    return {
      on: false,
      loaded: false,
      user: {},
      notechanged: false,
      your_note: '',
      your_note_initial: '',
    }
  },

  methods: {
    gotuser(d) {
      this.user = d.data
      if (this.user.your_note === null) {
        this.user.your_note = {}
        this.user.your_note.content_text = ''
      }
      this.your_note = this.user.your_note.content_text
      this.your_note_initial = this.user.your_note.content_text

      if (this.user.description === '') this.user.description = 'No description'
      this.loaded = true
    },
    loaduser() {
      this.$axios
        .get(
          `${this.$config.lotide}/users/` + this.userid + '?include_your=true'
        )
        .then(this.gotuser)
    },
    updatenote() {
      const p = {}
      p.content_text = this.your_note
      this.$axios
        .put(`${this.$config.lotide}/users/` + this.userid + '/your_note', p)
        .then(this.updatednote)
        .catch(this.notupdated)
    },
    updatednote() {
      console.log('Updated')
      this.your_note_initial = this.your_note
      this.$store.dispatch('message/showMessage', { message: 'Updated notes' })
    },
    notupdated() {
      console.log('Not Updated')
    },
  },
}
</script>
