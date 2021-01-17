<template>
  <h1>Tasks</h1>
  <TasksList />
</template>

<script>
import TasksList from "@/components/TasksList";

export default {
  name: "Task",
  components: { TasksList },
};
</script>

<style>
</style>