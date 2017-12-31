<template>
  <div class="hundKurz">
    <div class="titel">
      <property-tag :props="hund.titel"></property-tag>
    </div>
    <span id="name">{{hund.name}}</span><span id="buch"> - {{hund.zuchtbuch}}</span><span id="hd"> - HD: {{hund.hd}}</span><span id="pra"> - PRArcd4: {{hund.pra}}</span>
    <div class="pruefung">
      <property-tag :props="hund.leistung"></property-tag><span id="abl"> - ABL: {{hund.abl | normalize}}</span><span id="ll"> - LL: {{hund.ll | normalize}}</span>
    </div>
  </div>
</template>

<script>
  import PropertyTag from './PropertyTag'
  export default {
    name: 'hundKurz',
    props: ['hund'],
    components: {PropertyTag}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #name {
    font-weight: bold;
    font-size: large;
    margin-left: 0.5rem;
  }
</style>
