<template>
  <div class="aktivAktuell">
    <loader v-if="loading"></loader>
    <div id="eintrag" v-for="theNews in news" class="row container-fluid">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <div class="card">
          <div id="header" class="card-header">
            <h4 v-html="theNews.datum + ' - ' + theNews.titel"></h4>
          </div>
          <img class="card-img-top card-img-max" :src="'static/news/' + theNews.bild">
          <div class="card-body">
            <p class="card-text" v-html="theNews.beschreibung"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Loader from './Loader.vue'

  export default {
    data () {
      return {
        loading: true,
        news: []
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      // Laden der News-Daten
      fetchData () {
        axios.get('static/data/aktuell/news.json')
          .then(response => {
            this.news = response.data
          })
          .catch(e => {
            console.error(e)
            this.news = []
          })
        this.loading = false
      }
    },
    components: {Loader}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #eintrag {
    margin-bottom: 2rem;
  }

  #header {
    text-align: left;
  }

  .card-img-max {
    max-width: 100%;
  }

  p {
    font-family: Verdana;
    font-size: large;
    text-align: justify;
  }
</style>
