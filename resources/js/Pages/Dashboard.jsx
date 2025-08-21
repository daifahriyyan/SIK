import { Head } from "@inertiajs/inertia-react";
import Layout from "../Layout/Index";

export function Dashboard({ classes }) {
  console.log("Classes:", classes.map((c) => c.teachers));
  return (
    <>
      <Head title="Dashboard" />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Halaman List Table berdasarkan kelasnya dalam 1 table dan kelas tidak boleh muncul lebih dari sekali</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-8 xl:w-xl bg-white rounded-lg shadow-md">
          <div>
            <h1 className="text-3xl font-extrabold mb-6 text-blue-700">List Siswa - Kelas</h1>
          </div>

          <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
            <thead className="bg-blue-100">
              <tr>
                <th colSpan="1" className="py-3 px-6 font-semibold text-gray-700 border-b">No</th>
                <th colSpan="2" className="py-3 px-6 font-semibold text-gray-700 border-b">Kelas</th>
                <th colSpan="3" className="py-3 px-6 font-semibold text-gray-700 border-b">Siswa</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((clas, index) => (
                <tr key={clas.id} className="hover:bg-gray-100">
                  <td colSpan="1" className="py-3 px-6 border-b">{index + 1}</td>
                  <td colSpan="2" className="py-3 px-6 border-b">{clas.name}</td>
                  <td colSpan="3" className="py-3 px-6 border-b">
                    {clas.students.length > 0 ? (
                      clas.students.map((student, idx) => (
                        <span key={student.id}>
                          {student.name}
                          {idx < clas.students.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span>Belum ada Siswa dikelas</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 xl:w-xl bg-white rounded-lg shadow-md">
          <div>
            <h1 className="text-3xl font-extrabold mb-6 text-blue-700">List Guru - Kelas</h1>
          </div>

          <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
            <thead className="bg-blue-100">
              <tr>
                <th colSpan="1" className="py-3 px-6 font-semibold text-gray-700 border-b">No</th>
                <th colSpan="2" className="py-3 px-6 font-semibold text-gray-700 border-b">Kelas</th>
                <th colSpan="3" className="py-3 px-6 font-semibold text-gray-700 border-b">Guru</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((clas, index) => (
                <tr key={clas.id} className="hover:bg-gray-100">
                  <td colSpan="1" className="py-3 px-6 border-b">{index + 1}</td>
                  <td colSpan="2" className="py-3 px-6 border-b">{clas.name}</td>
                  <td colSpan="3" className="py-3 px-6 border-b">
                    {clas.teachers.length > 0 ? (
                      clas.teachers.map((teacher, idx) => (
                        <span key={teacher.id}>
                          {teacher.name}
                          {idx < clas.teachers.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span>Belum ada Guru dikelas</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 xl:w-xl bg-white rounded-lg shadow-md">
          <div>
            <h1 className="text-3xl font-extrabold mb-6 text-blue-700">List Siswa, Guru dan Kelas</h1>
          </div>

          <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
            <thead className="bg-blue-100">
              <tr>
                <th colSpan="1" className="py-3 px-6 font-semibold text-gray-700 border-b">No</th>
                <th colSpan="2" className="py-3 px-6 font-semibold text-gray-700 border-b">Kelas</th>
                <th colSpan="3" className="py-3 px-6 font-semibold text-gray-700 border-b">Guru</th>
                <th colSpan="3" className="py-3 px-6 font-semibold text-gray-700 border-b">Siswa</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((clas, index) => (
                <tr key={clas.id} className="hover:bg-gray-100">
                  <td colSpan="1" className="py-3 px-6 border-b">{index + 1}</td>
                  <td colSpan="2" className="py-3 px-6 border-b">{clas.name}</td>
                  <td colSpan="3" className="py-3 px-6 border-b">
                    {clas.teachers.length > 0 ? (
                      clas.teachers.map((teacher, idx) => (
                        <span key={teacher.id}>
                          {teacher.name}
                          {idx < clas.teachers.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span>Belum ada Guru dikelas</span>
                    )}
                  </td>
                  <td colSpan="3" className="py-3 px-6 border-b">
                    {clas.students.length > 0 ? (
                      clas.students.map((student, idx) => (
                        <span key={student.id}>
                          {student.name}
                          {idx < clas.students.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span>Belum ada Siswa dikelas</span>
                    )}
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

Dashboard.layout = (page) => <Layout children={page} />;

export default Dashboard;