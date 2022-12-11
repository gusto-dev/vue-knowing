export const todo = {
  namespaced: true,
  // 중앙 데이터 저장소
  state() {
    return {
      todos: [
        { id: 1, title: 'todo 1', done: true },
        { id: 2, title: 'todo 2', done: false },
        { id: 3, title: 'todo 3', done: false }
      ]
    }
  },
  // Store를 위한 computed라고 생각하면 됨.
  getters: {
    todosCount(state) {
      return state.todos.length
    },
    doneTodosCount(state) {
      return state.todos.filter((todo) => todo.done).length
    },
    notDoneTodosCount(state) {
      return state.todos.filter((todo) => !todo.done).length
    }
  },
  // Store의 데이터를 변경할 때 사용하는 함수
  mutations: {
    add(state, payload) {
      state.todos.push(payload)
    },
    remove(state, payload) {
      const index = state.todos.findIndex((todo) => todo.id === payload.id)
      state.todos.splice(index, 1)
    },
    doneYN(state, doneStatus) {
      state.todos.filter((todo) => todo.id === doneStatus.id)[0].done =
        doneStatus.done
    }
  },
  // 비동기 처리를 위한 함수
  // actions에 정의된 함수에서는 결국 mutations에 정의된 함수를 commit시켜서 state를 변경
  actions: {
    add({ commit }, payload) {
      commit('add', payload)
    }
    // add2: async () => {
    //   const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   const data = await res.json()
    //   console.log(data)
    // }
  }
}
