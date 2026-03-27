<?php

namespace App\Filament\Resources;

use App\Enums\UserRole;
use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon   = 'heroicon-o-users';
    protected static ?string $navigationLabel  = 'Utilisateurs';
    protected static ?string $modelLabel       = 'Utilisateur';
    protected static ?string $pluralModelLabel = 'Utilisateurs';
    protected static ?int    $navigationSort   = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nom')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('email')
                            ->label('Adresse e-mail')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true),

                        Forms\Components\Select::make('role')
                            ->label('Rôle')
                            ->options([
                                UserRole::User->value  => 'Utilisateur',
                                UserRole::Admin->value => 'Administrateur',
                            ])
                            ->required()
                            ->disabled(fn () => Auth::id() === optional(request()->route('record'))?->id),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Compte actif')
                            ->default(true)
                            ->disabled(fn () => Auth::id() === optional(request()->route('record'))?->id),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Mot de passe')
                    ->description('Laisser vide pour ne pas modifier')
                    ->schema([
                        Forms\Components\TextInput::make('password')
                            ->label('Nouveau mot de passe')
                            ->password()
                            ->dehydrateStateUsing(fn ($state) => filled($state) ? bcrypt($state) : null)
                            ->dehydrated(fn ($state) => filled($state))
                            ->maxLength(255),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable()
                    ->weight('medium'),

                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('role')
                    ->label('Rôle')
                    ->formatStateUsing(fn (UserRole $state): string => match ($state) {
                        UserRole::Admin => 'Admin',
                        UserRole::User  => 'Utilisateur',
                    })
                    ->colors([
                        'warning' => UserRole::Admin->value,
                        'gray'    => UserRole::User->value,
                    ]),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Actif')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('danger'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Inscrit le')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->label('Rôle')
                    ->options([
                        UserRole::User->value  => 'Utilisateur',
                        UserRole::Admin->value => 'Administrateur',
                    ]),

                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Compte actif'),
            ])
            ->actions([
                Tables\Actions\Action::make('toggle_active')
                    ->label(fn (User $record): string => $record->is_active ? 'Désactiver' : 'Réactiver')
                    ->icon(fn (User $record): string => $record->is_active ? 'heroicon-o-lock-closed' : 'heroicon-o-lock-open')
                    ->color(fn (User $record): string => $record->is_active ? 'danger' : 'success')
                    ->requiresConfirmation()
                    ->modalHeading(fn (User $record): string => $record->is_active ? 'Désactiver ce compte ?' : 'Réactiver ce compte ?')
                    ->modalDescription(fn (User $record): string => $record->is_active
                        ? "L'utilisateur {$record->name} ne pourra plus se connecter."
                        : "L'utilisateur {$record->name} pourra à nouveau se connecter.")
                    ->action(function (User $record) {
                        if ($record->id === Auth::id()) {
                            Notification::make()
                                ->title('Action impossible')
                                ->body('Vous ne pouvez pas désactiver votre propre compte.')
                                ->danger()
                                ->send();
                            return;
                        }
                        $record->update(['is_active' => ! $record->is_active]);
                        Notification::make()
                            ->title($record->is_active ? 'Compte réactivé' : 'Compte désactivé')
                            ->success()
                            ->send();
                    }),

                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit'   => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
