import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  title: title => title ? `${title} - SIK (Sistem Informasi Kelas)` : 'SIK (Sistem Informasi Kelas)',
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: '#fff',
    showSpinner: true,
  }
})