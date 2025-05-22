import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-600 text-white font-poppins">
        <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm text-center shadow-lg">
          <p className="text-xl font-semibold">No data submitted.</p>
          <button
            className="mt-4 px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-blue-200 transition"
            onClick={() => navigate('/')}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-red-400 text-white font-poppins px-4">
      <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-md shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">🎉 Form Submitted Successfully</h2>
        <ul className="space-y-4">
          {Object.entries(state).map(([key, value]) => (
            <li key={key} className="flex justify-between border-b border-white/20 pb-2 text-lg">
              <span className="capitalize text-black">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <span className="font-semibold text-black">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
