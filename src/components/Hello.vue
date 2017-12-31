<template>
  <div class="hello">
    <!-- Slider main container -->
    <div class="swiper-container">
    <swiper :options="swiperOption">
      <swiper-slide v-for="slide in swiperSlides" :key="slide.url">
        <img class="img-fluid swiper-lazy" :src="slide.url">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'hello',
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        msg: 'Willkommen',
        swiperOption: {
          autoplay: 3500,
          effect: 'slide',
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          paginationBulletRender (swiper, index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`
          },
          mousewheelControl: true,
          observeParents: true,
          preloadImages: false,
          lazyLoading: true
        },
        swiperSlides: [
          {
            kennelName: 'Nordic Gordon Hunters',
            url: 'static/kennel/gordon/gordon_hunters.jpg'
          },
          {
            kennelName: '...from gentle Breeze',
            url: 'static/kennel/gordon/gentle_breeze.jpg'
          },
          {
            kennelName: '...of Magic Fields',
            url: 'static/kennel/gordon/magic_fields.jpg'
          },
          {
            kennelName: 'Blackstar ... of Heathmoor',
            url: 'static/kennel/gordon/blackstar.jpg'
          },
          {
            kennelName: 'Knockraheen´s ...',
            url: 'static/kennel/gordon/knockraheens.jpg'
          },
          {
            kennelName: '... von Wersabe',
            url: 'static/kennel/gordon/wersabe.jpg'
          },
          {
            kennelName: 'Tamarack´s ... of Oregon',
            url: 'static/kennel/gordon/oregon.jpg'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .swiper-container {
    height: 400px;
    width:100%;
  }

  .swiper-slide img {
    object-fit: contain;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
  }
</style>

<style>
  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    background: #42b983;
  }
</style>
