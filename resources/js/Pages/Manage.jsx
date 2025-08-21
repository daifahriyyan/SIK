import { Head, useForm } from "@inertiajs/inertia-react";
import Layout from "../Layout/Index";
import { useState } from "react";
import InputField from "../Component/InputField";

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        {children}
      </div>
    </div>
  );
};

export function Manage({ classes, teachers, students }) {
  const [modal, setModal] = useState('');
  const [editClass, setEditClass] = useState(null);
  const [editTeacher, setEditTeacher] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  const classForm = useForm({
    name: '',
  });

  const teacherForm = useForm({
    name: '',
    class_id: '',
  });

  const studentForm = useForm({
    name: '',
    class_id: '',
  });

  const currentForm = modal === 'class' ? classForm :
    modal === 'teacher' ? teacherForm :
      modal === 'student' ? studentForm : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modal === 'class') {
      if (editClass) {
        classForm.put(`/classes/${editClass.id}`, {
          onSuccess: () => {
            classForm.reset();
            setEditClass(null);
            setModal('');
          },
        });
      } else {
        currentForm.post('/classes', {
          onFinish: () => {
            currentForm.reset();
            setModal('');
          },
        });
      }
    } else if (modal === 'teacher') {
      if (editTeacher) {
        teacherForm.put(`/teachers/${editTeacher.id}`, {
          onSuccess: () => {
            teacherForm.reset();
            setEditTeacher(null);
            setModal('');
          },
        });
      } else {
        currentForm.post('/teachers', {
          onFinish: () => {
            currentForm.reset()
            setModal('');
          },
        });
      }
    } else if (modal === 'student') {
      if (editStudent) {
        studentForm.put(`/students/${editStudent.id}`, {
          onSuccess: () => {
            studentForm.reset();
            setEditStudent(null);
            setModal('');
          },
        });
      } else {
        currentForm.post('/students', {
          onFinish: () => {
            currentForm.reset()
            setModal('');
          },
        });
      }
    }
  }

  const handleDeleteClass = (id) => {
    if (confirm('Yakin ingin menghapus kelas ini?')) {
      classForm.delete(`/classes/${id}`, {
        onSuccess: () => {
          classForm.reset();
        },
      });
    }
  }

  const handleDeleteTeacher = (id) => {
    if (confirm('Yakin ingin menghapus guru ini?')) {
      teacherForm.delete(`/teachers/${id}`, {
        onSuccess: () => {
          teacherForm.reset();
        },
      });
    }
  }

  const handleDeleteStudent = (id) => {
    if (confirm('Yakin ingin menghapus siswa ini?')) {
      studentForm.delete(`/students/${id}`, {
        onSuccess: () => {
          studentForm.reset();
        },
      });
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Manage CRUD</h1>
      <p className="mb-6">Halaman Fitur CRUD untuk mengelola Data Siswa, Guru, dan Kelas</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Head title="Manage" />
        {/* Modal untuk tambah kelas */}
        <Modal show={modal === 'class'} onClose={() => setModal('')} title={editClass ? "Edit Kelas" : "Tambah Kelas"}>
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="name"
              value={classForm.data.name}
              onChange={(e) => classForm.setData('name', e.target.value)}
              placeholder="Nama Kelas"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editClass ? "Update" : "Simpan"}</button>
          </form>
        </Modal>
        {/* Modal untuk tambah guru */}
        <Modal show={modal === 'teacher'} onClose={() => { setModal(''); setEditTeacher(null); teacherForm.reset(); }} title={editTeacher ? "Edit Guru" : "Tambah Guru"}>
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="name"
              value={teacherForm.data.name}
              onChange={(e) => teacherForm.setData('name', e.target.value)}
              placeholder={teacherForm.data.name || "Nama Guru"}
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <select
              name="class_id"
              id="class_id"
              className="w-full mb-4 px-3 py-2 border rounded cursor-pointer"
              value={teacherForm.data.class_id}
              onChange={(e) => teacherForm.setData('class_id', e.target.value)}
            >
              <option value="">Pilih Kelas</option>
              {classes.map((clas) => (
                <option key={clas.id} value={clas.id}>{clas.name}</option>
              ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editTeacher ? "Update" : "Simpan"}</button>
          </form>
        </Modal>
        {/* Modal untuk tambah siswa */}
        <Modal show={modal === 'student'} onClose={() => setModal('')} title="Tambah Siswa">
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="name"
              value={studentForm.data.name}
              onChange={(e) => studentForm.setData('name', e.target.value)}
              placeholder="Nama Siswa"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <select
              name="class_id"
              id="class_id"
              className="w-full mb-4 px-3 py-2 border rounded cursor-pointer"
              value={studentForm.data.class_id}
              onChange={(e) => studentForm.setData('class_id', e.target.value)}
            >
              <option value="">Pilih Kelas</option>
              {classes.map((clas) => (
                <option key={clas.id} value={clas.id}>{clas.name}</option>
              ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
          </form>
        </Modal>
        <div className="p-8 xl:w-xl bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Daftar Kelas</h1>
            <div className="flex justify-end">
              <button onClick={() => setModal('class')} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                <span >Tambah Kelas</span>
              </button>
            </div>
          </div>
          <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">No</th>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">Nama Kelas</th>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((clas, index) => (
                <tr key={clas.id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-6 border-b">{index + 1}</td>
                  <td className="py-2 px-6 border-b">{clas.name}</td>
                  <td className="py-2 px-6 border-b">
                    <button onClick={() => {
                      setModal('class');
                      setEditClass(clas);
                      classForm.setData('name', clas.name);
                    }}>
                      <span className="text-blue-600 hover:text-blue-800">Edit</span>
                    </button>
                    <button onClick={() => handleDeleteClass(clas.id)}>
                      <span className="text-red-600 hover:text-red-800 ml-4">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 xl:w-xl bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Daftar Guru</h1>
            <div className="flex justify-end">
              <button onClick={() => { setModal('teacher'); teacherForm.setData({}) }} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                <span >Tambah Guru</span>
              </button>
            </div>
          </div>

          <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">No</th>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">Nama Guru</th>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">Kelas</th>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={teacher.id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-6 border-b">{index + 1}</td>
                  <td className="py-2 px-6 border-b">{teacher.name}</td>
                  <td className="py-2 px-6 border-b">{teacher.clas ? teacher.clas.name : 'Tidak ada kelas'}</td>
                  <td className="py-2 px-6 border-b">
                    <button onClick={() => {
                      setModal('teacher');
                      setEditTeacher(teacher);
                      teacherForm.setData({
                        name: teacher.name || '',
                        class_id: teacher.class_id || '',
                      });
                    }}>
                      <span className="text-blue-600 hover:text-blue-800">Edit</span>
                    </button>
                    <button onClick={() => handleDeleteTeacher(teacher.id)}>
                      <span className="text-red-600 hover:text-red-800 ml-4">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 xl:w-xl bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Daftar Siswa</h1>
            <div className="flex justify-end">
              <button onClick={() => { setModal('student'); studentForm.setData({}) }} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                <span >Tambah Siswa</span>
              </button>
            </div>
          </div>

          <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">No</th>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">Nama Siswa</th>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">Kelas</th>
                <th className="py-3 px-6 font-semibold text-gray-700 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-6 border-b">{index + 1}</td>
                  <td className="py-2 px-6 border-b">{student.name}</td>
                  <td className="py-2 px-6 border-b">{student.clas ? student.clas.name : 'Tidak ada kelas'}</td>
                  <td className="py-2 px-6 border-b">
                    <button onClick={() => {
                      setModal('student');
                      setEditStudent(student);
                      studentForm.setData({
                        name: student.name,
                        class_id: student.class_id
                      });
                    }}>
                      <span className="text-blue-600 hover:text-blue-800">Edit</span>
                    </button>
                    <button onClick={() => handleDeleteStudent(student.id)}>
                      <span className="text-red-600 hover:text-red-800 ml-4">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Manage.layout = (page) => <Layout children={page} />;

export default Manage;
