<template>
  <div class="mt-3">
    <div class="row gx-3 gy-2 align-items-center mb-2">
      <div class="col-sm-3">
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
      </div>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="customers"
      v-on:cell-click="onCellClick"
      :sort-options="{
        enabled: true
      }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 5,
        perPageDropdownEnabled: true
      }"
    >
    </vue-good-table>
    <div class="mt-3 customer-form" v-show="selectedId !== ''">
      <div class="row mb-3">
        <label for="customerName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input
            type="text"
            name=""
            id="customerName"
            class="form-control"
            v-model="customer.name"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerCompany" class="col-sm-2 col-form-label"
          >Company</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            name=""
            id="customerCompany"
            class="form-control"
            v-model="customer.company"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="email"
            name=""
            id=""
            class="form-control"
            v-model="customer.email"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerPhone" class="col-sm-2 col-form-label">Phone</label>
        <div class="col-sm-10">
          <input
            type="tel"
            name=""
            id=""
            class="form-control"
            v-model="customer.phone"
            :disabled="!editMode"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerAddress" class="col-sm-2 col-form-label"
          >Address</label
        >
        <div class="col-sm-10">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="????????????"
              aria-label="????????????"
              aria-describedby="postcode"
              v-model="customer.zonecode"
              readonly
            />
            <button
              class="btn btn-outline-secondary"
              id="postcode"
              @click="openPostcode"
              :disabled="!editMode"
            >
              ??????
            </button>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="customer.roadAddress"
            placeholder="??????"
            readonly
          />
          <input
            type="text"
            class="form-control"
            v-model="customer.detailAddress"
            placeholder="????????????"
            :disabled="!editMode"
          />
        </div>
      </div>
      <button
        class="btn btn-primary me-1"
        @click="editMode = true"
        v-show="!editMode"
        :disabled="selectedId === ''"
      >
        Edit
      </button>
      <button
        class="btn btn-secondary me-1"
        v-show="editMode"
        @click="editMode = false"
      >
        Cancel
      </button>
      <button class="btn btn-danger" v-show="editMode" @click="doSave">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          tdClass: 'link-primary'
        },
        {
          label: 'Company',
          field: 'company'
        },
        {
          label: 'Email',
          field: 'email'
        },
        {
          label: 'Phone',
          field: 'phone'
        },
        {
          label: 'Address',
          field: 'address'
        }
      ],
      customers: [],
      searchName: '',
      selectedId: '',
      customer: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        zonecode: '',
        roadAddress: '',
        detailAddress: ''
      },
      editMode: false
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
    onCellClick(params) {
      console.log(params)
      if (params.column.field === 'name') {
        this.selectedId = params.row.id
        this.editMode = false
        this.getCustomer()
      }
    },
    async getCustomer() {
      this.customer = await this.$get(`/customers/${this.selectedId}`)
      console.log(this.customer)
    },
    async doSave() {
      if (this.customer.name === '') {
        return this.$swal(
          'Name??? ???????????????',
          'Name??? ?????? ??????????????????',
          'info'
        )
      }
      if (this.customer.company === '') {
        return this.$swal(
          'Company??? ???????????????',
          'Company??? ?????? ??????????????????',
          'info'
        )
      }
      if (this.customer.email === '') {
        return this.$swal(
          'Email??? ???????????????',
          'Email??? ?????? ??????????????????',
          'info'
        )
      }
      if (this.customer.phone === '') {
        return this.$swal(
          'Phone??? ???????????????',
          'Phone??? ?????? ??????????????????',
          'info'
        )
      }
      if (this.customer.zonecode === '') {
        return this.$swal(
          'Address??? ???????????????',
          'Address??? ?????? ??????????????????',
          'info'
        )
      }
      // ????????? - ?????????, ???????????? ?????? ?????? ??????
      const regexpTel = /^010-\d{4}-\d{4}$/
      const regexpEmail =
        /^([a-z]+\d*)+(\.?[a-z]+\d*)+@([a-z]+\d*)+(\.[a-z]{2,3})+$/
      if (!regexpTel.test(this.customer.phone)) {
        return this.$swal(
          'Phone??? ????????? ???????????? ???????????????',
          '010-0000-0000 ??? ?????? ???????????????',
          'info'
        )
      }
      if (!regexpEmail.test(this.customer.email)) {
        return this.$swal(
          'Email??? ????????? ???????????? ???????????????',
          '???????????? @??? ?????????????????????',
          'info'
        )
      }
      this.$swal({
        title: '?????? ????????? ?????? ???????????????????',
        // text: '????????? ???????????? ????????? ??? ????????????!',
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
          this.customer.address =
            `(${this.customer.zonecode}) ${this.customer.roadAddress} ${this.customer.detailAddress}`.trim()
          const r = await this.$put(
            `/customers/${this.selectedId}`,
            this.customer
          )
          loader.hide()
          if (r.status === 200) {
            this.$swal(
              '?????? ???????????????.',
              '?????? ????????? ?????? ???????????????',
              'success'
            )
            this.editMode = false
          }
        }
      })
    }
  }
}
</script>
<style>
.link-primary {
  text-decoration: underline;
  cursor: pointer;
}
.customer-form {
  border: 1px solid #dcdfe6;
  padding: 10px;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
</style>
