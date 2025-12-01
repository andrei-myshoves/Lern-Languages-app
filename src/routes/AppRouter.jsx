import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<ProfilePage />} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}
