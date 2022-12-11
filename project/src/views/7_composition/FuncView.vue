<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" />
      <span>+</span>
      <input type="text" v-model.number="num2" />
      <span>=</span>
      <span>{{ result }}</span>
    </div>
  </div>
</template>
<script>
import { plusNumber2 } from '@/api/common'

export default {
  setup() {
    const { num1, num2, result } = plusNumber2() // 외부 function
    return {
      num1,
      num2,
      result
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
