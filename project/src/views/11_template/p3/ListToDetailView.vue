<template>
  <div class="mt-3">
    <div class="row gy-2 gx-3 align-items-center">
      <div class="col-auto">
        <label class="visually-hidden" for="customerName">Name</label>
        <input
          type="text"
          class="form-control"
          id="customerName"
          placeholder="Customer Name"
          v-model="searchName"
          @keyup.enter="doSearch"
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary me-1" @click="doSearch">Search</button>
        <button class="btn btn-secondary me-1" @click="goToCreate">
          Create
        </button>
        <button class="btn btn-success me-1" @click="downloadExcel">
          Download
        </button>
      </div>
    </div>
    <table class="table table-striped table-bordered mt-2">
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="customer.id" v-for="customer in customers">
          <td>
            <a class="link-primary" @click="goToDetail(customer.id)">{{
              customer.name
            }}</a>
          </td>
          <td>{{ customer.company }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      headers: [
        { title: 'Name', key: 'name' },
        { title: 'Company', key: 'company' },
        { title: 'Email', key: 'email' },
        { title: 'Phone', key: 'phone' },
        { title: 'Address', key: 'address' }
      ],
      customers: [],
      searchName: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async doSearch() {
      const loader = this.$loading.show()
      this.customers = await this.$get(
        `/customers?name_like=${this.searchName}`
      )
      loader.hide()
    },
    goToDetail(customerId) {
      // this.$router.push({ name: 'DetailView', params: { id: customerId } })
      this.$router.push({
        path: '/template/p3/detail',
        query: { id: customerId }
      })
    },
    goToCreate() {
      this.$router.push({
        path: '/template/p3/create'
      })
    },
    downloadExcel() {
      this.$excelFromTable(this.headers, this.customers, 'customers', {})
    }
  }
}
</script>
