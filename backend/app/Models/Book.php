<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'description',
        'condition',
        'category',
        'image',
        'student_id'
    ];

    // العلاقة: كل كتاب ينتمي إلى طالب
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
