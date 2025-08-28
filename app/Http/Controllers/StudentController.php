<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:clas,id',
            'parent_id' => 'required|exists:parents,id',
        ]);

        Student::create($data);

        return redirect()->route('manage')->with('success', 'Student created successfully.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:clas,id',
            'parent_id' => 'required|exists:parents,id',
        ]);

        $student = Student::findOrFail($id);
        $student->update($data);

        return redirect()->route('manage')->with('success', 'Student updated successfully.');
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return redirect()->route('manage')->with('success', 'Student deleted successfully.');
    }
}
