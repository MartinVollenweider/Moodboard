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
		$y = 0;
		$w = 100;
		$h = 50;
		$rot = 0;
		$result = create_content($x, $y, $w, $h, $rot, $cont);
		if ($result){
			echo "<div id='id_".$letzteID."' class='draggable' style='top:".$y."; left:".$x.";'>";
			echo "<img src='".$path.$cont."'>";
			echo "</div>";
			$createContent = true;
		} else {
			//$createContent = false;
		}
	}
