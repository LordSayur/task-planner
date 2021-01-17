
const state = () => ({
  tasks: [],
})

const getters = {
  getTasks: (state, getters, rootState) => {
    return (goalId) => {
      let tasks = [];
      let goal = rootState.goals.goals.find(goal => goal.id == goalId);

      let tasksId = goal.tasksId;

      if (!tasksId.length) {
        let newTask = getTaskTemplate();
        tasksId.push(newTask.id);
        state.tasks.push(newTask)
        return [newTask]
      }

      goal.tasksId.forEach(taskId => {
        tasks.push(state.tasks.find(task => task.id == taskId))
      });
      return tasks
    }
  }
}

const getTaskTemplate = () => {
  return {
    id: Date.now(),
    sequence: 1,
    commonTaskId: null,
    name: "Parking",
    timeTaken: 5,
    time: null,
    canEdit: false
  }
}

export default {
  namespaced: true,
  state,
  getters
}