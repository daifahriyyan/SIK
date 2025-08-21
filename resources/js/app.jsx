import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import Layout from './Layout/Index.jsx';

createInertiaApp({
  title: title => title ? `${title} - SIK (Sistem Informasi Kelas)` : 'SIK (Sistem Informasi Kelas)',
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: '#fff',
    showSpinner: true,
  }
})