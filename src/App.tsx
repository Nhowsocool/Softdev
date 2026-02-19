import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { SalesDashboard } from './pages/SalesDashboard';
import { MarketingDashboard } from './pages/MarketingDashboard';
import { RnDDashboard } from './pages/RnDDashboard';
import { SupervisorDashboard } from './pages/SupervisorDashboard';
import { UploadSales } from './pages/UploadSales';
import { SalesImport } from './pages/SalesImport';
import { MySales } from './pages/MySales';
import { SharedViews } from './pages/SharedViews';
import { ARManagement } from './pages/ARManagement';
import { Documents } from './pages/Documents';
import { Products } from './pages/Products';
import { PricingStrategy } from './pages/PricingStrategy';
import { PriceHistory } from './pages/PriceHistory';
import { Violations } from './pages/Violations';
import { AuditLogs } from './pages/AuditLogs';
import { Analytics } from './pages/Analytics';
import { Reports } from './pages/Reports';
import { Ingredients } from './pages/Ingredients';
import { Formulas } from './pages/Formulas';
import { CostUpdates } from './pages/CostUpdates';
import { Login } from './pages/Login';
import { Verify2FA } from './pages/Verify2FA';
import { Users } from './pages/Users';
import { SalesAnalytics } from './pages/SalesAnalytics';
import { UserProvider, useUser } from './context/UserContext';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-stone-50 font-sans text-slate-800 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <MainLayout>{children}</MainLayout>;
};

const DashboardSwitcher = () => {
  const { role } = useUser();
  if (role === 'marketing') return <MarketingDashboard />;
  if (role === 'rnd') return <RnDDashboard />;
  if (role === 'supervisor') return <SupervisorDashboard />;
  return <SalesDashboard />;
};

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-2fa" element={<Verify2FA />} />
          
          <Route path="/" element={<ProtectedRoute><DashboardSwitcher /></ProtectedRoute>} />
          
          {/* Salesman Routes */}
          <Route path="/upload-sales" element={<ProtectedRoute><UploadSales /></ProtectedRoute>} />
          <Route path="/sales-import" element={<ProtectedRoute><SalesImport /></ProtectedRoute>} />
          <Route path="/my-sales" element={<ProtectedRoute><MySales /></ProtectedRoute>} />
          <Route path="/shared-views" element={<ProtectedRoute><SharedViews /></ProtectedRoute>} />
          <Route path="/ar-management" element={<ProtectedRoute><ARManagement /></ProtectedRoute>} />
          
          {/* Marketing Routes */}
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/pricing-strategy" element={<ProtectedRoute><PricingStrategy /></ProtectedRoute>} />
          <Route path="/price-history" element={<ProtectedRoute><PriceHistory /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          
          {/* R&D Routes */}
          <Route path="/ingredients" element={<ProtectedRoute><Ingredients /></ProtectedRoute>} />
          <Route path="/formulas" element={<ProtectedRoute><Formulas /></ProtectedRoute>} />
          <Route path="/cost-updates" element={<ProtectedRoute><CostUpdates /></ProtectedRoute>} />

          {/* Supervisor Routes */}
          <Route path="/violations" element={<ProtectedRoute><Violations /></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/sales-analytics" element={<ProtectedRoute><SalesAnalytics /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />

          {/* Common Routes */}
          <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><div className="text-stone-500 p-6">Profile Page Placeholder</div></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
