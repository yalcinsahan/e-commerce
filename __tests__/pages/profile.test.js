import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from '../../pages/profile'
import React from 'react'
import { renderWithProviders } from '../../utils/utils-for-tests'

describe('Profile', () => {
    it('finds text', () => {
        renderWithProviders(<Profile />)

        const myText = screen.getByText('Profile Page', { exact: false })

        expect(myText).toBeInTheDocument()

    })
})