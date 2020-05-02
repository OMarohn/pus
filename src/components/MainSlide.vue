<template>
  <div class="swiper">
    <div class="container emergency">Absage der diesjährigen Generalversammlung. Details finden Sie auf der <a href="https://www.pointer-und-setter.de/index.php/verein1/aktuelles.html">Seite des Hauptvereins.</a></div>
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
    <!-- Wrap the rest of the page in another container to center all the content. -->
    <div class="container marketing">
      <h4>Willkommen auf der Homepage der Landesgruppe Nord des Vereins für Pointer und Setter e.V. .</h4>
      <span>
        Wir freuen uns über Ihr Interesse an den englischen Vorstehhunden und stehen Ihnen in allen Fragen zu den fünf Rassen zur Verfügung. Der Verein für Pointer und Setter e.V. gliedert sich in acht Landesgruppen und widmet sich der Reinzucht von Pointern und Settern, um ihr ursprüngliches Wesen und ihre rassespezifischen jagdlichen Eigenschaften zu erhalten, zu fördern und zu pflegen.
        Die Landesgruppe Nord umfasst die Bundesländer Niedersachsen, Schleswig-Holstein, Bremen und Hamburg, veranstaltet Ausstellungen, rassespezifische Prüfungen, themenorientierte Trainingstage und gesellschaftliche Zusammenkünfte. Der Verein für Pointer und Setter e.V. ist Mitglied im JGHV der FCI und im VDH.
      </span>

      <div class="container logos">
        <div class="row center-block">
          <div class="col-3">
            <a href="http://www.pointer-und-setter.de/" target="_"><img class="img-fluid rounded-circle" src="/static/bilder/logos/pus.jpg" alt="Logo PuS"></a>
          </div>
          <div class="col-3">
            <a href="http://www.jghv.de/" target="_"><img class="img-fluid rounded-circle" src="/static/bilder/logos/jghv.jpg" alt="Logo JGHV"></a>
          </div>
          <div class="col-3">
            <a href="http://www.fci.be/" target="_"><img class="img-fluid rounded-circle" src="/static/bilder/logos/fci.jpg" alt="Logo FCI"></a>
          </div>
          <div class="col-3">
            <a href="http://www.vdh.de/" target="_"><img class="img-fluid rounded-circle" src="/static/bilder/logos/vdh.jpg" alt="Logo VDH"></a>
          </div>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import store from "../store/store";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import _ from "lodash";

export default {
  name: "main",
  onload: function() {
    console.log(store);
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: 3500,
        effect: "slide",
        centeredSlides: true,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        paginationBulletRender(swiper, index, className) {
          return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
        },
        // mousewheelControl: true,
        observeParents: true,
        preloadImages: false,
        lazyLoading: true
      },
      swiperSlides: _.shuffle([
        {
          url: "static/slides/main/slide-1.jpg"
        },
        {
          url: "static/slides/main/slide-2.jpg"
        },
        {
          url: "static/slides/main/slide-3.jpg"
        },
        {
          url: "static/slides/main/slide-4.jpg"
        },
        {
          url: "static/slides/main/slide-5.jpg"
        },
        {
          url: "static/slides/main/slide-6.jpg"
        },
        {
          url: "static/slides/main/slide-7.jpg"
        },
        {
          url: "static/slides/main/slide-8.jpg"
        },
        {
          url: "static/slides/main/slide-10.jpg"
        },
        {
          url: "static/slides/main/slide-11.jpg"
        },
        {
          url: "static/slides/main/slide-12.jpg"
        },
        {
          url: "static/slides/main/slide-13.jpg"
        },
        {
          url: "static/slides/main/slide-14.jpg"
        },
        {
          url: "static/slides/main/slide-15.jpg"
        },
        {
          url: "static/slides/main/slide-16.jpg"
        },
        {
          url: "static/slides/main/slide-17.jpg"
        },
        {
          url: "static/slides/main/slide-18.jpg"
        },
        {
          url: "static/slides/main/slide-19.jpg"
        },
        {
          url: "static/slides/main/slide-20.jpg"
        },
        {
          url: "static/slides/main/slide-21.jpg"
        },
        {
          url: "static/slides/main/slide-22.jpg"
        }
      ])
    };
  }
};
</script>
	@FindBy(css="")
	private WebElement webElement;

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-cover {
  width: 100%;
}

.marketing {
  margin-top: 2rem;
}

.marketing span {
  text-align: justify-all;
}

.logos {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.emergency {
  width: 100%;
  background-color: firebrick;
  font-size: 1.5rem;
  color: white;
}

@media (max-width: 568px) {
  h4 {
    font-size: smaller;
    font-weight: bold;
    text-align: right;
  }
}
</style>
