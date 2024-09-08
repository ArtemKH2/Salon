<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'PHPMailer/language');

    $mail->setFrom('example2@mail.com', 'Mail');
    $mail->addAddress('example2@mail.com');
    
    $name = $_POST['name'] ;
    $email = $_POST['email'];
    $tel = $_POST['tel'];
    $course = $_POST['course'];

    $title = 'Новое заявление на парикмахерский курс'; 
    $body = "<h2>У вас новая заявка на курс!</h2>
    <b>Имя: </b> $name <br>
    <b>Почта: </b> $email <br>
    <b>Телефон: </b> $tel<br>
    <b>Курс: </b> $course";
    
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body; 
    $mail->send();
    echo 'Сообщение было отправлено';
} catch (Exception $e) {
    echo "Ошибка отправки... Код ошибки: {$mail->ErrorInfo}";
}