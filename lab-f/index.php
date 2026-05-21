<?php
require_once __DIR__ . '/autoload.php';

use App\Serializer;
use App\Encoder\CsvEncoder;
use App\Encoder\JsonEncoder;
use App\Encoder\YamlEncoder;

$input = $_COOKIE['input'] ?? 'csv';
$output = $_COOKIE['output'] ?? 'json';
$inData = $_COOKIE['inData'] ?? '';
$outData = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = $_POST['input'] ?? 'csv';
    $output = $_POST['output'] ?? 'json';
    $inData = $_POST['inData'] ?? '';

    setcookie('input', $input, time() + (86400 * 30), "/");
    setcookie('output', $output, time() + (86400 * 30), "/");
    setcookie('inData', $inData, time() + (86400 * 30), "/");

    $serializer = new Serializer([
        new CsvEncoder(),
        new JsonEncoder(),
        new YamlEncoder()
    ]);

    $outData = $serializer->serialize($inData, $input, $output);
}




require __DIR__ . '/templates/layout.php';

