import React from 'react';

const Loader = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-75">
    <div className="loader"></div>
    <style jsx>{`
      .loader {
        border: 8px solid #f3f3f3;
        border-radius: 50%;
        border-top: 8px solid #3498db;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader;
