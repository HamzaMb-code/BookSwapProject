<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function signUp(Request $request)
    {

        $validate = $request->validate([
            "name" => 'required|between:3,15',
            "email" => 'required|email|unique:students,email',
            "password" => 'required|between:8,50',
            "phoneNumber" => 'required|digits:10'
        ]);

        $validate['password'] = Hash::make($request->password);
        $validate['role'] = 'student';
        $data = Student::create($validate);

        return response()->json([
            "message" => "Account created successfully 🎉",
            "data" => $data
        ], 201);
    }


    public function login(Request $request)
    {
        // $request->validate([
        //     "email" => 'required|email|unique:students,email',
        //     "password" => 'required|between:8,50',
        // ]);

        $student = Student::where('email', $request->email)->first();

        if (!$student || !Hash::check($request->password, $student->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $student->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $student,
            'token' => $token,
        ]);
    }
}
