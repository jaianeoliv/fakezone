import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/index';
import Header from '../Header/index';

function LayoutComum() {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
    </>
  );
}

export default LayoutComum;
