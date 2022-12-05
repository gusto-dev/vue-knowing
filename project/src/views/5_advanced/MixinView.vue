<template>
  <div></div>
</template>

<script>
import Status from '@/mixins/status'

export default {
  components: {},
  mixins: [Status],
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {
    console.log(this.$convertDateFormat('20221205', 'YYYY-MM-DD'))

    this.getCustomers()

    console.log(this.$convertNumberFormat(1254820, '#,###'))
    console.log(this.$convertNumberFormat(2547500, '#,###.#0'))
    console.log(this.$convertNumberFormat(2547500.4, '#,###.#0'))
    console.log(this.$convertNumberFormat(2547500.4, '#,###.##'))
    console.log(this.$convertNumberFormat(-2547500.4, '#,###.##'))
    console.log(this.$convertNumberFormat(-2547500.4, '$#,###.##'))
    console.log(this.$convertNumberFormat(125.23, '#,###.#0%'))
    console.log(this.$convertNumberFormat(125.5, '#,###.#0%'))
    console.log(this.$convertNumberFormat(125, '#,###원'))
  },
  unmounted() {},
  methods: {
    async getCustomers() {
      const customers = await this.$get('http://localhost:3000/posts')
      console.log(customers)
    }
  }
}
</script>
