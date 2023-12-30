import type {Meta, StoryObj} from '@storybook/react'

import {SignUpForm} from './signUp-form.tsx'
import {Provider} from "react-redux"
import {store} from "@/services/store.ts"
import {BrowserRouter} from "react-router-dom"

const meta = {
    title: 'Auth/SignUpForm',
    component: SignUpForm,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Provider store={store}>
                <BrowserRouter>
                    <Story/>
                </BrowserRouter>
            </Provider>
        ),
    ],
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
