import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import LoginForm from '../components/Auth/LoginForm';
import DashboardLayout from '../components/Layout/DashboardLayout';
import DashboardContent from '../components/Dashboard/DashboardContent';
import IncidentsPage from '../pages/IncidentsPage';
import ThreatsPage from '../pages/ThreatsPage';
import UsersPage from '../pages/UsersPage';
import ReportsPage from '../pages/ReportsPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import CommunicationsPage from '../pages/CommunicationsPage';
import ContactsPage from '../pages/ContactsPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/ProfilePage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        {/* Dashboard Routes */}
        <Route index element={<DashboardContent />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="threats" element={<ThreatsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="communications" element={<CommunicationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;