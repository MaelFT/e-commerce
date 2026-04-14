<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('stripe_session_id')->unique();
            $table->string('stripe_payment_intent')->nullable();
            $table->string('status')->default('pending'); // pending, paid, failed
            $table->integer('subtotal');   // in cents
            $table->integer('shipping');   // in cents
            $table->integer('total');      // in cents
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
