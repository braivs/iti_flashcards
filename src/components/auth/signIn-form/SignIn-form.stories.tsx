import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './sign-in.tsx'
import {BrowserRouter} from "react-router-dom"

const meta = {
  title: 'Auth/SignInForm',
  component: SignIn,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
        <BrowserRouter>
          <Story/>
        </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
