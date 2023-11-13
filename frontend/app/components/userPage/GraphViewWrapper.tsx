import dynamic from 'next/dynamic';

const GraphViewWrapper = dynamic(() => import('./GraphView'), {
  ssr: false,
});

export default GraphViewWrapper;
