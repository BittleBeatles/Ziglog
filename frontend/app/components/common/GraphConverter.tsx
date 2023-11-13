import Text from './Text';

interface GraphConverterProps {
  current: '2d' | '3d' | 'note2d' | 'note3d';
  onGraphChange: (current: '2d' | '3d' | 'note2d' | 'note3d') => void;
}

export default function GraphConverter({
  current,
  onGraphChange,
}: GraphConverterProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Text>노트</Text>
        <button
          onClick={() => onGraphChange('note2d')}
          className={`note ${
            current === 'note2d' ? 'bg-main-100' : 'bg-main-50'
          } w-fit p-2 flex justify-center items-center h-5 rounded-full group opacity-100 hover:opacity-60 transition-opacity duration-300`}
        >
          <Text className="text-white">2D</Text>
        </button>
        <button
          onClick={() => onGraphChange('note3d')}
          className={`note ${
            current === 'note3d' ? 'bg-main-100' : 'bg-main-50'
          } w-fit p-2 flex justify-center items-center h-5 rounded-full group opacity-100 hover:opacity-60 transition-opacity duration-300`}
        >
          <Text className="text-white">3D</Text>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Text>폴더</Text>
        <button
          onClick={() => onGraphChange('2d')}
          className={`2d ${
            current === '2d' ? 'bg-main-100' : 'bg-main-50'
          } w-fit p-2 flex justify-center items-center h-5 rounded-full group opacity-100 hover:opacity-60 transition-opacity duration-300`}
        >
          <Text className="text-white">2D</Text>
        </button>
        <button
          onClick={() => onGraphChange('3d')}
          className={`3d ${
            current === '3d' ? 'bg-main-100' : 'bg-main-50'
          } w-fit p-2 flex justify-center items-center h-5 rounded-full group opacity-100 hover:opacity-60 transition-opacity duration-300`}
        >
          <Text className="text-white">3D</Text>
        </button>
      </div>
    </div>
  );
}
