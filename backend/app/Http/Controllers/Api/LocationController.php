<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LocationController extends Controller
{
    public function search(Request $request)
    {
        $search = $request->input('search');

        $locations = DB::table('locations')
            ->where('kecamatan', 'like', "%{$search}%")
            ->orWhere('kota', 'like', "%{$search}%")
            ->orWhere('provinsi', 'like', "%{$search}%")
            ->get();

        return response()->json($locations);
    }
}
