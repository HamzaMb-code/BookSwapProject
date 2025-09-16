<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Auth;

class RequestController extends Controller
{
    public function store(HttpRequest $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id'
        ]);

        // Get the authenticated student
        $student = Auth::user();

        // Check if the student has at least one book
        $studentBooks = Book::where('student_id', $student->id)->count();
        if ($studentBooks === 0) {
            return response()->json([
                'message' => 'You need to have at least one book to make an exchange request'
            ], 403);
        }

        // Check if the book belongs to the student
        $book = Book::findOrFail($request->book_id);
        if ($book->student_id === $student->id) {
            return response()->json([
                'message' => 'You cannot request to exchange your own book'
            ], 403);
        }

        // Check if there's already a pending request
        $existingRequest = Request::where('book_id', $request->book_id)
            ->where('user_id', $student->id)
            ->where('status', 'pending')
            ->first();

        if ($existingRequest) {
            return response()->json([
                'message' => 'You already have a pending request for this book'
            ], 400);
        }

        // Create the exchange request
        $exchangeRequest = Request::create([
            'book_id' => $request->book_id,
            'user_id' => $student->id,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Exchange request created successfully',
            'data' => $exchangeRequest
        ], 201);
    }

    public function index()
    {
        $student = Auth::user();

        $receivedRequests = Request::with(['book', 'user'])
            ->whereHas('book', function ($query) use ($student) {
                $query->where('student_id', $student->id);
            })
            ->get();

        $sentRequests = Request::with(['book', 'user'])
            ->where('user_id', $student->id)
            ->get();

        return response()->json([
            'received_requests' => $receivedRequests,
            'sent_requests' => $sentRequests
        ]);
    }

    public function updateStatus(HttpRequest $request, Request $exchangeRequest)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected'
        ]);

        // Check if the user is the owner of the book
        if ($exchangeRequest->book->student_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized action'
            ], 403);
        }

        $exchangeRequest->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Exchange request status updated successfully',
            'data' => $exchangeRequest
        ]);
    }

    public function getExchangeCount($bookId)
    {
        $request = new Request();
        $count = $request->getExchangeCount($bookId);

        return response()->json([
            'exchange_count' => $count
        ]);
    }
}
