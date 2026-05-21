<?php
namespace App\Encoder;

class CsvEncoder implements EncoderInterface {
    private array $separators = [
        'csv' => ',',
        'ssv' => ';',
        'tsv' => "\t"
    ];

    private string $currentFormat = 'csv';

    public function setCurrentFormat(string $format) {
        $this->currentFormat = strtolower($format);
    }

    public function supports(string $format){
        return array_key_exists(strtolower($format), $this->separators);
    }

    public function decode(string $data){
        $lines = array_filter(array_map('trim', explode("\n", trim($data))));
        if (empty($lines)) return [];

        $separator = $this->separators[$this->currentFormat];

        $pierwszy = array_shift($lines);
        $naglowki = str_getcsv($pierwszy, $separator,'"', "\\");
        $result = [];

        foreach ($lines as $line) {
            $row = str_getcsv($line, $separator, '"', "\\");
            if (count($row) === count($naglowki)) {
                $result[] = array_combine($naglowki, $row);
            }
        }
        return $result;
    }

    public function encode(array $data){
        if (empty($data)) return '';

        $separator = $this->separators[$this->currentFormat];

            $naglowki = array_keys(current($data));
        $output = fopen('php://temp', 'r+');

        fputcsv($output, $naglowki, $separator, '"', "\\");
        foreach ($data as $row) {
            fputcsv($output, $row, $separator, '"', "\\");
        }

        rewind($output);
        $csvText = stream_get_contents($output);
        fclose($output);

        return str_replace('"', '',trim($csvText));
    }


}