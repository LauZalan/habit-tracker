import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

import Layout from '../components/layout/Layout'
import DashboardPage from '../pages/DashboardPage'
import LandingPage from '../pages/LandingPage'
import LoginRegisterPage from '../pages/LoginRegisterPage'
import ProfilePage from '../pages/ProfilePage'
import CalendarPage from '../pages/CalendarPage'
import AnalyticsPage from '../pages/AnalyticsPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginRegisterPage />} />
      <Route path="register" element={<LoginRegisterPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="calendar" element={<CalendarPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
    </Route>,
  ),
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
