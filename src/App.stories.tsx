import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from 'storybook/test';
import App from './App';

const meta = {
  component: App,
  tags: ['ai-generated'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    // Assert the component renders and has the counter button
    const button = canvas.getByRole('button', { name: /count is 0/i });
    await expect(button).toBeVisible();
    
    // Interact with the counter
    await userEvent.click(button);
    await expect(canvas.getByRole('button', { name: /count is 1/i })).toBeVisible();
  },
};
