import { useState } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Menu, X } from "lucide-react";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { delete: destroy } = useForm();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            SIK (Sistem Informasi Kelas)
          </Link>
          {/* Menu */}
          <button
            className="md:hidden p-2 rounded focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
          </button>
          {/* Desktop menu */}
          <nav className="hidden md:block">
            <ul className="inline-block space-x-4">
              <li className="inline">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li className="inline">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li className="inline">
                <Link href="/manage" className="text-gray-600 hover:text-gray-900">
                  Manage
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden md:block text-right">
            <button onClick={() => destroy('/logout')} className="text-red-600 hover:text-red-900">
              Logout
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="block text-gray-600 hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="block text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                </li>
                <li className="inline">
                  <Link href="/manage" className="text-gray-600 hover:text-gray-900">
                    Manage
                  </Link>
                </li>
                <li>
                  <button onClick={() => destroy('/logout')} className="text-red-600 hover:text-red-900">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
