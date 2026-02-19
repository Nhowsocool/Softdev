import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  FileSpreadsheet,
  ShoppingCart, 
  CreditCard, 
  Files, 
  UserCircle, 
  LogOut,
  ChevronLeft,
  Package,
  TrendingUp,
  History,
  BarChart3,
  FlaskConical,
  Beaker,
  RefreshCw,
  ShieldAlert,
  ClipboardList,
  LineChart,
  Users,
  Share2,
  PieChart
} from 'lucide-react';
import { clsx } from 'clsx';
import { useUser } from '../../context/UserContext';
import { BrandLogo } from './BrandLogo';
import svgPaths from "../../imports/svg-nb4s686ca5";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const { role, logout } = useUser();

  const salesmanNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Upload, label: 'Upload Sales', path: '/upload-sales' },
    { icon: FileSpreadsheet, label: 'Sales Import', path: '/sales-import' },
    { icon: ShoppingCart, label: 'My Sales', path: '/my-sales' },
    { icon: Share2, label: 'Shared Views', path: '/shared-views' },
    { icon: Files, label: 'Documents', path: '/documents' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
  ];

  const marketingNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: TrendingUp, label: 'Pricing Strategy', path: '/pricing-strategy' },
    { icon: History, label: 'Price History', path: '/price-history' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
  ];

  const rndNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Beaker, label: 'Ingredients', path: '/ingredients' },
    { icon: FlaskConical, label: 'Formulas', path: '/formulas' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: RefreshCw, label: 'Cost Updates', path: '/cost-updates' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
  ];

  const supervisorNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileSpreadsheet, label: 'Sales Imports', path: '/sales-import' },
    { icon: ShoppingCart, label: 'Sales Data', path: '/my-sales' },
    { icon: ShieldAlert, label: 'Violations', path: '/violations' },
    { icon: ClipboardList, label: 'Audit Logs', path: '/audit-logs' },
    { icon: LineChart, label: 'Analytics', path: '/analytics' },
    { icon: PieChart, label: 'Sales Analytics', path: '/sales-analytics' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: BarChart3, label: 'Summary Reports', path: '/reports' },
    { icon: LogOut, label: 'Logout', path: '/logout', onClick: logout },
  ];

  const navItems = role === 'marketing' ? marketingNavItems : 
                   role === 'rnd' ? rndNavItems : 
                   role === 'supervisor' ? supervisorNavItems : 
                   salesmanNavItems;

  return (
    <aside 
      className={clsx(
        "bg-white border-r border-stone-200 flex flex-col transition-all duration-300 relative z-10",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="h-16 flex items-center px-3 border-b border-stone-100 overflow-hidden">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          {isOpen ? (
            <BrandLogo scale={0.4} className="ml-2" />
          ) : (
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="relative" style={{ width: '40px', height: '35px' }}>
                <div className="absolute flex items-center justify-center" style={{ left: '10px', top: '3px', width: '20px', height: '35px' }}>
                  <div className="flex-none rotate-[-165.43deg]">
                    <div className="relative" style={{ height: '31px', width: '19px' }}>
                      <div className="absolute inset-[-0.29%_-0.29%_-0.58%_-0.51%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.7505 79.7901">
                          <path d={svgPaths.p1a4e9c40} fill="#7B9669" stroke="#7B9669" strokeWidth="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute flex items-center justify-center" style={{ left: '18px', top: '-8px', width: '20px', height: '35px' }}>
                  <div className="flex-none rotate-15">
                    <div className="relative" style={{ height: '31px', width: '19px' }}>
                      <div className="absolute inset-[-0.29%_-0.29%_-0.58%_-0.51%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.7505 79.7901">
                          <path d={svgPaths.p1a4e9c40} fill="#404F3C" stroke="#404F3C" strokeWidth="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button 
          onClick={toggle}
          className="absolute -right-3 top-6 bg-white border border-stone-200 rounded-full p-1 text-stone-400 hover:text-emerald-600 shadow-sm"
        >
          <ChevronLeft className={clsx("w-3 h-3 transition-transform", !isOpen && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 group whitespace-nowrap overflow-hidden",
              isActive 
                ? "bg-emerald-50 text-emerald-700" 
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className={clsx("font-medium transition-opacity duration-300", !isOpen && "opacity-0 hidden")}>
              {item.label}
            </span>
            {!isOpen && (
              <div className="fixed left-20 bg-stone-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 ml-2">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-stone-100">
        <button 
          onClick={logout}
          className={clsx(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors w-full",
            !isOpen && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className={clsx("font-medium transition-opacity duration-300", !isOpen && "opacity-0 hidden")}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};
