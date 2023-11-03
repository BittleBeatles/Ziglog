'use client';
import SvgIcon from './SvgIcon';

export default function GraphLoading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SvgIcon name="Loading" size={150} />
    </div>
  );
}
