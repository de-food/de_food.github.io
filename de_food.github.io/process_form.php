<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = strip_tags(trim($_POST["name"]));
  $name = str_replace(array("\r","\n"),array(" "," "), $name);
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $message = trim($_POST["message"]);

  // Проверка данных
  if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Пожалуйста, заполните все поля и укажите корректный email.";
    exit;
  }

  $recipient = "allaberdindaniil@gmail.com"; //
  $subject = "Новое сообщение с сайта DE Food";
  $email_content = "Имя: $name\n";
  $email_content .= "Email: $email\n\n";
  $email_content .= "Сообщение:\n$message\n";
  $email_headers = "From: $name <$email>";

  if (mail($recipient, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo "Спасибо! Ваше сообщение отправлено.";
  } else {
    http_response_code(500);
    echo "Произошла ошибка при отправке сообщения.";
  }

} else {
  http_response_code(403);
  echo "Произошла ошибка, попробуйте еще раз.";
}
?>
