<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $bell = User::factory()->create([
            'name'     => 'Bell',
            'email'    => 'bell@example.com',
            'password' => bcrypt('password'),
        ]);

        Post::factory()->count(5)->create([
            'user_id' => $bell->id,
        ]);

        User::factory(10)->hasPosts(3)->create();
    }
}