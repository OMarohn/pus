<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition appear appear-to-class="animated fadeIn">
      <div id="content">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'

  export default {
    name: 'app',
    components: { NavBar }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  @media (max-width: 1128px) {
    #content {
      margin-top: 5rem;
    }
  }

  @media (max-width: 992px) {
    #content {
      margin-top: 0rem;
    }
  }
</style>
