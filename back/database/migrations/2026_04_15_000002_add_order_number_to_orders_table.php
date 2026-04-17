<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('order_number')->nullable()->after('id');
        });

        // Generate order_number for existing orders
        $orders = \App\Models\Order::whereNull('order_number')->get();
        foreach ($orders as $order) {
            $order->order_number = 'CMD-' . strtoupper(substr(md5($order->id . $order->created_at), 0, 8));
            $order->save();
        }

        // Now make it unique and not null
        Schema::table('orders', function (Blueprint $table) {
            $table->string('order_number')->unique()->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('order_number');
        });
    }
};
