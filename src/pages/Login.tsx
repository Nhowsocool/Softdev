import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import svgPaths from "../imports/svg-nb4s686ca5";
import { UserCircle, TrendingUp, FlaskConical, ShieldAlert } from 'lucide-react';

function BrandLogo() {
  return (
    <div className="absolute contents left-[112.4px] top-[-23.03px]">
      <div className="absolute flex h-[88.971px] items-center justify-center left-[164.09px] top-[9.13px] w-[67.669px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-165.43deg]">
          <div className="h-[79.098px] relative w-[49.358px]">
            <div className="absolute inset-[-0.29%_-0.29%_-0.58%_-0.51%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.7505 79.7901">
                <path d={svgPaths.p1a4e9c40} fill="#7B9669" id="Vector 26" stroke="#7B9669" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[89.178px] items-center justify-center left-[182.35px] top-[-23.03px] w-[68.149px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-15">
          <div className="h-[79.098px] relative w-[49.358px]">
            <div className="absolute inset-[-0.29%_-0.29%_-0.58%_-0.51%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.7505 79.7901">
                <path d={svgPaths.p1a4e9c40} fill="#404F3C" id="Vector 30" stroke="#404F3C" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#404f3c] border border-[#404f3c] border-solid h-[5.744px] left-[112.4px] top-[11.43px] w-[28.718px]" />
      <div className="absolute bg-[#404f3c] border border-[#404f3c] border-solid h-[40.205px] left-[123.89px] top-[17.17px] w-[5.744px]" />
      <div className="absolute bg-[#404f3c] border border-[#404f3c] border-solid h-[5.744px] left-[112.4px] top-[57.38px] w-[28.718px]" />
      <div className="absolute bg-[#404f3c] border border-[#404f3c] border-solid h-[51.692px] left-[146.86px] top-[11.43px] w-[5.744px]" />
      <div className="absolute bg-[#404f3c] border border-[#404f3c] border-solid h-[51.692px] left-[175.58px] top-[11.43px] w-[5.744px]" />
      <div className="absolute h-[51.692px] left-[146.86px] top-[11.43px] w-[34.462px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.4615 51.6923">
          <path d={svgPaths.p39132c0} fill="#404F3C" id="Rectangle 10" stroke="#404F3C" />
        </svg>
      </div>
      <div className="absolute h-[51.692px] left-[227.27px] top-[11.43px] w-[22.974px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.9744 51.6923">
          <path d={svgPaths.p2833a00} fill="#7B9669" id="Rectangle 12" />
        </svg>
      </div>
      <div className="absolute h-[51.692px] left-[244.5px] top-[11.43px] w-[22.974px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.9744 51.6923">
          <path d={svgPaths.p2e171800} fill="#7B9669" id="Rectangle 13" />
        </svg>
      </div>
      <div className="absolute h-[5.744px] left-[233.02px] top-[40.15px] w-[28.718px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.7179 5.74359">
          <path d={svgPaths.p2ef28700} fill="#7B9669" id="Rectangle 14" />
        </svg>
      </div>
      <div className="absolute bg-[#7b9669] h-[51.692px] left-[273.22px] top-[11.43px] w-[5.744px]" />
      <div className="absolute bg-[#7b9669] h-[5.744px] left-[278.96px] top-[57.38px] w-[22.974px]" />
      <div className="absolute h-[51.692px] left-[307.68px] top-[11.43px] w-[5.744px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.74359 51.6923">
          <path d="M0 0H5.74359V51.6923H0V0Z" fill="#7B9669" id="Rectangle 17" />
        </svg>
      </div>
      <div className="absolute bg-[#7b9669] h-[5.744px] left-[307.68px] top-[11.43px] w-[28.718px]" />
      <div className="absolute bg-[#7b9669] h-[5.744px] left-[307.68px] top-[34.4px] w-[28.718px]" />
      <div className="absolute bg-[#7b9669] h-[5.744px] left-[307.68px] top-[57.38px] w-[28.718px]" />
    </div>
  );
}

// New Pure CSS Background Component
const GeometricBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#F5F7F5]">
    {/* Grid Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(#404F3C 1px, transparent 1px), linear-gradient(90deg, #404F3C 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />

    {/* Geometric "Mountain" Shapes */}
    <div 
        className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-[#7B9669]/10"
        style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}
    />
    <div 
        className="absolute bottom-0 right-0 w-[60%] h-[50%] bg-[#404F3C]/10"
        style={{ clipPath: 'polygon(20% 100%, 100% 0, 100% 100%)' }}
    />
    
    {/* Floating "Data" Squares */}
    <div className="absolute top-[15%] left-[10%] w-20 h-20 border-2 border-[#7B9669]/20 rotate-12 rounded-xl" />
    <div className="absolute top-[25%] right-[15%] w-32 h-32 border-2 border-[#404F3C]/10 -rotate-6 rounded-xl" />
    <div className="absolute bottom-[10%] left-[40%] w-12 h-12 bg-[#7B9669]/10 rotate-45 rounded-md" />
  </div>
);

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login('supervisor');
      navigate('/');
      setLoading(false);
    }, 800);
  };

  const handleRoleLogin = (role: 'salesman' | 'marketing' | 'rnd' | 'supervisor') => {
    setLoading(true);
    setTimeout(() => {
      login(role);
      navigate('/');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="content-stretch flex items-center justify-center relative min-h-screen w-full font-sans overflow-hidden">
      
      {/* Replaced Image with Pure CSS Background */}
      <GeometricBackground />
      
      {/* Container matching Figma dimensions/layout but centered */}
      <div className="relative z-10 w-[448px] h-[655px] flex flex-col items-center">
        
        {/* Header Section */}
        <div className="absolute top-[80px] w-full text-center">
            <h1 className="font-['Arimo',sans-serif] text-[16px] text-[#0f172b]">Sales Analytics Dashboard</h1>
        </div>
        <div className="absolute top-[112px] w-full text-center">
            <p className="font-['Arimo',sans-serif] text-[16px] text-[#45556c]">Sign in to access your sales data</p>
        </div>

        {/* Logo Section - Absolute positioned relative to container as per Figma */}
        <BrandLogo />

        {/* Card Section */}
        <div 
          className="absolute top-[168px] w-full rounded-[14px] shadow-2xl overflow-hidden backdrop-blur-md"
          style={{ backgroundImage: "linear-gradient(-60.5165deg, rgba(110, 132, 128, 0.95) 1.09%, rgba(255, 255, 255, 0.95) 52.86%)" }}
        >
          {/* Card Header */}
          <div className="relative h-[70px] w-full flex items-center justify-center border-b border-black/5">
             <h2 className="font-['Arimo',sans-serif] text-[32px] text-[#0a0a0a]">Login</h2>
          </div>

          {/* Card Content */}
          <div className="px-6 py-8">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-[14px] font-normal text-[#0a0a0a] font-['Arimo',sans-serif]">Email</label>
                <div className="relative group">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[36px] px-3 rounded-[8px] bg-white border border-transparent focus:border-[#7b9669] focus:ring-1 focus:ring-[#7b9669] outline-none text-[14px] text-[#0a0a0a] placeholder-[#717182] transition-all"
                    placeholder="admin@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-[14px] font-normal text-[#0a0a0a] font-['Arimo',sans-serif]">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[36px] px-3 rounded-[8px] bg-white border border-transparent focus:border-[#7b9669] focus:ring-1 focus:ring-[#7b9669] outline-none text-[14px] text-[#0a0a0a] placeholder-[#717182] transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[36px] mt-2 rounded-[8px] bg-[#7b9669] hover:bg-[#6a825a] text-white text-[14px] font-normal font-['Arimo',sans-serif] transition-colors flex items-center justify-center"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>

            </form>
            
            {/* Demo Buttons Section (Added to preserve functionality) */}
            <div className="mt-8 pt-6 border-t border-black/10">
              <p className="text-center text-[10px] uppercase tracking-widest text-[#404f3c] opacity-60 mb-3">Instant Demo Access</p>
              <div className="grid grid-cols-4 gap-2">
                <DemoButton icon={<UserCircle size={16} />} label="Sales" onClick={() => handleRoleLogin('salesman')} />
                <DemoButton icon={<TrendingUp size={16} />} label="Mrkt" onClick={() => handleRoleLogin('marketing')} />
                <DemoButton icon={<FlaskConical size={16} />} label="R&D" onClick={() => handleRoleLogin('rnd')} />
                <DemoButton icon={<ShieldAlert size={16} />} label="Admin" onClick={() => handleRoleLogin('supervisor')} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const DemoButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/50 hover:bg-white border border-transparent hover:border-[#7b9669]/30 transition-all gap-1 group"
  >
    <div className="text-[#404f3c] group-hover:text-[#7b9669]">{icon}</div>
    <span className="text-[9px] font-bold text-[#404f3c] group-hover:text-[#7b9669]">{label}</span>
  </button>
);

export default Login;
