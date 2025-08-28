<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $guarded = ['id'];

    public function clas()
    {
        return $this->belongsTo(Clas::class, 'class_id');
    }

    public function orangTua(){
        return $this->belongsTo(OrangTua::class,  'parent_id');
    }
}
