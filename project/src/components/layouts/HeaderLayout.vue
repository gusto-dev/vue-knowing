<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">개발자의 품격</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              @click="goToMenu('/')"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" @click="goToMenu('/about')"
              >About</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              @click="goToMenu('/databinding/string')"
              >String</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
  methods: {
    goToMenu(path) {
      this.$router.push({ path: path })
    }
  }
}
</script>
