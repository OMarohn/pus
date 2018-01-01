<template>
  <div class="links">
    <div class="row container-fluid">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <div class="card">
          <div class="card-header">
            <img class="logo" src="static/links/logo_pus.gif">
            <div class="header-center">
              <h4><a href="http://www.pointer-und-setter.de/" target="links">Verein für Pointer und Setter e.V.</a></h4>
            </div>
          </div>

          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><a href="http://www.pointer-setter-bw.de/" target="links">LG Baden-Württemberg</a></li>
              <li class="list-group-item"><a href="http://www.pointer-setter-bayern.de/" target="links">LG Bayern</a></li>
              <li class="list-group-item"><a href="http://www.pointer-setter.net/" target="links">LG Berlin,  Brandenburg/Mecklenburg-Vorpommern</a></li>
              <li class="list-group-item"><a href="http://www.pushps.de/" target="links">LG Hessen-Pfalz-Saar</a></li>
              <li class="list-group-item"><a href="http://www.pointer-setter-rheinland.de/" target="links">LG Rheinland</a></li>
              <li class="list-group-item"><a href="http://www.pointer-und-setter-verein.de/" target="links">LG Sachsen/Thüringen/Sachsen-Anhalt</a></li>
              <li class="list-group-item"><a href="http://www.pointer-setter.de/" target="links">LG Westfalen-Ruhr</a></li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <img class="logo" src="static/links/logo_jghv.png">
            <div class="header-center">
              <h4><a href="http://www.jghv.de/" target="links">Jagdgebrauchshundverband e.V.</a></h4>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <img class="logo" src="static/links/logo_vdh.png">
            <div class="header-center">
              <h4><a href="http://www.vdh.de/" target="links"><p>Verband für das</p>Deutsche Hundewesen e.V.</a></h4>
            </div>
          </div>

          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><a href="http://www.vdh-nord.de/" target="links">Landesverband Nord</a></li>
              <li class="list-group-item"><a href="http://www.vdh-landesverband-niedersachsen.de/" target="links">Landesverband Niedersachsen</a></li>
              <li class="list-group-item"><a href="http://www.vdh-weser-ems.de/" target="links">Landesverband Weser-Ems</a></li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <img class="logo" src="static/links/logo_fci.png">
            <div class="header-center">
              <h4><a href="http://www.fci.be/" target="links">Fédération Cynologique Internationale</a></h4>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <img class="logo" src="static/links/logo_djv.jpg">
            <div class="header-center">
              <h4><a href="http://www.jagdnetz.de/" target="links">Deutscher Jagdverband</a></h4>
            </div>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><a href="http://www.lj-bremen.de/" target="links">Landesjägerschaft Bremen e.V.</a></li>
              <li class="list-group-item"><a href="http://www.ljv-hamburg.de/" target="links">Landesjagd- und Naturschutzverband Hamburg e.V.</a></li>
              <li class="list-group-item"><a href="http://www.ljv-sh.de/" target="links">Landesjagdverband Schleswig- Holstein e.V.</a></li>
              <li class="list-group-item"><a href="http://www.ljn.de/news/" target="links">Landesjägerschaft Niedersachsen e.V.</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    position: absolute;
    height: 3rem;
    width: auto;
    top: 0.25rem
  }

  .header-center {
    text-align: center;
  }

  .card {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 568px) {
    h4 {
      font-size: smaller;
      font-weight: bold;
      text-align: right;
    }

    .logo {
      height: 2rem;
      top: 0.4rem;
    }
  }
</style>
