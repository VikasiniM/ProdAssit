import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import SessionsPage from '../pages/SessionsPage';
import NotFoundPage from '../pages/NotFoundPage';
import { ROUTES } from '../constants/routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.dashboard} element={<DashboardPage />} />
      <Route path={ROUTES.chat} element={<ChatPage />} />
      <Route path={ROUTES.sessions} element={<SessionsPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
    </Routes>
  );
}
