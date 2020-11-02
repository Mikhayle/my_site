<?php 

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$comment = $_POST['user_comments'];
$token = "1304955754:AAGjRUoC0YCPeQ4LbPx1jDSJaCQGLGYd_Tc";
$chat_id = "-200376098";


$arr = array(
	'Имя пользователя: ' => $name,
	'Телефон: ' => $phone,
	'E-mail' => $email,
	'Комментарий' => $comment
);

foreach ($arr as $key => $value) {
	$txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
	header('Location: index.html');
} else {
	echo "Error";
}

?>