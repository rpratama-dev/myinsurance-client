import React from 'react';
import AdminPage from '../components/adminPage';
import CustomerPage from '../components/customerPage';

export default function PageHome() {
  if (localStorage.getItem('role') === 'Admin') {
    return <AdminPage />;
  } else {
    return <CustomerPage />;
  }
}
