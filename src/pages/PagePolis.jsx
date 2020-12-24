import React from 'react';
import MyRequest from '../components/myRequest';
import Polis from '../components/polis';

export default function PagePolis() {
  if (localStorage.getItem('role') === 'Admin') {
    return <Polis />;
  } else {
    return <MyRequest />;
  }
}
