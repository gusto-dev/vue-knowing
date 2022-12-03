<template>
  <div>
    <input type="text" v-bind:value="sampleData" readonly />
    <input type="text" :value="sampleData" readonly />
    <br />
    <img :src="imgSrc" alt="" width="300" height="300" />
    <br />
    <input type="search" v-model="txt" />
    <button :disabled="txt === ''">조회</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sampleData: 'john',
      imgSrc:
        'https://i.pinimg.com/originals/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg',
      txt: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
