<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

include_once('system/data.php');
include_once('system/security.php');

extract($_GET);

$result = update_content($id, $x, $y, $w, $h, $rot);
