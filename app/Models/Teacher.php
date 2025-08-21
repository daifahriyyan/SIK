<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $guarded = ['id'];

    public function clas()
    {
        return $this->belongsTo(Clas::class, 'class_id');
    }
}
