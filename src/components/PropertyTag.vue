<template>
  <span>
    <span v-for="prop in props" class="badge badge-success">{{prop}}</span>
  </span>
</template>

<script>
  export default {
    name: 'property-tag',
    props: ['props']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span {
    margin-left: 0.25rem;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }
</style>
