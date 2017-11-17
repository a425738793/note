<?php
	$sj = $_GET["sj"];
	$g = "/^1[34578]\d{9}$/"; 
	if( preg_match($g,$sj)){
		echo "y";
	}else{
		echo "n";
	}
?>

