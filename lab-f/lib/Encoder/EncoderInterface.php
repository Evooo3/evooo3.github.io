<?php

namespace App\Encoder;

interface EncoderInterface
{
    public function supports(string $format);

    public function decode(string $data);

    public function encode(array $data);
}