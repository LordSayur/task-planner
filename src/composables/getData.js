import { ref } from 'vue';
import { useStore } from 'vuex';

const getData = (goalId) => {
  const store = useStore()
  const goal = ref([])
  const tasks = ref([])

  const getGoal = (goalId) => {
    return store.getters["goals/getGoal"](goalId);
  }

  const getTasks = (goalId) => {
    return store.getters["tasks/getTasks"](goal.value.id);
  }

  goal.value = getGoal(goalId)
  tasks.value = getTasks(goalId)

  return {
    goal,
    tasks,
    getGoal,
    getTasks
  }
}

export default getData;