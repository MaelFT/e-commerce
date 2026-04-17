<?php

namespace Tests\Unit\Actions\Auth;

use App\Actions\Auth\RegisterAction;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterActionTest extends TestCase
{
    use RefreshDatabase;

    private RegisterAction $action;

    protected function setUp(): void
    {
        parent::setUp();
        $this->action = new RegisterAction();
    }

    public function test_register_cree_un_utilisateur_en_base(): void
    {
        ($this->action)([
            'name'     => 'Jean Dupont',
            'email'    => 'jean@example.com',
            'password' => 'password123',
        ]);

        $this->assertDatabaseHas('users', [
            'name'  => 'Jean Dupont',
            'email' => 'jean@example.com',
        ]);
    }

    public function test_register_retourne_user_et_token(): void
    {
        $result = ($this->action)([
            'name'     => 'Jean Dupont',
            'email'    => 'jean@example.com',
            'password' => 'password123',
        ]);

        $this->assertArrayHasKey('user', $result);
        $this->assertArrayHasKey('token', $result);
        $this->assertInstanceOf(User::class, $result['user']);
        $this->assertNotEmpty($result['token']);
    }

    public function test_register_assigne_le_role_user_par_defaut(): void
    {
        $result = ($this->action)([
            'name'     => 'Jean Dupont',
            'email'    => 'jean@example.com',
            'password' => 'password123',
        ]);

        $this->assertEquals(UserRole::User, $result['user']->role);
    }

    public function test_register_active_le_compte_par_defaut(): void
    {
        $result = ($this->action)([
            'name'     => 'Jean Dupont',
            'email'    => 'jean@example.com',
            'password' => 'password123',
        ]);

        $this->assertTrue($result['user']->is_active);
    }

    public function test_register_cree_un_token_sanctum(): void
    {
        $result = ($this->action)([
            'name'     => 'Jean Dupont',
            'email'    => 'jean@example.com',
            'password' => 'password123',
        ]);

        $this->assertCount(1, $result['user']->tokens);
    }

    public function test_register_ne_peut_pas_creer_un_admin(): void
    {
        $result = ($this->action)([
            'name'     => 'Faux Admin',
            'email'    => 'faux-admin@example.com',
            'password' => 'password123',
            'role'     => UserRole::Admin->value,
        ]);

        $this->assertEquals(UserRole::User, $result['user']->role);
    }
}
