<template>
  <!-- NAVBAR -->
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded fixed-top">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">
      <img src="../pus_logo.gif" width="30" height="30" class="d-inline-block align-top" alt="">
      Pointer und Setter LG Nord
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link active-class="active" class="nav-link" to="/">Home</router-link>
        </li>
        <!-- Dropdown Verein // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navVerein" data-toggle="dropdown" href="/#/Verein">Verein</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#verein/vorstand">Vorstand</a>
          </div>
        </li>
        <!-- Dropdown Welpen // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navWelpen" data-toggle="dropdown" href="/#/Welpen">Welpen</a>
          <div class="dropdown-menu">
            <a v-for="rasse in welpen" class="dropdown-item" :href="'#welpen/' + rasse | shorten">{{rasse}}</a>
          </div>
        </li>
        <!-- Dropdown Zuechter // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navZuechter" data-toggle="dropdown" href="/#/Zuechter">Züchter</a>
          <div class="dropdown-menu">
            <a v-for="rasse in zuechter" class="dropdown-item" :href="'#zuechter/' + rasse | shorten">{{rasse}}</a>
          </div>
        </li>
        <!-- Dropdown Rueden // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navRueden" data-toggle="dropdown" href="/#/Rueden">Rüden</a>
          <div class="dropdown-menu">
            <a v-for="rasse in rueden" class="dropdown-item" :href="'#rueden/' + rasse | shorten">{{rasse}}</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <!-- NAVBAR ENDE -->
</template>

<script>
  export default {
    name: 'navBar',
    data () {
      return {
        welpen: ['Englisch', 'Pointer', 'Gordon', 'Red and White', 'Irish'],
        rueden: ['Englisch', 'Pointer', 'Gordon', 'Red and White', 'Irish'],
        zuechter: ['Englisch', 'Pointer', 'Gordon', 'Red and White', 'Irish']
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
