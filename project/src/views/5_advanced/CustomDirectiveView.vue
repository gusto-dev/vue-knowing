<template>
  <div>
    <div>
      <label for="email" class="form-label">이메일</label>
      <input type="email" id="email" class="form-control" v-focus />
    </div>
    <div>
      <label for="password" class="form-label">비밀번호</label>
      <input type="password" id="password" class="form-control" />
    </div>
    <div>
      <button class="btn btn-primary">로그인</button>
    </div>
    <div v-color="color">하이</div>
    <div v-demo="{ color: 'blue', text: 'hello!!!' }"></div>
    <div>
      <input type="text" v-lowercase />
    </div>
    <div>
      <input type="text" v-uppercase />
    </div>
    <div>
      <input type="text" v-number v-model="fontSize" />
      <input type="number" />
    </div>
    <div>
      <input type="text" v-korean />
      <p v-font-size="fontSize">Uses font-size directive</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  directives: {
    color: {
      mounted(el, binding) {
        // console.log(el, binding.value)
        el.style.backgroundColor = binding.value
      }
    },
    demo: {
      mounted(el, binding) {
        el.innerText = binding.value.text
        el.style.color = binding.value.color
      }
    }
  },
  data() {
    return {
      sampleData: '',
      color: 'red',
      fontSize: 20
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
