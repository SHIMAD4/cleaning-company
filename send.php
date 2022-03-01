<?php
$phone       = $_POST['phone'];
$phone1       = $_POST['phone1'];
$phone2		  = $_POST['phone2'];
$phone3		  = $_POST['phone3'];
$email		  = $_POST['email'];
$ques		  = $_POST['ques'];
$time		  = $_POST['time'];
$referer	  = $_POST['referer'];
$formname	  = $_POST['formname'];
$ref_url	  = $_POST['ref_url'];
$name  		  = $_POST['name'];
$to   		= 'Dmitriy.slyunko@ya.ru';//replace with your email
$mes = "Имя: $name \n\nТелефон: $phone \n\nИмя формы: $formname \n\nУдобное время: $time \n\nТелефон1: $phone1 \n\nТелефон2: $phone2 \n\nТелефон3: $phone3 \n\nПочта: $email \n\nВопрос: $ques \n\nReferer: $referer \n\nRef_url: $ref_url";

$headers = "MIME-Version: 1.0";
$headers = "Content-type: text/html; charset=utf-8";
$headers = "".$mes."";

mail($to, $mes, $headers);
?>