<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marohn
 * Date: 12.01.2018
 * Time: 14:29
 *
 * Sinn und Zweck des ganzen ist es aus dem Webformular die Daten incl. Anhänge
 * zur Onlinemeldung für die Prüfungen zu ermitteln und per mail and den Obmann Prüfungswesen zu schicken
 * Abgesichert ist das ganze zumindest duch ein Captcha damit wir nicht zuviel unsinniges Zeug gemailt bekommen
 *
 */

$upload_folder = 'upload/meldungen/'; //Das Upload-Verzeichnis (bin mir nicht sicher ob ich das noch benötige)

function mail_att($to, $subject, $message, $sender, $sender_email, $reply_email, $dateien) {
  if(!is_array($dateien)) {
    $dateien = array($dateien);
  }

  $attachments = array();
  foreach($dateien AS $key => $val) {
    if(is_int($key)) {
      $datei = $val;
      $name = basename($datei);
    } else {
      $datei = $key;
      $name = basename($val);
    }

    $size = filesize($datei);
    $data = file_get_contents($datei);
    $type = mime_content_type($datei);

    $attachments[] = array("name"=>$name, "size"=>$size, "type"=>$type, "data"=>$data);
  }

  $mime_boundary = "-----=" . md5(uniqid(microtime(), true));

  $header  ="From:".$sender."<".$sender_email.">\n";
  $header .= "Reply-To: ".$reply_email."\n";

  $header.= "MIME-Version: 1.0\r\n";
  $header.= "Content-Type: multipart/mixed;\r\n";
  $header.= " boundary=\"".$mime_boundary."\"\r\n";

  $encoding = mb_detect_encoding($message, "utf-8, iso-8859-1, cp-1252");
  $content = "This is a multi-part message in MIME format.\r\n\r\n";
  $content.= "--".$mime_boundary."\r\n";
  $content.= "Content-Type: text/html; charset=\"$encoding\"\r\n";
  $content.= "Content-Transfer-Encoding: 8bit\r\n\r\n";
  $content.= $message."\r\n";

  //$anhang ist ein Mehrdimensionals Array
  //$anhang enthält mehrere Dateien
  foreach($attachments AS $dat) {
    $data = chunk_split(base64_encode($dat['data']));
    $content.= "--".$mime_boundary."\r\n";
    $content.= "Content-Disposition: attachment;\r\n";
    $content.= "\tfilename=\"".$dat['name']."\";\r\n";
    $content.= "Content-Length: .".$dat['size'].";\r\n";
    $content.= "Content-Type: ".$dat['type']."; name=\"".$dat['name']."\"\r\n";
    $content.= "Content-Transfer-Encoding: base64\r\n\r\n";
    $content.= $data."\r\n";
  }
  $content .= "--".$mime_boundary."--";

  return mail($to, $subject, $content, $header);
}

// Captcha pruefen
function checkCaptcha ($response, $ip) {
  $url = "https://www.google.com/recaptcha/api/siteverify"."?secret="."6LezdUAUAAAAAEb04-QqmrWBlqUPDBYMmnq-StXr"."&response=$response&remoteip=$ip";
  $result = file_get_contents( $url );
  $response = json_decode( $result );
  return $response->success;
}

// Sollte form submit sein und Captcha Response vorhanden sein
if (isset($_POST['g-recaptcha-response'])) {

  // Captcha pruefen
  $captch_response = $_POST['g-recaptcha-response'];
  $userIp = $_SERVER['REMOTE_ADDR'];
  $response = checkCaptcha($captch_response, $userIp);

  if ($response) {
    $filename = pathinfo($_FILES['datei']['name'], PATHINFO_FILENAME);
    $extension = strtolower(pathinfo($_FILES['datei']['name'], PATHINFO_EXTENSION));

    //Überprüfung der Dateiendung
    $allowed_extensions = array('pdf', 'jpg');
    if(!in_array($extension, $allowed_extensions)) {
      die("Ungültige Dateiendung. Nur pdf und jpg-Dateien sind erlaubt");
    }

    //Überprüfung der Dateigröße
    $max_size = 2000*1024;
    if($_FILES['datei']['size'] > $max_size) {
      die("Bitte keine Dateien größer 2MB hochladen");
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

    // unnu die Mail
    // Aufruf der Funktion, Versand von 1 Datei
    $an = "admin@pointer-setter-nord.de";
    mail_att($an, "Onlinemeldung",
      "Euer Nachrichtentext",
      "Absendername",
      "absender@domain.de",
      "antwortadresse@domain.de", $new_path);


    echo 'Datei erfolgreich hochgeladen: <a href="'.$new_path.'">'.$new_path.'</a>';
  } else {
    echo ('das war nix!');
  }
}


