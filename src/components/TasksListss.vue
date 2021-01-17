<template>
  <div>
    <table class="tasks">
      <!-- Header -->
      <tr class="header">
        <th class="task-name">Task Name</th>
        <!-- <th class="task-time-taken">Time Taken</th> -->
        <th class="task-time">Time</th>
        <th class="task-action">Action</th>
      </tr>
      <!-- Goal -->
      <tr>
        <td class="task-name">
          <input type="text" v-model="goal.name" />
        </td>
        <!-- <td class="task-time-taken"></td> -->
        <td class="task-time">
          <input type="time" v-model="goal.time" />
        </td>
        <td class="task-action"></td>
      </tr>
      <!-- Tasks -->
      <template
        v-for="(task, index) in computedTasks"
        :key="task.id"
        :class="{ active: task.isActive }"
      >
        <tr>
          <td class="task-name">
            <input type="text" v-model="task.name" :disabled="!task.canEdit" />
            <div class="task-time-taken">
              <input
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                v-model="task.timeTaken"
                :disabled="!task.canEdit"
              />
              <span>min{{ task.timeTaken > 1 ? "s" : "" }}</span>
            </div>
          </td>
          <!-- <td class="task-time-taken"></td> -->
          <td class="task-time">
            {{ formatTime(task.time) }}
          </td>
          <td class="task-action">
            <button @click="editTask(task.id)">Edit</button>
          </td>
        </tr>
        <tr v-if="task.canEdit" class="task-edit-panel">
          <td colspan="3">
            <button @click="addTask(index)">Add</button>
            <button @click="removeTask(index)">Delete</button>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
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
</script>

<style lang="scss" scoped>
button {
  outline: none;
  background: none;
  border: 1px solid $secondary;
  color: $secondary;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.4rem;
  margin: 0.3rem;
}
table {
  border-collapse: collapse;
}
.tasks {
  font-size: 1rem;
  width: 100%;
  tr {
    height: 5rem;
    &.header {
      height: 3rem;
    }
  }
  td,
  th {
    padding: 0.5rem;
    border: none;
  }
  input {
    border: none;
    border-bottom: 1px solid $secondary;
    background: none;
    font-size: 1rem;
    color: $secondary;
    &:focus {
      outline: none;
    }
    &:disabled {
      border: none;
    }
  }
  .task-name {
    input {
      width: 5rem;
    }
    width: auto;
  }
  .task-time-taken {
    input {
      width: 1.5rem;
    }
  }
  .task-time {
    text-align: center;
    input {
      width: 6rem;
    }
  }
  tr.active {
    border: 2px solid rgba($color: $primary, $alpha: 1);
    border-radius: 5rem;
    background: rgba($color: $background, $alpha: 0.1);
    color: $primary;
    input {
      color: $primary;
      border-color: $primary;
    }
  }
}
</style>
