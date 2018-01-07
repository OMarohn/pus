<template>
  <div class="main">
    <div class="bild1">
      <div class="bildtext">
        <span class="border">Der Gordon Setter</span>
      </div>
    </div>
    <section class="section section-light">
      <h2>Typbeschreibung</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A distinctio facilis magnam molestias, quo veritatis. Architecto asperiores aut consequatur corporis cupiditate delectus dolores eius ex facere illo labore laboriosam molestiae natus necessitatibus pariatur provident quae quas rem rerum sapiente, suscipit tempora voluptatem voluptatibus. Accusantium suscipit ut velit. Aperiam commodi delectus deserunt dicta dolore doloremque eligendi esse et excepturi facere fuga harum illo illum ipsa itaque iure laudantium libero magnam nam non, officiis praesentium, quae rem repellendus, reprehenderit sunt unde vero.
      </p>
    </section>
    <div class="bild2">
      <div class="bildtext">
        <span>Der English Setter</span>
      </div>
    </div>
    <section class="section section-dark">
      <h2>Typbeschreibung</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequuntur corporis, deleniti dignissimos error itaque iure laudantium modi odio quas qui, repudiandae, saepe vel. Adipisci aspernatur doloremque, dolores incidunt inventore iure omnis porro quis similique tenetur ut vero voluptatem? Accusantium corporis cum eaque et eveniet maiores nisi odit recusandae? Aliquid asperiores assumenda autem eius esse et eveniet, illo maiores nam nesciunt odit omnis qui quia repellat repellendus sequi vitae, voluptatum.
      </p>
    </section>
    <div class="bild3">
      <div class="bildtext">
        <span>Der Pointer</span>
      </div>
    </div>
    <section class="section section-light">
      <h2>Typbeschreibung</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores aspernatur dolor ea, eius eligendi excepturi iste labore laborum, magni nesciunt perspiciatis quo, sequi voluptatem voluptatibus. Ad aspernatur cumque deleniti, deserunt dignissimos distinctio eius incidunt laudantium magni non odio, officiis quod repudiandae rerum tempora tempore totam! Dignissimos, iure, odit! Adipisci debitis deleniti explicabo nemo, nostrum totam? Dolor excepturi, expedita id illo, ipsum iste labore minima mollitia nam, nisi nostrum obcaecati praesentium? Dolorum, facere harum. Aliquam aperiam atque aut dolor doloribus error in ipsum, magnam maxime minus, officiis quidem ullam! Aspernatur dolorem eligendi expedita in, incidunt omnis pariatur perspiciatis possimus voluptatum.
      </p>
    </section>
    <div class="bild4">
      <div class="bildtext">
        <span>Der Irish Setter</span>
      </div>
    </div>
    <section class="section section-dark">
      <h2>Typbeschreibung</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores aspernatur dolor ea, eius eligendi excepturi iste labore laborum, magni nesciunt perspiciatis quo, sequi voluptatem voluptatibus. Ad aspernatur cumque deleniti, deserunt dignissimos distinctio eius incidunt laudantium magni non odio, officiis quod repudiandae rerum tempora tempore totam! Dignissimos, iure, odit! Adipisci debitis deleniti explicabo nemo, nostrum totam? Dolor excepturi, expedita id illo, ipsum iste labore minima mollitia nam, nisi nostrum obcaecati praesentium? Dolorum, facere harum. Aliquam aperiam atque aut dolor doloribus error in ipsum, magnam maxime minus, officiis quidem ullam! Aspernatur dolorem eligendi expedita in, incidunt omnis pariatur perspiciatis possimus voluptatum.
      </p>
    </section>
    <div class="bild5">
      <div class="bildtext">
        <span>Der Irish Red & White Setter</span>
      </div>
    </div>
    <section class="section section-light">
      <h2>Typbeschreibung</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequuntur corporis, deleniti dignissimos error itaque iure laudantium modi odio quas qui, repudiandae, saepe vel. Adipisci aspernatur doloremque, dolores incidunt inventore iure omnis porro quis similique tenetur ut vero voluptatem? Accusantium corporis cum eaque et eveniet maiores nisi odit recusandae? Aliquid asperiores assumenda autem eius esse et eveniet, illo maiores nam nesciunt odit omnis qui quia repellat repellendus sequi vitae, voluptatum.
      </p>
    </section>
    <div class="bild1">
      <div class="bildtext">
        <span class="border">Verein für Pointer und Setter - Landesgruppe Nord</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main',
    onload: function () {
    },
    data () {
      return {
        msg: 'Willkommen'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bild1, .bild2, .bild3, .bild4, .bild5 {
    position: relative;
    background-position: center;
    background-size: cover !important;
    background-repeat: no-repeat;
    background-attachment: fixed !important;
    opacity: .7;
  }

  .bild1 {
    background-image: url('/static/bg/gordon.jpg');
    min-height: 100vh;
  }

  .bild2 {
    background-image: url('/static/bg/english.jpg');
    min-height: 400px;
  }

  .bild3 {
    background-image: url('/static/bg/pointer.jpg');
    min-height: 400px;
  }

  .bild4 {
    background-image: url('/static/bg/irish.JPG');
    min-height: 400px;
  }

  .bild5 {
    background-image: url('/static/bg/rw.jpg');
    min-height: 400px;
  }

  .section {
    text-align: center;
    padding: 50px 80px;

    color: #ddd;
    background-color: #282e34;
  }

  .section-light {
    color: #666;
    background-color: #f4f4f4;
  }

  .bildtext {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    color: #000;
    font-size: 27px;
  }

  .bildtext .border {
    background-color: #111;
    color: #fff;
    padding: 20px;
  }

  @media (max-width: 568px) {
    .bild1, .bild2, .bild3, .bild4, .bild5 {
      background-attachment: scroll;
      opacity: 1;
      width: 100vh;
    }
    section {
      width: 100vh;
    }
  }
</style>
