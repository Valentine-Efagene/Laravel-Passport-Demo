<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DummyAPI extends Controller
{
    function get($id)
    {
        return ['id' => $id, 'name' => 'Valentine Efagene', 'email' => 'efagenevalentine@gmail.com'];
    }

    function store(Request $request)
    {
        //return ['response' => $request->all()];
        $data = $request->validate([
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email']
        ]);

        return ['name' => 'Sir ' . $data['name'], 'email' => $data['email']];
    }
}
