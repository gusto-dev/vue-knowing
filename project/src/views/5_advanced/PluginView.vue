<template>
  <div>
    <h1>{{ $translate(`${userInfo.lang}.hi`) }}</h1>
    <p>{{ $translate(`${userInfo.lang}.search`) }}</p>
    <button class="btn btn-primary">
      {{ $translate(`${userInfo.lang}.save`) }}
    </button>
    <p>{{ $translate(`${userInfo.lang}.welcome`, userInfo) }}</p>
    <p>{{ $translate(`${userInfo.lang}.email`, userInfo) }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sampleData: '',
      userInfo: {
        name: 'John Doe',
        email: 'john@gmail.com',
        lang: 'en'
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
