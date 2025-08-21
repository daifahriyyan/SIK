<?php

namespace App\Http\Controllers;

use App\Models\Clas;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;

class ClasController extends Controller
{
    // Define your methods for handling class-related requests here
    public function index()
    {
        return inertia('Classes', [
            'classes' => Clas::all(),
            'teachers' => Teacher::with('clas')->get(),
            'students' => Student::with('clas')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Clas::create($data);

        return redirect()->route('manage')->with('success', 'Class created successfully.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $clas = Clas::findOrFail($id);
        $clas->update($data);

        return redirect()->route('manage')->with('success', 'Class updated successfully.');
    }

    public function destroy($id)
    {
        $clas = Clas::findOrFail($id);
        $clas->delete();

        return redirect()->route('manage')->with('success', 'Class deleted successfully.');
    }
}
