<template>
  <v-container v-if="loaded">
    <v-row v-if="$auth.loggedIn">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Change Password</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="currentPassword"
              type="password"
              label="Current Password"
            />
            <v-text-field
              v-model="newPassword"
              type="password"
              label="New Password"
            />
            <v-alert v-if="newPassword.length !== 0 && newPassword.length < 6">
              <v-icon>mdi-alert-circle</v-icon>Must be at least 6 characters
            </v-alert>
            <v-text-field
              v-model="verifyPassword"
              type="password"
              label="Verify New Password"
            />
            <v-alert v-if="newPassword !== verifyPassword">
              <v-icon>mdi-alert-circle</v-icon>New passwords don't match
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="invalidPass" @click="submitChangePassword">
              Apply
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Change Your Description</v-card-title>
          <v-card-text>
            <v-textarea v-model="description" />
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="description === initialdescription"
              @click="submitDescription"
            >
              Apply
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <h1>You must be logged in to have a profile!</h1>
    </v-row>
  </v-container>
  <v-container v-else>
    <h1>Loading profile</h1>
  </v-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      verifyPassword: '',
      loaded: false,
      description: '',
      initialdescription: '',
    }
  },
  computed: {
    invalidPass() {
      return (
        this.verifyPassword !== this.newPassword || this.newPassword.length < 6
      )
    },
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$axios
        .get(`${this.$config.lotide}/users/~me`)
        .then(this.gotProfile)
        .catch(this.failprofile)
    } else {
      this.loaded = true
    }
  },
  methods: {
    gotProfile(d) {
      this.initialdescription = d.data.description
      this.description = d.data.description
      this.loaded = true
    },
    submitDescription() {
      const m = {}
      m.description = this.description
      this.$axios
        .patch(`${this.$config.lotide}/users/~me`, m)
        .then(this.gotDescriptionChanged)
        .catch(this.failDescriptionChange)
    },
    gotDescriptionChanged() {
      this.$store.dispatch('message/showMessage', {
        message: 'Description updated.',
      })
    },
    failDescriptionChange(e) {
      this.$store.dispatch('message/showError', {
        message: 'Description update failed: ' + e.data,
      })
    },
    submitChangePassword() {
      if (this.verifyPassword !== this.newPassword) {
        this.$store.dispatch('message/showError', {
          message: "New passwords don't match",
        })
        return
      }
      if (this.newPassword.length < 6) {
        this.$store.dispatch('message/showError', {
          message: 'New password must be at least 6 characters',
        })
        return
      }
      const m = {}
      m.password = this.newPassword
      this.$axios
        .patch(`${this.$config.lotide}/users/~me`, m)
        .then(this.gotChangedPassword)
        .catch(this.failChangePassword)
    },
    gotChangedPassword() {
      this.$store.dispatch('message/showMessage', {
        message: 'Password has been updated',
      })
    },
    failChangePassword() {
      this.$store.dispatch('message/showError', {
        message: 'Password change failed',
      })
    },
  },
}
</script>
