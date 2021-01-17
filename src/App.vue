<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  margin: 0;
  box-sizing: content-box;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $background;
  font-size: 16px;
  color: $secondary;
}
#app {
  width: 100%;
  height: 100%;
}
.content {
  width: 95vw;
  margin: auto;
}
</style>
