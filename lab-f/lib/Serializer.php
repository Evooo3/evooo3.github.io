<?php
namespace App;

class Serializer{
    private array $encoders;
    public function __construct(array $encoders){
        $this->encoders = $encoders;
    }

    public function serialize(string $data, string $input, string $output){
        if (empty($data)) return '';

        if ($input === $output) {
            return $data;
        }

        $inEncoder = $this->findEncoder($input);
        $outEncoder = $this->findEncoder($output);

        if (method_exists($inEncoder, 'setCurrentFormat')) {
            $inEncoder->setCurrentFormat($input);
        }

        $decoded = $inEncoder->decode($data);

        if (method_exists($outEncoder, 'setCurrentFormat')) {
            $outEncoder->setCurrentFormat($output);
        }

        return $outEncoder->encode($decoded);
    }

    private function findEncoder(string $input) {
        foreach ($this->encoders as $encoder) {
            if ($encoder->supports($input)) {
                return $encoder;
            }
        }

        return null;
    }
}