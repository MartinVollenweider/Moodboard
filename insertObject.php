<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	include_once('system/data.php');
	include_once('system/security.php');

	if ($_FILES) {
		$cont = $_FILES['filename']['name'];

		move_uploaded_file($_FILES['filename']['tmp_name'], $path.$cont);
		// Fields:
		$x = 0;
		$y = 50;
		$w = 100;
		$h = 50;
		$rot = 0;
		// Finktion von data.php
		$result = create_content($x, $y, $w, $h, $rot, $cont);
		if ($result){
			$response  = "<div id='id_".$letzteID."' class='draggable' style='top:".$y."px; left:".$x."px;'>";
			$response .= "<img src='".$path.$cont."'>";
			$response .= "</div>";
			echo $response;
		}
	}
