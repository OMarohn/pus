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

/**
 * @param $file
 * @return array
 */
function handleFile ($file) {
  $upload_folder = 'upload/meldungen/';
  $filename = pathinfo($file['name'], PATHINFO_FILENAME);

  if ($filename) {
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    //Überprüfung der Dateigröße
    $max_size = 2*1024*1024;
    if($file['size'] > $max_size) {
      $ret = array("status" => 'Datei zu gross');
      return $ret;
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
    move_uploaded_file($file['tmp_name'], $new_path);
    $ret = array("status" => 'OK', "path" => $new_path);
    return $ret;
  } else {
    return array("status" => "Kein file angegeben");
  }
}

date_default_timezone_set("Europe/Berlin");
header('Content-Type: application/json');

$skip = false;

// Sollte form submit sein und Captcha Response vorhanden sein
if (isset($_POST['g-recaptcha-response']) or $skip) {

  $response = true;

  // Captcha pruefen
  if (!$skip) {
    $captch_response = $_POST['g-recaptcha-response'];
    $userIp = $_SERVER['REMOTE_ADDR'];
    $response = checkCaptcha($captch_response, $userIp);
  }

  if ($response) {
    $attachments = [];
    $ente = handleFile($_FILES['file_ente']);
    if ($ente["status"] == 'OK') {
      $attachments[]= $ente["path"];
    }
    $leistungsbuch = handleFile($_FILES['file_leistungsbuch']);
    if ($leistungsbuch["status"] == 'OK') {
      $attachments[]= $leistungsbuch["path"];
    }
    $pedegree = handleFile($_FILES['file_pedegree']);
    if ($pedegree["status"] == 'OK') {
      $attachments[]= $pedegree["path"];
    }

    $file = fopen('daten.csv',"w");
    $header = array_keys($_POST);
    fputcsv($file, $header);
    fputcsv($file,$_POST,',');
    fclose($file);
    $attachments[]= 'daten.csv';

    $message = json_encode($_POST, JSON_UNESCAPED_UNICODE)."\n"."IP: ".$userIp."\nTimestamp:".time();

    // Aufruf der Funktion, Versand
     $an = "landesgruppenleiter@pointer-setter-nord.de, ausstellung@pointer-setter-nord.de, admin@pointer-setter-nord.de";
    // $an = "admin@pointer-setter-nord.de";
    $sendOK = mail_att($an, "Onlinemeldung - ".$_POST['fuehrer_name'],
      $message,
      $_POST['fuehrer_name'],
      $_POST['fuehrer_email'],
      $_POST['fuehrer_email'],
      $attachments);

    $ret = array("data" => $sendOK);
  } else {
    $ret = array("error" => 'das war nix!');
  }
  echo json_encode($ret);
}


