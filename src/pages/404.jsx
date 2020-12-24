import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <>
      <div className="h-screen w-screen bg-gray-600 flex justify-center content-center flex-wrap">
        <p className="font-sans text-white text-8xl md: text-9xl">404</p>
      </div>

      <div className="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
        <span className="opacity-50">Take me back to</span>
        <NavLink
          to="/"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Home
        </NavLink>
      </div>
    </>
  );
}
