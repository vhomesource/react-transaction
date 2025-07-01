<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('/api/transactions', TransactionController::class);
