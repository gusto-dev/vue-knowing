<template>
  <div>
    <div id="naverIdLogin">
      <a id="naverIdLogin_loginButton" href="#" role="button"
        ><img src="https://static.nid.naver.com/oauth/big_g.PNG" width="320"
      /></a>
    </div>
    <button class="btn btn-danger" @click="naverLogout($event)">
      로그아웃
    </button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      email: '',
      naverLogin: null
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'SPOXmk8411vQRDK_F8dM',
      callbackUrl: 'http://localhost:8080/login/naver',
      isPopup: true,
      loginButton: { color: 'green', type: 3, height: 60 }
    })
    this.naverLogin.init()
    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log(this.naverLogin.user.getEmail())
        console.log(this.naverLogin.user.getNickName())
        console.log(this.naverLogin.user.getGender())
        this.email = this.naverLogin.user.getEmail()
      }
    })
  },
  unmounted() {},
  methods: {
    naverLogout(event) {
      event.preventDefault()
      this.naverLogin.logout()
    }
  }
}
</script>
