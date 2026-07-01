<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$url = "https://eu8.fastcast4u.com/proxy/vantixradio/stats?json=1";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
