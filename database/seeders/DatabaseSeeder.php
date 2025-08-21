<?php

namespace Database\Seeders;

use App\Models\Clas;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\ClasFactory;
use Database\Factories\StudentFactory;
use Database\Factories\TeacherFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'asdasd'
        ]);

        ClasFactory::new()->create([
            'name' => 'Class A'
        ]);
        ClasFactory::new()->create([
            'name' => 'Class B'
        ]);
        ClasFactory::new()->create([
            'name' => 'Class C'
        ]);

        StudentFactory::new()->count(10)->create();
        TeacherFactory::new()->count(10)->create();
    }
}
