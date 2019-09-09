<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	include_once('system/data.php');
	//include_once('system/security.php');

	$result = show_content();

	while($event = mysqli_fetch_assoc($result)){
		$out = "<div id='id_".$event['id']."' class='draggable' ";
		$out.= "style='top:".$event['y']."px; left:".$event['x']."px; transform:rotate(".$event['rot']."deg); ";
		$out.= "width:".$event['w']."px; height:".$event['h']."px;'>";
		$out.= "<img src='".$path.$event['cont']."'></div>";
		echo $out;
	}
