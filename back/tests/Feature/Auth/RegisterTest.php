<?php

namespace Tests\Feature\Auth;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    private string $url = '/api/auth/register';

    private array $validPayload = [
        'name'                  => 'Jean Dupont',
        'email'                 => 'jean@example.com',
        'password'              => 'password123',
        'password_confirmation' => 'password123',
    ];

    public function test_register_avec_donnees_valides_retourne_201(): void
    {
        $response = $this->postJson($this->url, $this->validPayload);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'user'  => ['id', 'name', 'email', 'role'],
                'token',
            ]);
    }

    public function test_register_cree_un_utilisateur_en_base(): void
    {
        $this->postJson($this->url, $this->validPayload);

        $this->assertDatabaseHas('users', [
            'name'  => 'Jean Dupont',
            'email' => 'jean@example.com',
        ]);
    }

    public function test_register_assigne_le_role_user(): void
    {
        $response = $this->postJson($this->url, $this->validPayload);

        $response->assertJsonPath('user.role', UserRole::User->value);
    }

    public function test_register_avec_email_deja_existant_retourne_422(): void
    {
        User::factory()->create(['email' => 'jean@example.com']);

        $response = $this->postJson($this->url, $this->validPayload);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('email');
    }

    public function test_register_sans_nom_retourne_422(): void
    {
        $response = $this->postJson($this->url, [
            ...$this->validPayload,
            'name' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('name');
    }

    public function test_register_avec_email_invalide_retourne_422(): void
    {
        $response = $this->postJson($this->url, [
            ...$this->validPayload,
            'email' => 'pas-un-email',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('email');
    }

    public function test_register_avec_mot_de_passe_trop_court_retourne_422(): void
    {
        $response = $this->postJson($this->url, [
            ...$this->validPayload,
            'password'              => 'court',
            'password_confirmation' => 'court',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('password');
    }

    public function test_register_avec_confirmation_incorrecte_retourne_422(): void
    {
        $response = $this->postJson($this->url, [
            ...$this->validPayload,
            'password'              => 'password123',
            'password_confirmation' => 'different456',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('password');
    }

    public function test_register_sans_confirmation_retourne_422(): void
    {
        $response = $this->postJson($this->url, [
            'name'     => 'Jean Dupont',
            'email'    => 'jean@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrorFor('password');
    }
}
