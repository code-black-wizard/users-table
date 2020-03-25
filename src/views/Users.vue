<template>
  <div v-if="loading">
    <div class="text-left pb-2">
      <v-col cols="6">
        <v-text-field
          v-model.trim="search"
          label="Search by name"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </div>
    <v-data-table
      :headers="headers"
      :items="getUsers"
      :items-per-page="getUsers.length"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr class="table-row" @click="goToUser(item.id)">
          <td>{{ item.id }}</td>
          <td>{{ item.fullName }}</td>
          <td>{{ item.email }}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="pagination.per_page"
            :items="[5, 10, 15]"
          >
          </v-select>
        </v-col>
        <v-col cols="6">
          <v-pagination 
            v-model="pagination.page"
            :length="total_pages"
          >
          </v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      headers: [
        { text: 'ID', sortable: false, value: 'id' },
        { text: 'Name', sortable: false, value: 'fullName' },
        { text: 'Email', sortable: false, value: 'email' }
      ],
      users: [],
      pagination: {
        page: 1,
        per_page: 5
      },
      total_pages: null,
      search: ''
    }
  },
  methods: {
    fetchUsers () {
      this.$http.get('https://reqres.in/api/users', {
        params: this.pagination
      })
        .then(res => {
          res.data.data.forEach(user => {
            user.fullName = `${user.first_name} ${user.last_name}`
          })
          this.users = res.data.data
          this.total_pages = res.data.total_pages
          this.loading = true
          // console.log(this.users)
        })
        .catch(err => {
          console.log(err)
        })
    },
    reFetchUsers () {
      this.pagination.page = 1
      this.fetchUsers()
    },
    goToUser (id) {
      this.$router.push({ path: `/user/${id}` })
    }
  },
  computed: {
    getUsers () {
      return this.users.filter(user => {
        return user.fullName.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  watch: {
    'pagination.per_page'() {
      this.reFetchUsers()
    },
    'pagination.page'() {
      this.fetchUsers()
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style scoped>
  .table-row {
    cursor: pointer;
  }
</style>
