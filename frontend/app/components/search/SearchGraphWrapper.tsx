import dynamic from 'next/dynamic';

const SearchGraphWrapper = dynamic(() => import('./SearchGraphView'), {
  ssr: false,
});

export default SearchGraphWrapper;
