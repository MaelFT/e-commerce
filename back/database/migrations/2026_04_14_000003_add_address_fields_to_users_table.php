<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('shipping_first_name')->nullable()->after('name');
            $table->string('shipping_last_name')->nullable()->after('shipping_first_name');
            $table->string('shipping_address')->nullable()->after('shipping_last_name');
            $table->string('shipping_city')->nullable()->after('shipping_address');
            $table->string('shipping_postal_code')->nullable()->after('shipping_city');
            $table->string('shipping_country')->nullable()->after('shipping_postal_code');
            $table->string('shipping_phone')->nullable()->after('shipping_country');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'shipping_first_name',
                'shipping_last_name',
                'shipping_address',
                'shipping_city',
                'shipping_postal_code',
                'shipping_country',
                'shipping_phone',
            ]);
        });
    }
};
