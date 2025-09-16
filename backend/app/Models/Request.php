<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $fillable = ['book_id', 'user_id', 'status'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function user()
    {
        return $this->belongsTo(Student::class, 'user_id');
    }

    public function getExchangeCount($bookId)
    {
        return $this->where('book_id', $bookId)
            ->where('status', 'accepted')
            ->count();
    }
}
