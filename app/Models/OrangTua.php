<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrangTua extends Model
{
    /** @use HasFactory<\Database\Factories\OrangTuaFactory> */
    use HasFactory;

    protected $table = 'parents';

    protected $guarded = ['id'];

   public function students(){
    return $this->hasOne(Student::class, 'parent_id');
   }   
}
