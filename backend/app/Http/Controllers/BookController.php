<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    public function show($id)
    {
        $book = Book::with('student')->find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        return response()->json($book);
    }

    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        // Delete the book's image from storage
        if ($book->image) {
            $imagePath = str_replace(asset('storage/'), '', $book->image);
            Storage::disk('public')->delete($imagePath);
        }

        $book->delete();
        return response()->json(['message' => 'Book deleted successfully']);
    }

    // تخزين كتاب جديد وربطه بالطالب المسجّل
    public function store(Request $request)
    {
        // التحقق من صحة البيانات
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
            'condition' => 'required|string',
            'category' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // رفع الصورة إلى مجلد التخزين
        $path = $request->file('image')->store('booksImage', 'public');
        $imageUrl = asset('storage/' . $path);

        // إنشاء الكتاب
        $book = new Book();
        $book->title = $request->title;
        $book->author = $request->author;
        $book->description = $request->description;
        $book->condition = $request->condition;
        $book->category = $request->category;
        $book->image = $imageUrl;
        $book->student_id = Auth::id();

        $book->save();

        return response()->json(['message' => 'Book added successfully'], 201);
    }
}
