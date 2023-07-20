<template>
  <div id="app">
    <ColorListSorter />
  </div>
</template>

<script>
import ColorListSorter from "./components/colorListSorter/ColorListSorter";

export default {
  name: "App",
  components: {
    ColorListSorter,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
