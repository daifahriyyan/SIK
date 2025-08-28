import { Head, useForm } from "@inertiajs/inertia-react";
import Layout from "../Layout/Index";

import { useState } from "react";
import Modal from "../Component/Modal";
import InputField from "../Component/InputField";

export function Parent({ parents }) {
  const [modal, setModal] = useState(false);
  const [editParent, setEditParent] = useState(null);

  const parentForm = useForm({
    name: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editParent) {
      parentForm.put(`/orang-tua/${editParent.id}`, {
        onSuccess: () => {
          parentForm.reset();
          setEditParent(null);
          setModal('');
        },
      });
    } else {
      parentForm.post('/orang-tua', {
        onFinish: () => {
          parentForm.reset();
          setModal('');
        },
      });
    }
  }

  const handleDeleteParent = (id) => {
    if (confirm('Yakin ingin menghapus Data Orang Tua ini?')) {
      parentForm.delete(`/orang-tua/${id}`, {
        onSuccess: () => {
          parentForm.reset();
        },
      });
    }
  }

  return (
    <>
      <Head title="Parents" />
      {/* Modal untuk tambah kelas */}
      <Modal show={modal === true} onClose={() => setModal('')} title={editParent ? "Edit Orang Tua" : "Tambah Orang Tua"}>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="name"
            value={parentForm.data.name}
            onChange={(e) => parentForm.setData('name', e.target.value)}
            placeholder="Nama Orang Tua"
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editParent ? "Update" : "Simpan"}</button>
        </form>
      </Modal>
      <h1 className="text-2xl font-bold mb-4">Parent Page</h1>

      <div className="p-8 xl:w-xl bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Daftar Orang Tua</h1>
          <div className="flex justify-end">
            <button onClick={() => { setModal(true); setEditParent(false); }} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              <span >Tambah Orang Tua</span>
            </button>
          </div>
        </div>

        <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">No</th>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">Nama Orang Tua</th>
              <th className="py-3 px-6 font-semibold text-gray-700 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent, index) => (
              <tr key={parent.id} className="hover:bg-blue-50 transition">
                <td className="py-2 px-6 border-b">{index + 1}</td>
                <td className="py-2 px-6 border-b">{parent.name}</td>
                <td className="py-2 px-6 border-b">
                  <button onClick={() => {
                    setModal(true);
                    setEditParent(parent);
                    parentForm.setData({
                      name: parent.name || '',
                    });
                  }}>
                    <span className="text-blue-600 hover:text-blue-800">Edit</span>
                  </button>
                  <button onClick={() => handleDeleteParent(parent.id)}>
                    <span className="text-red-600 hover:text-red-800 ml-4">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

Parent.layout = (page) => <Layout children={page} />;

export default Parent;