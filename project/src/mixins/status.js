export default {
  mounted() {
    // 현재 시간/분/초, 사용자 아이디, 현재 route path를 서버 데이터베이스에 저장
    console.log(this.$route.path)
  },
  unmounted() {
    // 현재 시간/분/초, 사용자 아이디, 현재 route path를 서버 데이터베이스에 저장
    console.log(this.$route.path)
  }
}
