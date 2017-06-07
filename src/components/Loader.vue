<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
          <feBlend in="SourceGraphic" in2="goo"></feBlend>
        </filter>
      </defs>
    </svg>
    <div class="blob blob-0"></div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
    <div class="blob blob-5"></div>
  </div>
</template>

<script>
  export default {
    name: 'loader'}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .blob {
    width: 2rem;
    height: 2rem;
    background: rgba(230, 230, 230, 0.85);
    border-radius: 50%;
    position: absolute;
    left: calc(50% - 1rem);
    top: calc(50% - 1rem);
    box-shadow: 0 0 1rem rgba(255, 255, 255, 0.25);
  }

  .blob-2 {
    -webkit-animation: animate-to-2 1.5s infinite;
    animation: animate-to-2 1.5s infinite;
  }

  .blob-3 {
    -webkit-animation: animate-to-3 1.5s infinite;
    animation: animate-to-3 1.5s infinite;
  }

  .blob-1 {
    -webkit-animation: animate-to-1 1.5s infinite;
    animation: animate-to-1 1.5s infinite;
  }

  .blob-4 {
    -webkit-animation: animate-to-4 1.5s infinite;
    animation: animate-to-4 1.5s infinite;
  }

  .blob-0 {
    -webkit-animation: animate-to-0 1.5s infinite;
    animation: animate-to-0 1.5s infinite;
  }

  .blob-5 {
    -webkit-animation: animate-to-5 1.5s infinite;
    animation: animate-to-5 1.5s infinite;
  }

  @-webkit-keyframes animate-to-2 {
    25%, 75% {
      -webkit-transform: translateX(-1.5rem) scale(0.75);
      transform: translateX(-1.5rem) scale(0.75);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }

  @keyframes animate-to-2 {
    25%, 75% {
      -webkit-transform: translateX(-1.5rem) scale(0.75);
      transform: translateX(-1.5rem) scale(0.75);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @-webkit-keyframes animate-to-3 {
    25%, 75% {
      -webkit-transform: translateX(1.5rem) scale(0.75);
      transform: translateX(1.5rem) scale(0.75);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @keyframes animate-to-3 {
    25%, 75% {
      -webkit-transform: translateX(1.5rem) scale(0.75);
      transform: translateX(1.5rem) scale(0.75);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @-webkit-keyframes animate-to-1 {
    25% {
      -webkit-transform: translateX(-1.5rem) scale(0.75);
      transform: translateX(-1.5rem) scale(0.75);
    }
    50%, 75% {
      -webkit-transform: translateX(-4.5rem) scale(0.6);
      transform: translateX(-4.5rem) scale(0.6);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @keyframes animate-to-1 {
    25% {
      -webkit-transform: translateX(-1.5rem) scale(0.75);
      transform: translateX(-1.5rem) scale(0.75);
    }
    50%, 75% {
      -webkit-transform: translateX(-4.5rem) scale(0.6);
      transform: translateX(-4.5rem) scale(0.6);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @-webkit-keyframes animate-to-4 {
    25% {
      -webkit-transform: translateX(1.5rem) scale(0.75);
      transform: translateX(1.5rem) scale(0.75);
    }
    50%, 75% {
      -webkit-transform: translateX(4.5rem) scale(0.6);
      transform: translateX(4.5rem) scale(0.6);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @keyframes animate-to-4 {
    25% {
      -webkit-transform: translateX(1.5rem) scale(0.75);
      transform: translateX(1.5rem) scale(0.75);
    }
    50%, 75% {
      -webkit-transform: translateX(4.5rem) scale(0.6);
      transform: translateX(4.5rem) scale(0.6);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @-webkit-keyframes animate-to-0 {
    25% {
      -webkit-transform: translateX(-1.5rem) scale(0.75);
      transform: translateX(-1.5rem) scale(0.75);
    }
    50% {
      -webkit-transform: translateX(-4.5rem) scale(0.6);
      transform: translateX(-4.5rem) scale(0.6);
    }
    75% {
      -webkit-transform: translateX(-7.5rem) scale(0.5);
      transform: translateX(-7.5rem) scale(0.5);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @keyframes animate-to-0 {
    25% {
      -webkit-transform: translateX(-1.5rem) scale(0.75);
      transform: translateX(-1.5rem) scale(0.75);
    }
    50% {
      -webkit-transform: translateX(-4.5rem) scale(0.6);
      transform: translateX(-4.5rem) scale(0.6);
    }
    75% {
      -webkit-transform: translateX(-7.5rem) scale(0.5);
      transform: translateX(-7.5rem) scale(0.5);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @-webkit-keyframes animate-to-5 {
    25% {
      -webkit-transform: translateX(1.5rem) scale(0.75);
      transform: translateX(1.5rem) scale(0.75);
    }
    50% {
      -webkit-transform: translateX(4.5rem) scale(0.6);
      transform: translateX(4.5rem) scale(0.6);
    }
    75% {
      -webkit-transform: translateX(7.5rem) scale(0.5);
      transform: translateX(7.5rem) scale(0.5);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
  @keyframes animate-to-5 {
    25% {
      -webkit-transform: translateX(1.5rem) scale(0.75);
      transform: translateX(1.5rem) scale(0.75);
    }
    50% {
      -webkit-transform: translateX(4.5rem) scale(0.6);
      transform: translateX(4.5rem) scale(0.6);
    }
    75% {
      -webkit-transform: translateX(7.5rem) scale(0.5);
      transform: translateX(7.5rem) scale(0.5);
    }
    95% {
      -webkit-transform: translateX(0rem) scale(1);
      transform: translateX(0rem) scale(1);
    }
  }
</style>
