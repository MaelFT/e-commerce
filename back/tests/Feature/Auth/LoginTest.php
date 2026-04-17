<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    private string $url = '/api/auth/login';

    public function test_login_avec_credentials_valides_retourne_200(): void
    {
        $user = User::factory()->create([
            'email'    => 'user@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson($this->url, [
            'email'    => 'user@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user'  => ['id', 'name', 'email', 'role'],
                'token',
            ])
            ->assertJsonPath('user.id', $user->id);
    }

    public function test_login_avec_mauvais_mot_de_passe_retourne_401(): void
    {
        User::factory()->create([
            'email'    => 'user@example.com',
            'password' => bcrypt('bon_mot_de_passe'),
        ]);

        $response = $this->postJson($this->url, [
            'email'    => 'user@example.com',
            'password' => 'mauvais_mot_de_passe',
        ]);

        $response->assertStatus(401)
            ->assertJsonPath('message', 'Identifiants incorrects.');
    }

    public function test_login_avec_email_inexistant_retourne_401(): void
    {
        $response = $this->postJson($this->url, [
            'email'    => 'nobody@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(401)
            ->assertJsonPath('message', 'Identifiants incorrects.');
    }

    public function test_login_avec_compte_desactive_retourne_403(): void
    {
        User::factory()->disabled()->create([
            'email'    => 'disabled@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson($this->url, [
            'email'    => 'disabled@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(403)
            ->assertJsonPath('message', 'Votre compte a été désactivé. Contactez le support.');
    }

    public function test_login_sans_email_retourne_422(): void
    {
        $response = $this->postJson($this->url, [
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('email');
    }

    public function test_login_avec_email_invalide_retourne_422(): void
    {
        $response = $this->postJson($this->url, [
            'email'    => 'pas-un-email',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('email');
    }

    public function test_login_sans_password_retourne_422(): void
    {
        $response = $this->postJson($this->url, [
            'email' => 'user@example.com',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('password');
    }
}
