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
        <button
          class="btn btn-success me-1"
          :disabled="selectedCustomers.length === 0"
          @click="doSave"
        >
          Save
        </button>
        <button
          class="btn btn-danger me-1"
          :disabled="selectedCustomers.length === 0"
          @click="doDelete"
        >
          Delete
        </button>
      </div>
    </div>
    <table class="table table-bordered mt-2">
      <thead>
        <tr>
          <th></th>
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
            <input
              type="checkbox"
              class="form-check-input"
              :value="customer.id"
              v-model="selectedCustomers"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.name"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.company"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.email"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.phone"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.address"
              :disabled="
                selectedCustomers.filter(
                  (selectedId) => selectedId === customer.id
                ).length === 0
              "
            />
          </td>
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
      customers: [],
      searchName: '',
      selectedCustomers: []
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
    async doSave() {
      const selectedCustomerData = []
      this.selectedCustomers.forEach((id) => {
        selectedCustomerData.push(
          this.customers.filter((customer) => customer.id === id)[0]
        )
      })

      let isEmptyName = false
      let isEmptyCompany = false
      let isEmptyEmail = false
      let isEmptyPhone = false
      let isEmptyAddress = false
      const isWrongEmail = []
      const regexpEmail =
        /^([a-z]+\d*)+(\.?[a-z]+\d*)+@([a-z]+\d*)+(\.[a-z]{2,3})+$/
      selectedCustomerData.forEach((customer) => {
        if (customer.name === '') {
          isEmptyName = true
        }
        if (customer.company === '') {
          isEmptyCompany = true
        }
        if (customer.email === '') {
          isEmptyEmail = true
        } else {
          if (!regexpEmail.test(customer.email)) {
            isWrongEmail.push(customer.email)
          }
        }
        if (customer.phone === '') {
          isEmptyPhone = true
        }
        if (customer.address === '') {
          isEmptyAddress = true
        }
      })

      if (isEmptyName) {
        return this.$swal('???????????? ?????? Name??? ????????????.', '', 'info')
      }
      if (isEmptyCompany) {
        return this.$swal('???????????? ?????? Company??? ????????????.', '', 'info')
      }
      if (isEmptyEmail) {
        return this.$swal('???????????? ?????? Email??? ????????????.', '', 'info')
      }
      if (isEmptyPhone) {
        return this.$swal('???????????? ?????? Phone??? ????????????.', '', 'info')
      }
      if (isEmptyAddress) {
        return this.$swal('???????????? ?????? Address??? ????????????.', '', 'info')
      }
      if (isWrongEmail.length > 0) {
        return this.$swal(
          `????????? Email ????????? ????????????. (${isWrongEmail.join(', ')})`,
          '',
          'info'
        )
      }

      this.$swal({
        title: '?????? ????????? ?????? ???????????????????',
        // text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '??????',
        cancelButtonText: '??????'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // ?????? ?????? ??????
          const loader = this.$loading.show()
          let isSuccess = true
          selectedCustomerData.forEach(async (customer) => {
            const r = await this.$put(`/customers/${customer.id}`, customer)
            if (r.status !== 200) {
              isSuccess = false
            }
          })
          loader.hide()

          if (isSuccess) {
            this.$swal(
              '?????? ???????????????.',
              '?????? ????????? ?????? ???????????????',
              'success'
            )
          } else {
            this.$swal('????????? ?????? ???????????????.', '????????? ?????????', 'error')
          }

          this.selectedCustomers = []
          this.doSearch()
        }
      })
    },
    async doDelete() {
      this.$swal({
        title: '?????? ?????? ???????????????????',
        text: '????????? ???????????? ????????? ??? ????????????.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '??????',
        cancelButtonText: '??????'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // ?????? ?????? ??????
          const loader = this.$loading.show()
          let isSuccess = true
          this.selectedCustomers.forEach(async (id) => {
            const r = await this.$delete(`/customers/${id}`)
            if (r.status !== 200) {
              isSuccess = false
            }
          })
          loader.hide()

          if (isSuccess) {
            this.$swal(
              '?????? ???????????????.',
              '?????? ????????? ?????? ???????????????',
              'success'
            )
          } else {
            this.$swal('????????? ?????? ???????????????.', '????????? ?????????', 'error')
          }

          this.selectedCustomers = []
          this.doSearch()
        }
      })
    }
  }
}
</script>
