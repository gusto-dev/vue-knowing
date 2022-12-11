<template>
  <div>
    <div>{{ todos }}</div>
    <div>할일 목록 전체수 : {{ todosCount }}</div>
    <div>완료 목록수 : {{ doneTodosCount }}</div>
    <div>미완료 목록수 : {{ notDoneTodosCount }}</div>
    <div>
      <label for="todo" class="form-label">할일</label>
      <input type="text" id="todo" v-model="todo" class="form-control" />
      <button class="btn btn-primary" @click="addItem">추가 (mutations)</button>
      <button class="btn btn-primary" @click="addItem2">추가 (actions)</button>
    </div>
    <div>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>할일</th>
            <th>완료여부</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="todo.id" v-for="todo in todos">
            <td>{{ todo.id }}</td>
            <td>{{ todo.title }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  :checked="!todo.done"
                  @change="doneCheck(todo.id, $event)"
                />
              </div>
            </td>
            <!-- <td>{{ todo.done ? '완료' : '미완료' }}</td> -->
            <td>
              <button
                class="btn btn-danger btn-sm"
                @click="removeItem(todo.id)"
              >
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      todo: ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todo.todos
    },
    todosCount() {
      return this.$store.getters['todo/todosCount']
    },
    doneTodosCount() {
      return this.$store.getters['todo/doneTodosCount']
    },
    notDoneTodosCount() {
      return this.$store.getters['todo/notDoneTodosCount']
    }
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    addItem() {
      this.$store.commit('todo/add', { id: 4, title: this.todo, done: false })
      this.todo = ''
    },
    removeItem(id) {
      this.$store.commit('todo/remove', id)
    },
    doneCheck(id, event) {
      this.$store.commit('todo/doneYN', { id: id, done: !event.target.checked })
    },
    addItem2() {
      this.$store.dispatch('todo/add', { id: 4, title: this.todo, done: false })
      this.todo = ''
    }
  }
}
</script>
