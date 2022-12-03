<template>
  <div>
    <ul>
      <li>
        <input type="radio" id="a" value="a" v-model="sampleData" />
        <label for="a">aaa</label>
      </li>
      <li>
        <input type="radio" id="b" value="b" v-model="sampleData" />
        <label for="b">bbb</label>
      </li>
      <li>
        <input type="radio" id="c" value="c" v-model="sampleData" />
        <label for="c">ccc</label>
      </li>
    </ul>
    <p>{{ sampleData }}</p>
  </div>
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
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
