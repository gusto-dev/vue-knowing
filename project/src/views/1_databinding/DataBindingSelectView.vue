<template>
  <div>
    <select name="" v-model="sampleData">
      <option value="">전체</option>
      <option value="02">서울</option>
      <option value="031">경기</option>
    </select>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sampleData: '02'
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
