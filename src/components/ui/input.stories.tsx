import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#09090b' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Make & Model',
    placeholder: 'e.g. Honda Civic',
  },
};

export const WithValue: Story = {
  args: {
    label: 'License Plate',
    value: 'ATL-8492',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Year',
    value: '2021',
    disabled: true,
  },
};
