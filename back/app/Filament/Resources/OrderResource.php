<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon   = 'heroicon-o-clipboard-document-list';
    protected static ?string $navigationLabel  = 'Commandes';
    protected static ?string $modelLabel       = 'Commande';
    protected static ?string $pluralModelLabel = 'Commandes';
    protected static ?int    $navigationSort   = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Commande')
                    ->schema([
                        Forms\Components\TextInput::make('order_number')
                            ->label('N° Commande')
                            ->disabled(),

                        Forms\Components\Select::make('status')
                            ->label('Statut')
                            ->required()
                            ->options([
                                'pending' => 'En attente',
                                'paid'    => 'Payée',
                                'failed'  => 'Échouée',
                            ]),

                        Forms\Components\Select::make('user_id')
                            ->label('Client')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->disabled(),
                    ])->columns(3),

                Forms\Components\Section::make('Montants')
                    ->schema([
                        Forms\Components\TextInput::make('subtotal')
                            ->label('Sous-total (centimes)')
                            ->numeric()
                            ->disabled(),

                        Forms\Components\TextInput::make('shipping')
                            ->label('Livraison (centimes)')
                            ->numeric()
                            ->disabled(),

                        Forms\Components\TextInput::make('total')
                            ->label('Total (centimes)')
                            ->numeric()
                            ->disabled(),
                    ])->columns(3),

                Forms\Components\Section::make('Adresse de livraison')
                    ->schema([
                        Forms\Components\TextInput::make('shipping_address')
                            ->label('Adresse')
                            ->disabled(),

                        Forms\Components\TextInput::make('shipping_city')
                            ->label('Ville')
                            ->disabled(),

                        Forms\Components\TextInput::make('shipping_postal_code')
                            ->label('Code postal')
                            ->disabled(),

                        Forms\Components\TextInput::make('shipping_country')
                            ->label('Pays')
                            ->disabled(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_number')
                    ->label('N° Commande')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->copyable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Client')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'En attente',
                        'paid'    => 'Payée',
                        'failed'  => 'Échouée',
                        default   => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'paid'    => 'success',
                        'failed'  => 'danger',
                        default   => 'gray',
                    }),

                Tables\Columns\TextColumn::make('items_count')
                    ->label('Articles')
                    ->counts('items')
                    ->sortable(),

                Tables\Columns\TextColumn::make('subtotal')
                    ->label('Sous-total')
                    ->formatStateUsing(fn (int $state): string => number_format($state / 100, 2, ',', ' ') . ' €')
                    ->alignEnd(),

                Tables\Columns\TextColumn::make('shipping')
                    ->label('Livraison')
                    ->formatStateUsing(fn (int $state): string => $state === 0 ? 'Gratuit' : number_format($state / 100, 2, ',', ' ') . ' €')
                    ->alignEnd(),

                Tables\Columns\TextColumn::make('total')
                    ->label('Total')
                    ->formatStateUsing(fn (int $state): string => number_format($state / 100, 2, ',', ' ') . ' €')
                    ->weight('bold')
                    ->alignEnd()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'En attente',
                        'paid'    => 'Payée',
                        'failed'  => 'Échouée',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Commande')
                    ->schema([
                        Infolists\Components\TextEntry::make('order_number')
                            ->label('N° Commande'),

                        Infolists\Components\TextEntry::make('status')
                            ->label('Statut')
                            ->badge()
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'pending' => 'En attente',
                                'paid'    => 'Payée',
                                'failed'  => 'Échouée',
                                default   => $state,
                            })
                            ->color(fn (string $state): string => match ($state) {
                                'pending' => 'warning',
                                'paid'    => 'success',
                                'failed'  => 'danger',
                                default   => 'gray',
                            }),

                        Infolists\Components\TextEntry::make('user.name')
                            ->label('Client'),

                        Infolists\Components\TextEntry::make('user.email')
                            ->label('E-mail'),

                        Infolists\Components\TextEntry::make('created_at')
                            ->label('Date')
                            ->dateTime('d/m/Y H:i'),
                    ])->columns(3),

                Infolists\Components\Section::make('Adresse de livraison')
                    ->schema([
                        Infolists\Components\TextEntry::make('shipping_address')
                            ->label('Adresse'),

                        Infolists\Components\TextEntry::make('shipping_city')
                            ->label('Ville'),

                        Infolists\Components\TextEntry::make('shipping_postal_code')
                            ->label('Code postal'),

                        Infolists\Components\TextEntry::make('shipping_country')
                            ->label('Pays'),
                    ])->columns(4),

                Infolists\Components\Section::make('Articles')
                    ->schema([
                        Infolists\Components\RepeatableEntry::make('items')
                            ->label('')
                            ->schema([
                                Infolists\Components\TextEntry::make('product_name')
                                    ->label('Produit'),

                                Infolists\Components\TextEntry::make('quantity')
                                    ->label('Qté'),

                                Infolists\Components\TextEntry::make('unit_price')
                                    ->label('Prix unit.')
                                    ->formatStateUsing(fn (int $state): string => number_format($state / 100, 2, ',', ' ') . ' €'),
                            ])->columns(3),
                    ]),

                Infolists\Components\Section::make('Montants')
                    ->schema([
                        Infolists\Components\TextEntry::make('subtotal')
                            ->label('Sous-total')
                            ->formatStateUsing(fn (int $state): string => number_format($state / 100, 2, ',', ' ') . ' €'),

                        Infolists\Components\TextEntry::make('shipping')
                            ->label('Livraison')
                            ->formatStateUsing(fn (int $state): string => $state === 0 ? 'Gratuit' : number_format($state / 100, 2, ',', ' ') . ' €'),

                        Infolists\Components\TextEntry::make('total')
                            ->label('Total')
                            ->formatStateUsing(fn (int $state): string => number_format($state / 100, 2, ',', ' ') . ' €')
                            ->weight('bold'),
                    ])->columns(3),

                Infolists\Components\Section::make('Stripe')
                    ->schema([
                        Infolists\Components\TextEntry::make('stripe_session_id')
                            ->label('Session ID')
                            ->copyable(),

                        Infolists\Components\TextEntry::make('stripe_payment_intent')
                            ->label('Payment Intent')
                            ->copyable(),
                    ])->columns(2)->collapsed(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'view'  => Pages\ViewOrder::route('/{record}'),
            'edit'  => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
