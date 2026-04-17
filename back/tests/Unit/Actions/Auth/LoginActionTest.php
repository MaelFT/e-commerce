<?php

namespace Tests\Unit\Actions\Auth;

use App\Actions\Auth\LoginAction;
use App\Exceptions\AccountDisabledException;
use App\Exceptions\InvalidCredentialsException;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginActionTest extends TestCase
{
    use RefreshDatabase;

    private LoginAction $action;

    protected function setUp(): void
    {
        parent::setUp();
        $this->action = new LoginAction();
    }

    public function test_login_avec_credentials_valides_retourne_user_et_token(): void
    {
        $user = User::factory()->create([
            'email'    => 'user@example.com',
            'password' => bcrypt('password123'),
        ]);

        $result = ($this->action)([
            'email'    => 'user@example.com',
            'password' => 'password123',
        ]);

        $this->assertArrayHasKey('user', $result);
        $this->assertArrayHasKey('token', $result);
        $this->assertEquals($user->id, $result['user']->id);
        $this->assertNotEmpty($result['token']);
    }

    public function test_login_avec_mauvais_mot_de_passe_leve_une_exception(): void
    {
        User::factory()->create([
            'email'    => 'user@example.com',
            'password' => bcrypt('bon_mot_de_passe'),
        ]);

        $this->expectException(InvalidCredentialsException::class);

        ($this->action)([
            'email'    => 'user@example.com',
            'password' => 'mauvais_mot_de_passe',
        ]);
    }

    public function test_login_avec_email_inexistant_leve_une_exception(): void
    {
        $this->expectException(InvalidCredentialsException::class);

        ($this->action)([
            'email'    => 'inexistant@example.com',
            'password' => 'password123',
        ]);
    }

    public function test_login_avec_compte_desactive_leve_une_exception(): void
    {
        User::factory()->disabled()->create([
            'email'    => 'disabled@example.com',
            'password' => bcrypt('password123'),
        ]);

        $this->expectException(AccountDisabledException::class);

        ($this->action)([
            'email'    => 'disabled@example.com',
            'password' => 'password123',
        ]);
    }

    public function test_login_cree_un_token_sanctum(): void
    {
        $user = User::factory()->create([
            'email'    => 'user@example.com',
            'password' => bcrypt('password123'),
        ]);

        $this->assertCount(0, $user->tokens);

        ($this->action)([
            'email'    => 'user@example.com',
            'password' => 'password123',
        ]);

        $this->assertCount(1, $user->fresh()->tokens);
    }
}
