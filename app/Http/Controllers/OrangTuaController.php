<?php

namespace App\Http\Controllers;

use App\Models\OrangTua;
use Illuminate\Http\Request;

class OrangTuaController extends Controller
{
    public function index(){
        return inertia('Parent', [
            'parents' => OrangTua::all()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        OrangTua::create($data);

        return redirect()->route('orang-tua.index')->with('success', 'Parents created successfully.');
    }
    
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        
        $teacher = OrangTua::findOrFail($id);
        $teacher->update($data);

        return redirect()->route('orang-tua.index')->with('success', 'Parent updated successfully.');
    }


    public function destroy($id)
    {
        $parents = OrangTua::findOrFail($id);
        $parents->delete();

        return redirect()->route('orang-tua.index')->with('success', 'Parents deleted successfully.');
    }
}
