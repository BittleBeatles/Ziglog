import Text from './Text';

interface NodeSampleProps {
  type: 'root' | 'folder' | 'noteDark' | 'noteLight' | 'link';
  text: string;
  theme: 'light' | 'dark';
}

export default function NodeSample({ type, text, theme }: NodeSampleProps) {
  return (
    <div className={`flex items-center mr-2 ${THEME_VARIANTS[theme]}`}>
      <div className={`w-5 h-5 rounded-full mr-1 ${COLOR_VAIANTS[type]}`} />
      <Text>{text}</Text>
    </div>
  );
}

const COLOR_VAIANTS = {
  root: 'bg-main-100',
  folder: 'bg-main-75',
  noteDark: 'bg-white',
  noteLight: 'bg-charcol',
  link: 'bg-main-50',
};

const THEME_VARIANTS = {
  light: '',
  dark: 'text-white',
};
