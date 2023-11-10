import Text from './Text';

interface GraphConverterProps {
  current: '2d' | '3d' | 'note';
  onGraphChange: (current: '2d' | '3d' | 'note') => void;
}

export default function GraphConverter({
  current,
  onGraphChange,
}: GraphConverterProps) {
  return (
    <div className="flex items-center relative">
      <button
        onClick={() => onGraphChange('2d')}
        className={`2d ${
          current === '2d' ? 'bg-main-100' : 'bg-main-50'
        } w-fit p-2 flex justify-center items-center h-5 rounded-full group opacity-100 hover:opacity-60 transition-opacity duration-300`}
      >
        <Text className="text-white">2D</Text>
      </button>
      <div className="w-5 h-1 bg-main-25" />
      <button
        onClick={() => onGraphChange('3d')}
        className={`3d ${
          current === '3d' ? 'bg-main-100' : 'bg-main-50'
        } w-fit p-2 flex justify-center items-center h-5 rounded-full group opacity-100 hover:opacity-60 transition-opacity duration-300`}
      >
        <Text className="text-white">3D</Text>
      </button>
      <div className="w-5 h-1 bg-main-25" />
      <button
        onClick={() => onGraphChange('note')}
        className={`note ${
          current === 'note' ? 'bg-main-100' : 'bg-main-50'
        } w-fit p-2 flex justify-center items-center h-5 rounded-full group opacity-100 hover:opacity-60 transition-opacity duration-300`}
      >
        <Text className="text-white">NOTE</Text>
      </button>
    </div>
  );
}
