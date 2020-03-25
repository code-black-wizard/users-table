<template>
  <div>
    <div>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </div>
    <div v-if="loading">
      <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          :src="user.avatar"
        >
          <v-card-title>{{ user.email }}</v-card-title>
        </v-img>
        <v-card-text class="text--primary">
          <div>{{ `${user.first_name} ${user.last_name}` }}</div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      breadcrumbs: [
        { text: 'Users list', disabled: false, to: { path: '/' } },
        { text: 'User details', disabled: true }
      ],
      user: {}
    }
  },
  created() {
    this.$http.get('https://reqres.in/api/users', {
      params: {
        id: this.$route.params.id
      }
    })
      .then(res => {
        this.user = res.data.data
        this.loading = true
        // console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>