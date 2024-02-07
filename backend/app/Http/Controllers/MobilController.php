<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mobil;
use Illuminate\Support\Facades\Validator;

class MobilController extends Controller
{
    public function index()
    {
        $query = Mobil::latest();
        $mobil = $query->get();

        return response()->json($mobil, 200);
    }

    public function store(Request $request)
    {
        $rules = [
            'nama' => 'required|string|max:258',
            'merk' => 'required|string|max:258',
           
        ];

        $messages = [
            'nama.required' => 'Nama is required',
            'merk.required' => 'Merk is required',
            
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json( $validator->errors(), 400);
        }

        try {

            Mobil::create([
                'nama' => $request->input('nama'),
                'merk' => $request->input('merk'),
                
            ]);

            return response()->json([
                'message' => "Merk successfully created."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!",
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        $mobil = Mobil::where('id_mobil',$id)->first();

        if (!$mobil) {
            return response()->json([
                'message' => "mobil Not Found"
            ], 404);
        }

        return response()->json($mobil, 200);
    }


    public function update(Request $request, string $id)
    {
        $rules = [
            'nama' => 'required|string|max:258',
            'merk' => 'required|string|max:258',
        ];

        $messages = [
            'nama.required' => 'Nama is required',
            'merk.required' => 'Merk is required',
            
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json( $validator->errors(), 400);
        }

        try {
            $mobil = Mobil::where('id_mobil', $id)->first();

            if (!$mobil) {
                return response()->json([
                    'message' => "mobil Not Found"
                ], 404);
            }

            $updatedData = [
                'nama' => $request->input('nama'),
                'merk' => $request->input('merk'),
                
            ];


            Mobil::where('id_mobil', $id)->update($updatedData);

            return response()->json([
                'message' => "mobil successfully updated."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong"
            ], 500);
        }
    }


    public function destroy(string $id)
    {
        $mobil = mobil::where('id_mobil', $id)->first();

        if (!$mobil) {
            return response()->json([
                'message' => "mobil Not Found"
            ], 404);
        }

        mobil::where('mobil', $id)->delete();

        return response()->json([
            'message' => "mobil successfully deleted."
        ], 200);
    }
}
