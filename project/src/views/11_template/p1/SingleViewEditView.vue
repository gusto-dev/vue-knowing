<template>
  <div class="mt-3">
    <div class="row mb-3">
      <label for="selectCustomer" class="col-sm-2 col-form-label"
        >Customer</label
      >
      <div class="col-sm-10">
        <select
          class="form-select"
          id="selectCustomer"
          @change="getCustomer"
          v-model="selectedCustomerId"
        >
          <option value="">==Select Customer==</option>
          <option
            v-for="customer in customers"
            :key="customer.id"
            :value="customer.id"
          >
            {{ customer.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerName" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="customerName"
          v-model="customer.name"
          :disabled="!editmode"
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
          class="form-control"
          id="customerCompany"
          v-model="customer.company"
          :disabled="!editmode"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerEmail" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input
          type="email"
          class="form-control"
          id="customerEmail"
          v-model="customer.email"
          :disabled="!editmode"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerPhone" class="col-sm-2 col-form-label">Phone</label>
      <div class="col-sm-10">
        <input
          type="tel"
          class="form-control"
          id="customerPhone"
          v-model="customer.phone"
          :disabled="!editmode"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="customerAddress" class="col-sm-2 col-form-label"
        >Address</label
      >
      <!-- <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="customerAddress"
          v-model="customer.address"
          :disabled="!editmode"
        />
      </div> -->
      <div class="col-sm-10">
        <div class="input-group mb-1">
          <input
            type="text"
            class="form-control"
            placeholder="????????????"
            aria-label="????????????"
            aria-describedby="postcode"
            v-model="customer.zonecode"
            :disabled="!editmode"
            readonly
          />
          <button
            class="btn btn-outline-secondary"
            id="postcode"
            @click="openPostcode"
            :disabled="!editmode"
          >
            ??????
          </button>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="customer.roadAddress"
          placeholder="??????"
          :disabled="!editmode"
          readonly
        />
        <input
          type="text"
          class="form-control mt-1"
          v-model="customer.detailAddress"
          placeholder="????????????"
          :disabled="!editmode"
        />
      </div>
    </div>
    <button
      class="btn btn-primary me-1"
      @click="editmode = true"
      v-show="!editmode"
      :disabled="selectedCustomerId === ''"
    >
      Edit
    </button>
    <button
      class="btn btn-danger me-1"
      v-show="editmode"
      @click="editmode = false"
    >
      Cancel
    </button>
    <button class="btn btn-secondary me-1" v-show="editmode" @click="doSave">
      Save
    </button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selectedCustomerId: '',
      customers: [],
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
      editmode: false
    }
  },
  setup() {},
  created() {
    this.getCustomersList()
    if (!window.daum) {
      this.loadScript()
    }
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getCustomersList() {
      this.customers = await this.$get('/customers')
    },
    async getCustomer() {
      this.editmode = false
      if (this.selectedCustomerId === 0) {
        this.customer = {
          name: '',
          company: '',
          email: '',
          phone: '',
          address: ''
        }
      } else {
        const loader = this.$loading.show()
        this.customer = await this.$get(`/customers/${this.selectedCustomerId}`)
        loader.hide()
      }
    },
    async doSave() {
      if (this.customer.name === '') {
        return this.$swal(
          'Name??? ???????????????.',
          'Name??? ?????? ??????????????????.',
          'info'
        )
      }
      if (this.customer.company === '') {
        return this.$swal(
          'Company??? ???????????????.',
          'Company??? ?????? ??????????????????.',
          'info'
        )
      }
      if (this.customer.email === '') {
        return this.$swal(
          'Email??? ???????????????.',
          'Email??? ?????? ??????????????????.',
          'info'
        )
      }
      if (this.customer.phone === '') {
        return this.$swal(
          'Phone??? ???????????????.',
          'Phone??? ?????? ??????????????????.',
          'info'
        )
      }
      if (this.customer.address === '') {
        return this.$swal(
          'Address??? ???????????????.',
          'Address??? ?????? ??????????????????.',
          'info'
        )
      }

      /**
       * TODO: ????????? ?????????, ???????????? ?????? ????????????
       */
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
          this.customer.address =
            `(${this.customer.zonecode}) ${this.customer.roadAddress} ${this.customer.detailAddress}`.trim()
          const r = await this.$put(
            `/customers/${this.selectedCustomerId}`,
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
    },
    loadScript() {
      const script = document.createElement('script')
      script.src =
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      document.head.appendChild(script)
    },
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.customer.zonecode = data.zonecode
          this.customer.roadAddress = data.roadAddress
        }
      }).open()
    }
  }
}
</script>
