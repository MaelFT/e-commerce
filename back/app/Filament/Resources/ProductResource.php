<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon  = 'heroicon-o-shopping-bag';
    protected static ?string $navigationLabel = 'Produits';
    protected static ?string $modelLabel      = 'Produit';
    protected static ?string $pluralModelLabel = 'Produits';
    protected static ?int    $navigationSort  = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations générales')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nom')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) =>
                                $set('slug', Str::slug($state ?? ''))
                            ),

                        Forms\Components\TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Forms\Components\Select::make('category')
                            ->label('Catégorie')
                            ->required()
                            ->options([
                                'Audio'        => 'Audio',
                                'Ordinateurs'  => 'Ordinateurs',
                                'Accessoires'  => 'Accessoires',
                                'Smartphones'  => 'Smartphones',
                                'Tablettes'    => 'Tablettes',
                                'Écrans'       => 'Écrans',
                            ]),

                        Forms\Components\TextInput::make('price')
                            ->label('Prix (€)')
                            ->required()
                            ->numeric()
                            ->prefix('€')
                            ->minValue(0),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Contenu')
                    ->schema([
                        Forms\Components\TextInput::make('image')
                            ->label('URL de l\'image')
                            ->required()
                            ->url()
                            ->placeholder('https://images.unsplash.com/...')
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('description')
                            ->label('Description')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),

                        Forms\Components\Repeater::make('features')
                            ->label('Caractéristiques')
                            ->schema([
                                Forms\Components\TextInput::make('feature')
                                    ->label('Caractéristique')
                                    ->required(),
                            ])
                            ->afterStateHydrated(function (Forms\Components\Repeater $component, $state) {
                                if (empty($state)) {
                                    $component->state([]);
                                    return;
                                }
                                // Convertit ['string', ...] → [['feature' => 'string'], ...]
                                if (is_array($state) && isset($state[0]) && is_string($state[0])) {
                                    $component->state(
                                        array_map(fn (string $f) => ['feature' => $f], $state)
                                    );
                                }
                            })
                            ->dehydrateStateUsing(fn (array $state): array =>
                                array_values(array_filter(array_column($state, 'feature')))
                            )
                            ->reorderable()
                            ->addActionLabel('Ajouter une caractéristique')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Statistiques & Stock')
                    ->schema([
                        Forms\Components\TextInput::make('rating')
                            ->label('Note')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(5)
                            ->step(0.1)
                            ->default(0),

                        Forms\Components\TextInput::make('reviews_count')
                            ->label('Nombre d\'avis')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0),

                        Forms\Components\TextInput::make('stock')
                            ->label('Stock')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->default(0),

                        Forms\Components\Toggle::make('is_new')
                            ->label('Nouveauté')
                            ->default(false),
                    ])
                    ->columns(4),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('')
                    ->width(56)
                    ->height(56)
                    ->extraImgAttributes(['class' => 'rounded-lg object-cover']),

                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable()
                    ->weight('medium'),

                Tables\Columns\TextColumn::make('category')
                    ->label('Catégorie')
                    ->badge()
                    ->color('gray')
                    ->searchable(),

                Tables\Columns\TextColumn::make('price')
                    ->label('Prix')
                    ->formatStateUsing(fn (float $state): string => number_format($state, 2, ',', ' ') . ' €')
                    ->sortable(),

                Tables\Columns\TextColumn::make('stock')
                    ->label('Stock')
                    ->sortable()
                    ->color(fn (int $state): string => match (true) {
                        $state === 0  => 'danger',
                        $state <= 10  => 'warning',
                        default       => 'success',
                    }),

                Tables\Columns\TextColumn::make('rating')
                    ->label('Note')
                    ->sortable()
                    ->formatStateUsing(fn (float $state): string => "⭐ $state"),

                Tables\Columns\IconColumn::make('is_new')
                    ->label('Nouveau')
                    ->boolean(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Catégorie')
                    ->options([
                        'Audio'        => 'Audio',
                        'Ordinateurs'  => 'Ordinateurs',
                        'Accessoires'  => 'Accessoires',
                        'Smartphones'  => 'Smartphones',
                        'Tablettes'    => 'Tablettes',
                        'Écrans'       => 'Écrans',
                    ]),

                Tables\Filters\TernaryFilter::make('is_new')
                    ->label('Nouveauté'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit'   => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
