import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import { Button } from './button';

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Click me' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /click me/i })).toBeVisible();
  },
};

export const Secondary: Story = { args: { children: 'Cancel', variant: 'secondary' } };
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } };
export const Destructive: Story = { args: { children: 'Delete', variant: 'destructive' } };

export const CssCheck: Story = {
  args: { children: 'Submit' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    // Verify that the Tailwind class `inline-flex` was applied by checking the display property
    await expect(getComputedStyle(button).display).toBe('inline-flex');
  },
};
