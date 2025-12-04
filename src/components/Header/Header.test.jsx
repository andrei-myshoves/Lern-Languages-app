import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header.jsx'

describe('Header component', () => {
    test('renders navigation links', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )

        expect(screen.getByText(/home/i)).toBeInTheDocument()
        expect(screen.getByText(/profile/i)).toBeInTheDocument()
    })

    test('links have correct href attributes', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )

        expect(screen.getByText(/home/i).closest('a')).toHaveAttribute('href', '/')
        expect(screen.getByText(/profile/i).closest('a')).toHaveAttribute('href', '/profile')
    })
})
