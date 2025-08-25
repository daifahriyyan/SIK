<?php

use App\Http\Controllers\ClasController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Models\Clas;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/auth', [UserController::class, 'index'])->name('login');
Route::post('/signin', [UserController::class, 'authenticate']);
Route::post('/signup', [UserController::class, 'store']);
Route::delete('/logout', [UserController::class, 'logout'])->name('logout');

Route::get('/', function(){
    return inertia('Home', [
        'user' => Auth::user()
    ]);
})->middleware('auth')->name('home');

Route::get('/dashboard', function () {
    return inertia('Dashboard', [
        'classes' => Clas::with('students', 'teachers')->get(),
    ]);
})->middleware('auth')->name('dashboard');

Route::get('/manage', function () {
    return inertia('Manage', [
            'classes' => Clas::all(),
            'teachers' => Teacher::with('clas')->get(),
            'students' => Student::with('clas')->get(),
        ]);
})->middleware('auth')->name('manage');

// Resource Classes, Teachers, dan Students
Route::resource('classes', ClasController::class)->middleware('auth')->except(['index', 'create', 'show', 'edit']);
Route::resource('teachers', TeacherController::class)->middleware('auth')->except(['index', 'create', 'show', 'edit']);
Route::resource('students', StudentController::class)->middleware('auth')->except(['index', 'create', 'show', 'edit']);

