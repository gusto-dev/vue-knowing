<template>
  <div>
    <p>{{ fullName }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      title: 'Mr.',
      age: 0
    }
  },
  computed: {
    fullName() {
      return `${this.title} ${this.firstName} ${this.lastName}`
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
