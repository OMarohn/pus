<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marohn
 * Date: 12.01.2018
 * Time: 14:29
 */

$upload_folder = 'upload/meldungen/'; //Das Upload-Verzeichnis
$filename = pathinfo($_FILES['datei']['name'], PATHINFO_FILENAME);
$extension = strtolower(pathinfo($_FILES['datei']['name'], PATHINFO_EXTENSION));

//Überprüfung der Dateiendung
$allowed_extensions = array('pdf', 'doc');
if(!in_array($extension, $allowed_extensions)) {
  die("Ungültige Dateiendung. Nur pdf und doc-Dateien sind erlaubt");
}

//Überprüfung der Dateigröße
$max_size = 1500*1024; //1.5 MB
if($_FILES['datei']['size'] > $max_size) {
  die("Bitte keine Dateien größer 1.5MB hochladen");
}

//Pfad zum Upload
$new_path = $upload_folder.$filename.'.'.$extension;

//Neuer Dateiname falls die Datei bereits existiert
if(file_exists($new_path)) { //Falls Datei existiert, hänge eine Zahl an den Dateinamen
  $id = 1;
  do {
    $new_path = $upload_folder.$filename.'_'.$id.'.'.$extension;
    $id++;
  } while(file_exists($new_path));
}

//Alles okay, verschiebe Datei an neuen Pfad
move_uploaded_file($_FILES['datei']['tmp_name'], $new_path);
echo 'Datei erfolgreich hochgeladen: <a href="'.$new_path.'">'.$new_path.'</a>';
