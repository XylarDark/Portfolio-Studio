import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RequireAdmin, RequireAuth } from './components/RequireAuth'
import { LandingPage } from './pages/LandingPage'
import { InvitePage, SetupPage } from './pages/InvitePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { StudioPage } from './pages/StudioPage'
import { InvitesPage } from './pages/InvitesPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/invite/:token" element={<InvitePage />} />
          <Route
            path="/setup"
            element={
              <RequireAuth requireProfile={false}>
                <SetupPage />
              </RequireAuth>
            }
          />
          <Route path="/u/:slug" element={<PortfolioPage />} />
          <Route
            path="/studio"
            element={
              <RequireAuth>
                <StudioPage />
              </RequireAuth>
            }
          />
          <Route
            path="/studio/invites"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <InvitesPage />
                </RequireAdmin>
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
