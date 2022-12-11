<template>
  <div></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {
    if (!window.Kakao.Auth.getAccessToken()) {
      this.$router.push({ path: '/login/kakao' })
    }
  },
  mounted() {
    console.log('acces token', window.Kakao.Auth.getAccessToken())
  },
  unmounted() {},
  methods: {}
}
</script>
