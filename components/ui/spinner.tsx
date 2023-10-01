import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center my-20">
      <div
        className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full" 
        style={{ "borderTopColor": "transparent" }}>
      </div>
    </div>
  );
};

export default Spinner;