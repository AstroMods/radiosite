<?php

declare(strict_types=1);

header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', '0');

$TOKEN = '323|fWzjX8Ay38qakyyC2Z7ITrdpHLO3Gv1PFF7lSyzb2a7325ae';

$input = json_decode(file_get_contents('php://input'), true);

if (!is_array($input) || empty($input['url'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing URL.'
    ]);
    exit;
}

$url = filter_var($input['url'], FILTER_VALIDATE_URL);

if (!$url) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid URL.'
    ]);
    exit;
}

$payload = json_encode([
    'url' => $url
]);

$ch = curl_init('https://lnk.ua/rest/links');

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer '.$TOKEN,
        'Accept: application/json',
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_TIMEOUT => 30
]);

$response = curl_exec($ch);

if ($response === false) {

    echo json_encode([
        'success' => false,
        'message' => curl_error($ch)
    ]);

    curl_close($ch);
    exit;
}

$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

http_response_code($status);

if ($response === '') {

    echo json_encode([
        'success' => false,
        'message' => 'Empty response from API.'
    ]);

    exit;
}

$json = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {

    echo json_encode([
        'success' => false,
        'message' => 'API returned invalid JSON.',
        'raw' => $response
    ]);

    exit;
}

echo json_encode($json);
