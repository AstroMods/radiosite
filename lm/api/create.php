<?php
header("Content-Type: application/json");

$TOKEN = "322|J0fa20eM6U207IqNSOGhLkXROA7iBtVV3yFdBXHL5d775524";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["url"]) || empty($data["url"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Missing URL."
    ]);
    exit;
}

$url = $data["url"];

$payload = json_encode([
    "url" => $url
]);

$ch = curl_init("https://lnk.ua/rest/links");

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer {$TOKEN}",
        "Content-Type: application/json",
        "Accept: application/json"
    ],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_TIMEOUT => 20
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => curl_error($ch)
    ]);
    curl_close($ch);
    exit;
}

$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($status);
echo $response;
