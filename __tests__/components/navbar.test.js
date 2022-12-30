import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../utils/utils-for-tests'
import Navbar from '../../components/navbar'

describe('Profile', () => {
    it('finds text', () => {
        renderWithProviders(<Navbar />)

        const myText = screen.getByText('e-commerce', { exact: false })

        expect(myText).toBeInTheDocument()

    })
})