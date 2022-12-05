<template>
  <div>
    <p>{{ size }}</p>
    <p>{{ str }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  inject: ['size', 'str'],
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
