import type {Meta, StoryObj} from '@storybook/react'

import {RecoverPassword} from '@/components/auth/recover-password/recover-password.tsx'
import {BrowserRouter} from "react-router-dom"

const meta = {
    title: 'Auth/Recover password',
    component: RecoverPassword,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story/>
            </BrowserRouter>
        ),
    ],
} satisfies Meta<typeof RecoverPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        onSubmit: (data: any) => console.info(data),
    },
}
