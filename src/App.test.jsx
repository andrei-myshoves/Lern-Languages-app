import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

test('renders Header links', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )

    const homeLink = screen.getByRole('link', { name: /home/i })
    const profileLink = screen.getByRole('link', { name: /profile/i })

    expect(homeLink).toBeInTheDocument()
    expect(profileLink).toBeInTheDocument()

    expect(homeLink).toHaveAttribute('href', '/')
    expect(profileLink).toHaveAttribute('href', '/profile')
})
