import React from 'react';
import Spinner from './spinner';
import { useStore } from '@/app/store';

const LoadingSpinner = () => {
  const isLoading = useStore((state) => state.isLoading);
  return (
    <>
      {isLoading && (
        <div className='fixed w-full h-screen z-50 flex justify-center items-center'>
          <Spinner /></div>
      )}
    </>
  );
};

export default LoadingSpinner;