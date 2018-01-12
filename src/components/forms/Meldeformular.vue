<template>
  <form action='upload.php' method='post' enctype='multipart/form-data'>
    <input type='file' name='datei'><br>
    <input type='submit' value='Hochladen'>
  </form>
</template>

<script>
    export default {
      name: 'meldeformular'
    }
</script>

<style scoped>

</style>
