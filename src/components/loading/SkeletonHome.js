// src/components/loading/SkeletonLoader.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonAbout() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col items-center bg-white p-8 w-full shadow-lg rounded-lg md:w-[calc(33.33%-2rem)]">
          <Skeleton height={80} width={80} />
          <Skeleton height={20} width={150} className="mt-4" />
          <Skeleton height={10} width={100} className="mt-2" />
        </div>
      ))}
    </div>
  );
}

function SkeletonServices() {
  return (
    <div className="py-4 flex flex-wrap items-center justify-center gap-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col items-center bg-white p-8 w-full shadow-lg rounded-lg md:w-[calc(33.33%-2rem)]">
          <Skeleton height={80} width={80} />
          <Skeleton height={20} width={150} className="mt-4" />
          <Skeleton height={10} width={100} className="mt-2" />
        </div>
      ))}
    </div>
  );
}
function SkeletonNavBar() {
  return (
    <div className=" justify-between h-[72px] flex items-center ">
    <Skeleton
      height={30}
      width={30}
      className=" rounded-lg"
    />
    <div className="flex items-center gap-4">
      <Skeleton
        height={30}
        width={70}
        className=" rounded-lg"
      />
      <Skeleton
        height={30}
        width={70}
        className=" rounded-lg"
      />
      <Skeleton
        height={30}
        width={70}
        className=" rounded-lg"
      />
    </div>
    <div className="flex items-center gap-4">

      <Skeleton
        height={30}
        width={70}
        className=" rounded-lg"
        />
      <Skeleton
        height={30}
        width={70}
        className=" rounded-lg"
        />
        </div>
  </div>
  );
}

function SkeletonTrainer() {
  return (
    <div className="flex flex-wrap my-4 py-4 items-center justify-center gap-4">
      <Skeleton height={45} width={45} className='rounded-full overflow-hidden' />
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col items-center bg-white p-8 w-full shadow-lg rounded-lg md:w-[calc(33.33%-6rem)]">
          <Skeleton height={80} width={80} />
          <Skeleton height={20} width={150} className="mt-4" />
          <Skeleton height={10} width={100} className="mt-2" />

        </div>
      ))}
      <Skeleton height={45} width={45} className='rounded-full overflow-hidden' />
    </div>
  );
}
function SkeletonHero() {
  return (
      <div className="bg-gradient-to-t from-black to-transparent absolute -z-10 flex flex-col items-center justify-center h-full w-full">
          
          {/* Title Skeleton */}
          <Skeleton height={40} width={400} className="mb-2" />
          {/* Description Skeleton */}
          <Skeleton height={20} width={300} />
      </div>
  );
}
export { SkeletonAbout, SkeletonNavBar, SkeletonHero, SkeletonTrainer, SkeletonServices };