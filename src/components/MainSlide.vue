<template>
  <div class="swiper">
    <!-- Slider main container -->
    <div class="swiper-container">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in swiperSlides" :key="slide.url">
          <img class=" swiper-lazy img-cover" :src="slide.url">
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import store from '../store/store'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'main',
    onload: function () {
      console.log(store)
    },
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          autoplay: 3500,
          effect: 'slide',
          centeredSlides: true,
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
            url: 'static/slides/main/slide-1.jpg'
          },
          {
            url: 'static/slides/main/slide-2.jpg'
          },
          {
            url: 'static/slides/main/slide-3.jpg'
          },
          {
            url: 'static/slides/main/slide-4.jpg'
          },
          {
            url: 'static/slides/main/slide-5.jpg'
          },
          {
            url: 'static/slides/main/slide-6.jpg'
          },
          {
            url: 'static/slides/main/slide-7.jpg'
          },
          {
            url: 'static/slides/main/slide-8.jpg'
          },
          {
            url: 'static/slides/main/slide-10.jpg'
          },
          {
            url: 'static/slides/main/slide-11.jpg'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img-cover {
    width: 100%;
  }
</style>
