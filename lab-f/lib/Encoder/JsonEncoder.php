<?php
namespace App\Encoder;

class JsonEncoder implements EncoderInterface {

    public function supports(string $format){
        return strtolower($format) == 'json';
    }

    public function decode(string $data){
        return json_decode($data, true);
    }

    public function encode(array $data){
        return json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }


}