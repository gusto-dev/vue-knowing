<template>
  <div>
    <div :class="{ 'text-red': true, active: true }">클래스 바인딩1</div>
    <div :class="{ 'text-red': hasError, active: isActive }">
      클래스 바인딩1
    </div>
    <button @click="myFunction">버튼</button>
    <br />
    <div :class="class2">클래스 바인딩2</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isActive: false,
      hasError: false,
      class2: ['active', 'text-red']
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    myFunction() {
      this.isActive = true
      this.hasError = true
    }
  }
}
</script>

<style scoped>
.active {
  background-color: green;
  font-weight: bold;
}
.text-red {
  color: red;
}
</style>
