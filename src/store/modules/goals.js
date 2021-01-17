const state = () => ({
  goals: []
})

const getters = {
  getGoal: state => {
    return (goalId) => {
      let goal = state.goals.find(goal => goal.id == goalId);

      if (goal == undefined) {
        let newGoal = getGoalTemplate();
        state.goals.push(newGoal)
        return newGoal;
      }

      return goal
    }
  }
}

const mutations = {
  addGoal(state, goal) {
    state.goals.push(goal);
  }
}

const actions = {
  getGoal({ commit }) {
    commit('addGoal', payload)
  }
}

const getGoalTemplate = () => {
  return {
    id: Date.now(),
    tasksId: [],
    name: "Reporting",
    time: "05:30",
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}