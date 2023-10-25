import React from 'react';
import type { Preview } from '@storybook/react';
import '../app/globals.css';
import { ReduxProvider } from '../app/store/provider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/test',
      },
    },
  },
  decorators: [
    (Story) => (
      <ReduxProvider>
        <Story />
      </ReduxProvider>
    ),
  ],
};

export default preview;
