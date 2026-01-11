import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from './UI';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('chattydevs_api_key');

  return (
    <nav className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
      <Container className="flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">C</div>
          <span className="font-bold text-2xl tracking-tighter text-white">ChattyDevs</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/pricing" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Pricing</Link>
          <Link to="/docs" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Documentation</Link>
          <div className="w-px h-5 bg-slate-800"></div>
          {isLoggedIn ? (
            <Button onClick={() => navigate('/dashboard')} size="sm">Go to Dashboard</Button>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Log In</Link>
              <Button onClick={() => navigate('/signup')} size="sm">Get Started</Button>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('chattydevs_api_key');
    localStorage.removeItem('chattydevs_email');
    navigate('/');
  };

  const menuItems = [
    { label: 'Overview', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Projects', path: '/dashboard/projects', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { label: 'Usage', path: '/dashboard/usage', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'Settings', path: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 border-r border-slate-900 bg-slate-950 p-6 flex flex-col gap-12 z-20">
        <div className="px-2">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">C</div>
            <span className="font-bold text-2xl tracking-tighter text-white">ChattyDevs</span>
          </Link>
        </div>
        
        <div className="flex flex-col gap-10 flex-1">
          <nav className="flex flex-col gap-2">
            <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">Main Dashboard</p>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-600/10 text-indigo-400 font-bold border border-indigo-500/20 shadow-xl shadow-indigo-500/5' : 'text-slate-500 hover:bg-slate-900 hover:text-slate-200'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2 : 1.5} d={item.icon} />
                  </svg>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-slate-900">
           <div className="px-3 py-4 bg-slate-900/40 rounded-2xl border border-slate-800/60 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold uppercase">
                  {localStorage.getItem('chattydevs_email')?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{localStorage.getItem('chattydevs_email') || 'User Account'}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Free Plan</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full text-xs py-1.5 h-auto justify-start" onClick={() => navigate('/pricing')}>
                Upgrade to Pro
              </Button>
           </div>
           
           <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all group"
           >
             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
             </svg>
             <span className="text-sm font-semibold">Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/5 via-slate-950 to-slate-950">
        <Container className="py-12 md:py-16">
          {children}
        </Container>
      </main>
    </div>
  );
};
