<?php
header('Content-Type: application/javascript');
require_once("../../../wp-load.php");


$folder = $_GET['getfull'];

if(empty($folder)) {
  echo '';
  return;
  die();
}
$clist = '';
$dir = new DirectoryIterator(''.$folder.'/');
foreach($dir as $d) {
  if(!$d->isDot()) {
    $clist = $clist.file_get_contents(''.$folder.'/'.$d->getFilename(), true);
  }
}
$clist = str_replace("'use strict';","",$clist);
$clist = '"use strict";'.$clist;
echo preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $clist);

 ?>
