<template>
  <div class="mt-3">
    <div class="row mb-3">
      <label for="customerName" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <p>{{ customer.name }}</p>
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerCompany" class="col-sm-2 col-form-label"
        >Company</label
      >
      <div class="col-sm-10">
        <p>{{ customer.company }}</p>
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerEmail" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <p>{{ customer.email }}</p>
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerPhone" class="col-sm-2 col-form-label">Phone</label>
      <div class="col-sm-10">
        <p>{{ customer.phone }}</p>
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerAddress" class="col-sm-2 col-form-label"
        >Address</label
      >
      <div class="col-sm-10">
        <p>{{ customer.address }}</p>
      </div>
    </div>
    <button class="btn btn-primary me-1" @click="goToList">List</button>
    <button class="btn btn-secondary" @click="goToEdit">Edit</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      id: '',
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  setup() {},
  created() {
    this.id = this.$route.query.id
  },
  mounted() {
    this.getCustomer()
  },
  unmounted() {},
  methods: {
    async getCustomer() {
      const loader = this.$loading.show()
      this.customer = await this.$get(`/customers/${this.id}`)
      loader.hide()
    },
    goToList() {
      this.$router.push({
        path: '/template/p3/list'
      })
    },
    goToEdit() {
      this.$router.push({
        path: '/template/p3/edit',
        query: { id: this.id }
      })
    }
  }
}
</script>
