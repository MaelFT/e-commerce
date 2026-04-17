<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:150',
            'message' => 'required|string|min:10|max:2000',
        ]);

        Mail::to('contact@amazone.fr')->send(new ContactMail(
            senderName:     $request->input('name'),
            senderEmail:    $request->input('email'),
            contactSubject: $request->input('subject'),
            messageBody:    $request->input('message'),
        ));

        return response()->json(['message' => 'Votre message a bien été envoyé.']);
    }
}
