import { createStore } from 'vuex'
import goals from './modules/goals'
import tasks from './modules/tasks'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tasks,
    goals
  }
})
