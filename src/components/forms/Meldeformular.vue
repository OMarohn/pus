<template>
  <!-- Disclaimer nicht vergessen -->
  <form action='upload.php' method='post' enctype='multipart/form-data'>
    <input type='file' name='datei'><br>
    <input type='submit' value='Hochladen'>
    <div class="g-recaptcha" data-sitekey="6LezdUAUAAAAAKMU9K9ZMQmL3fkSGI3XRg4kTVDI"></div>
  </form>
</template>

<script>
    export default {
      name: 'meldeformular'
    }
</script>

<style scoped>

</style>
