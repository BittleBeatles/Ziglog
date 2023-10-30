import React from 'react';

interface DrawingProps {
  classColor: string;
}

export default function Drawing({ classColor }: DrawingProps) {
  return (
    <svg className="fill-none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={`stroke-current stroke-1.5 rounded animate-draw-line ${classColor}`}
        style={{
          strokeDasharray: '1',
          strokeDashoffset: '1',
        }}
        d="M7.5 5.5C17.333 4 44.9 1 76.5 1c45 0 72.5 5.5 72.5 13.5s-31 16-72.5 16.5C30.503 31.554 1 28.5 1 19.5S50.5-4.81 86.5 4.19"
        pathLength="1"
        fill="none"
      />
    </svg>
  );
}
