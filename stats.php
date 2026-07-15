<?php

/**
 * Vantix Radio Stats API Proxy
 * 
 * Proxies FastCast4U / Centova Cast stats
 * Prevents CORS issues
 * Adds caching and error protection
 */


// ===============================
// CONFIG
// ===============================

$STREAM_STATS_URL = "https://eu8.fastcast4u.com/proxy/vantixradio/stats?json=1";

$CACHE_FILE = __DIR__ . "/stats-cache.json";

$CACHE_TIME = 15; // seconds

$TIMEOUT = 5;


// ===============================
// HEADERS
// ===============================

header("Content-Type: application/json; charset=utf-8");

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type");

header("Cache-Control: no-cache, no-store, must-revalidate");


// Handle preflight requests

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);

    exit;

}


// Only allow GET

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "error" => "Method not allowed"
    ]);

    exit;

}


// ===============================
// CACHE CHECK
// ===============================

if (
    file_exists($CACHE_FILE) &&
    (time() - filemtime($CACHE_FILE)) < $CACHE_TIME
) {

    $cached = file_get_contents($CACHE_FILE);

    if ($cached) {

        echo $cached;

        exit;

    }

}


// ===============================
// CURL REQUEST
// ===============================

$curl = curl_init();


curl_setopt_array($curl, [

    CURLOPT_URL => $STREAM_STATS_URL,

    CURLOPT_RETURNTRANSFER => true,

    CURLOPT_FOLLOWLOCATION => true,

    CURLOPT_TIMEOUT => $TIMEOUT,

    CURLOPT_CONNECTTIMEOUT => 3,

    CURLOPT_SSL_VERIFYPEER => true,

    CURLOPT_SSL_VERIFYHOST => 2,

    CURLOPT_USERAGENT =>
        "Vantix-Radio-API/1.0",

    CURLOPT_HTTPHEADER => [

        "Accept: application/json"

    ]

]);


$response = curl_exec($curl);


$curlError = curl_error($curl);


$httpCode = curl_getinfo(
    $curl,
    CURLINFO_HTTP_CODE
);


curl_close($curl);



// ===============================
// CURL ERROR HANDLING
// ===============================

if ($response === false) {


    http_response_code(503);


    echo json_encode([

        "success" => false,

        "error" => "Radio server unavailable",

        "details" => $curlError,

        "listeners" => 0,

        "source" => "fallback"

    ]);


    exit;

}



// ===============================
// HTTP ERROR HANDLING
// ===============================

if ($httpCode !== 200) {


    http_response_code(502);


    echo json_encode([

        "success" => false,

        "error" => "Invalid radio response",

        "http_code" => $httpCode,

        "listeners" => 0

    ]);


    exit;

}



// ===============================
// JSON VALIDATION
// ===============================

$data = json_decode($response, true);


if (json_last_error() !== JSON_ERROR_NONE) {


    http_response_code(502);


    echo json_encode([

        "success" => false,

        "error" => "Invalid JSON from radio server",

        "listeners" => 0

    ]);


    exit;

}



// ===============================
// ADD API METADATA
// ===============================

$data["_vantix"] = [

    "success" => true,

    "timestamp" => time(),

    "cached" => false,

    "station" => "Vantix Radio"

];


// Encode final response

$output = json_encode(
    $data,
    JSON_PRETTY_PRINT |
    JSON_UNESCAPED_SLASHES
);



// ===============================
// SAVE CACHE
// ===============================

file_put_contents(
    $CACHE_FILE,
    $output,
    LOCK_EX
);



// ===============================
// OUTPUT
// ===============================

echo $output;

?>
