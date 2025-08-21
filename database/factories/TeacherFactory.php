<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TeacherFactory extends Factory
{
    public function definition(): array
    {
      return [
        'name' => fake()->name(),
        'class_id' => fake()->numberBetween(1, 3)
      ];
    }
}
