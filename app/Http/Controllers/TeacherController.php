<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all()); // Debugging line to check the request data
        $data = $request->validate([
            'name' => 'required',
            'class_id' => 'required',
        ]);


        Teacher::create($data);

        return redirect()->route('manage')->with('success', 'Teacher created successfully.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required',
        ]);
        
        $teacher = Teacher::findOrFail($id);
        $teacher->update($data);

        return redirect()->route('manage')->with('success', 'Teacher updated successfully.');
    }

    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        return redirect()->route('manage')->with('success', 'Teacher deleted successfully.');
    }
}
