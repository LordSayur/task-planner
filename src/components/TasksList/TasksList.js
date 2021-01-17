import { computed, ref } from "vue";
import { useStore } from "vuex";
import getData from "@/composables/getData";
import { format, sub, isWithinInterval } from "date-fns";

export default {
  name: "TasksList",
  setup() {
    const store = useStore();

    const { goal, tasks } = getData(1);

    const formatTime = computed(() => {
      return (originalTime) => {
        try {
          return format(originalTime, "hh:mm a");
        } catch (error) {
          console.error(error);
          return "Invalid time";
        }
      };
    });

    const computedTasks = computed(() => {
      tasks.value.forEach((task, index, tasksArr) => {
        let previousTaskTime;
        if (index == 0) {
          previousTaskTime = stringToDate(goal.value.time);
        } else {
          previousTaskTime = tasksArr[index - 1].time;
        }

        task.time = sub(previousTaskTime, { minutes: +task.timeTaken });

        task.isActive = isWithinInterval(new Date(), {
          start: task.time,
          end: previousTaskTime,
        });
      });
      return tasks.value;
    });

    const stringToDate = (str) => {
      let strs = str.split(":");
      let modTime = new Date();
      modTime.setHours(strs[0]);
      modTime.setMinutes(strs[1]);
      modTime.setSeconds(0);
      return modTime;
    };

    const editTask = (id) => {
      let editedTask = tasks.value.find((task) => task.id == id);
      editedTask.canEdit = !editedTask.canEdit;
    };

    const addTask = (index) => {
      let myTasks = tasks.value;

      let lastId = myTasks[myTasks.length - 1].id;

      myTasks.splice(index + 1, 0, {
        id: lastId + 1,
        name: "Task Name",
        timeTaken: 5,
        canEdit: true,
      });
    };

    const removeTask = (index) => {
      if (tasks.value.length <= 1) {
        return;
      }
      tasks.value.splice(index, 1);
    };

    return {
      goal,
      tasks,
      computedTasks,
      addTask,
      removeTask,
      formatTime,
      editTask,
    };
  },
};