<?php

namespace App\Http\Controllers;

use App\Mail\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function index()
    {
        return view('email');
    }

    public function sendEmail(Request $request)
    {
        $data = $request->validate(['email' => ['required', 'email'], 'title' => [''], 'message' => ['required']]);
        extract($data);
        Mail::to($request->user())->send(new Test($email, $title, $message));

        if (Mail::failures()) {
            return response()->Fail('Sorry! Please try again later');
        } else {
            return response()->json('Yes, You have sent email from LARAVEL !!');
        }
    }
}
