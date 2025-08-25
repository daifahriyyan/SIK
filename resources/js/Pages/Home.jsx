import { Head } from "@inertiajs/inertia-react";
import Layout from "../Layout/Index";

export function Home({ user }) {
  return (
    <>
      <Head title="Home" />
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <p>Hi <span className="font-bold text-blue-600">{user.name}</span>, Selamat Datang di aplikasi SIK (Sistem Informasi Kelas)</p>
    </>
  )
}

Home.layout = (page) => <Layout children={page} />;

export default Home;