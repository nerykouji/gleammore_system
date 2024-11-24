import { signout } from '@/db.supa.backend/utils';
import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-6">
        <h2 className="text-lg font-bold text-black">Logging out</h2>
        <p className='text-black'>Are you sure you want to logout ? </p>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={signout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Modal;