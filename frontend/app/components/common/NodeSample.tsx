import Text from './Text';

interface NodeSampleProps {
  type: 'root' | 'folder' | 'noteDark' | 'noteLight' | 'link';
  text: string;
  theme: 'light' | 'dark';
}

export default function NodeSample({ type, text, theme }: NodeSampleProps) {
  return (
    <div className={`flex items-center mr-1 ${THEME_VARIANTS[theme]} group`}>
      <Text className="tooltip-text group-hover:scale-100 absolute top-full w-auto p-2 bg-gray-800 text-white text-xs rounded-md scale-0 transform transition-all">
        {text}
      </Text>
      <div className={`w-5 h-5 rounded-full mr-1 ${COLOR_VAIANTS[type]}`}></div>
    </div>
  );
}

const COLOR_VAIANTS = {
  root: 'bg-root-node',
  folder: 'bg-main-75',
  noteDark: 'bg-light-background-layout',
  noteLight: 'bg-charcol',
  link: 'bg-main-50',
};

const THEME_VARIANTS = {
  light: '',
  dark: 'text-white',
};
