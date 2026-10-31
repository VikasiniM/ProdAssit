import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import SessionsPage from '../pages/SessionsPage';
import OperationsPage from '../pages/OperationsPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import { ROUTES } from '../constants/routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.dashboard} element={<DashboardPage />} />
      <Route path={ROUTES.chat} element={<ChatPage />} />
      <Route path={ROUTES.sessions} element={<SessionsPage />} />
      <Route path={ROUTES.operations} element={<OperationsPage />} />
      <Route path={ROUTES.reports} element={<ReportsPage />} />
      <Route path={ROUTES.settings} element={<SettingsPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
    </Routes>
  );
}
