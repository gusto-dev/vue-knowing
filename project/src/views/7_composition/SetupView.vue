<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model="state.num1" @keyup="state.plusNumber" />
      <span>+</span>
      <input type="text" v-model="state.num2" @keyup="state.plusNumber" />
      <span>=</span>
      <span>{{ state.result }}</span>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  components: {},
  data() {
    return {
      // num1: 0,
      // num2: 0,
      // result: 0
    }
  },
  setup() {
    // 실시간 변경사항에 대한 반응성을 가지는 상태를 만들어준다.
    const state = reactive({ num1: 0, num2: 0, result: 0 })

    function plusNumber() {
      state.result = Number(state.num1) + Number(state.num2)
    }

    return {
      state,
      plusNumber
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // plusNumber() {
    //   this.result = Number(this.num1) + Number(this.num2)
    // }
  }
}
</script>
