<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /**
     * Handles user login and generating an authentication token if successful.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Invalid data', 'errors' => $validator->errors()->toArray()]);
        }

        $credentials = $request->only(['email', 'password']);
        $user = User::where('email', '=', $request->get('email'))->first();
        if ($user && Hash::check($credentials['password'], $user->password)) {
            $token = $user->createToken('user-token')->plainTextToken;

            $userDetails = [
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
            ];

            return response()->json([
                'success' => true,
                'message' => __('Logged in successfully'),
                'user' => $userDetails,
                'token' => $token
            ]);
        }
        return response()->json(['status' => false, 'message' => 'Incorrect user details', 'errors' => $validator->errors()->first()]);
    }

    /**
     * Logs out the authenticated user by deleting their tokens.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $userId = auth()->guard('user')->id();
        $user = User::find($userId);

        if ($user) {

            $user->tokens()->delete();
            return response()->json([
                'success' => true,
                'message' => 'You have been successfully logged out!',
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Unable to log out. User not authenticated.',
        ]);
    }
}
