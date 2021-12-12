<template>
  <div class="col-xl-10 offset-xl-1 col-sm-12">
    <div class="card-deck vorstand">
      <div v-for="person in vorstand" :key="person.mail" class="card text-center card-outline-success">
        <div class="imgcontainer">
          <img v-if="person.url" class="card-img-top img-fluid rounded-circle" :src="person.url">
        </div>
        <div class="card-block">
          <h4 class="card-title">{{person.position}}</h4>
          <p class="card-text">
            <b>{{person.name}}</b><br>
            {{person.strasse}}<br>
            {{person.ort}}<br>
            <span v-text="person.tel"></span>
          </p>
        </div>
        <div class="card-footer">
          <transition appear appear-to-class="animated rubberBand">
            <div>
              <a :href="'mailto:' + person.mail" class="btn btn-outline-success"><i class="fa fa-envelope-o fa-fw"></i></a>
              <a v-if="person.tel" :href="'tel:' + person.tel | phoneAsLink" class="btn btn-outline-success"><i class="fa fa-phone fa-fw"></i></a>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vorstand: [
        {
          position: "Landesgruppenleiterin",
          url: "static/vorstand/vorstand_deichholz.jpg",
          name: "Elke Deichholz",
          strasse: "Burgstrasse 1",
          ort: "27412 Bülstedt",
          tel: "+49 (4283) 6998994",
          mail: "landesgruppenleiter@pointer-setter-nord.de"
        },
        {
          position: "Stellvertr. Landesgruppenleiter",
          url: "static/vorstand/vorstand_eickert.JPG",
          name: "Wolfgang Eickert",
          strasse: "Heimbucher Str. 36",
          ort: "21274 Undeloh",
          mail: "landesgruppenleiter@pointer-setter-nord.de"
        },
        {
          position: "Kassenwart",
          name: "z. Zt. nicht besetzt",
          url: "static/vorstand/vorstand_dummy.jpg"
        },
        {
          position: "Landesgruppenzuchtwart",
          name: "Christine Ebeling",
          url: "static/vorstand/vorstand_dummy.jpg",
          strasse: "Orxhausen 38",
          ort: "37574 Einbeck",
          tel: "+49 (5563) 6598",
          mail: "landesgruppenzuchtwart@pointer-setter-nord.de"
        },
        {
          position: "Zuchtwart",
          name: "Frank Kohnert",
          url: "static/vorstand/vorstand_kohnert.jpg",
          strasse: "Plöner Straße 9",
          ort: "26215 Wiefelstede",
          tel: "+49 (4402) 60 897",
          mail: "zuchtwart@pointer-setter-nord.de"
        },
        {
          position: "Beisitzer Prüfungswesen",
          name: "z. Zt. nicht besetzt",
          url: "static/vorstand/vorstand_dummy.jpg"
        },
        {
          position: "Beisitzer Ausstellungswesen",
          name: "Silvia Timmermann",
          url: "static/vorstand/vorstand_timmermann.jpg",
          strasse: "Postfach 1208",
          ort: "21625 Neu Wulmstorf",
          tel: "+49 (171) 8106292",
          mail: "ausstellung@pointer-setter-nord.de"
        },
        {
          position: "Beisitzer Öffentlichkeitsarbeit - Internet",
          name: "Oliver Marohn",
          url: "static/vorstand/vorstand_marohn.jpg",
          strasse: "Zur Fichtenkämpe 23",
          ort: "27254 Staffhorst",
          tel: "+49 (4272) 6579810",
          mail: "admin@pointer-setter-nord.de"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vorstand {
  padding-left: 1rem;
  padding-right: 1rem;
}

.vorstand .card {
  max-width: 20rem;
  min-width: 20rem;
  margin-top: 1rem;
}

.vorstand .card .imgcontainer {
  padding-top: 1rem;
}

.vorstand .card img {
  max-width: 180px;
}

@media (min-width: 576px) {
  .card-deck .card:not(:last-child) {
    margin-right: 15px;
    margin-left: 15px;
  }
}
</style>
