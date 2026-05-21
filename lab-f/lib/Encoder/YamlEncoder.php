<?php
namespace App\Encoder;

class YamlEncoder implements EncoderInterface {

    public function supports(string $format){
        return strtolower($format) == 'yaml';
    }

    public function decode(string $data){
        return yaml_parse($data);
    }

    public function encode(array $data){
        return yaml_emit($data);
    }


}