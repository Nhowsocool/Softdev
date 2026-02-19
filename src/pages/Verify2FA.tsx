import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../components/layout/BrandLogo';

export const Verify2FA = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock verification delay
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex justify-center">
        <BrandLogo scale={0.15} />
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-100 p-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900">Two-Factor Authentication</h1>
          <p className="text-stone-500">We sent a verification code to your email. Enter the code below.</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          <div className="flex justify-center gap-2 sm:gap-4">
            {otp.map((digit, index) => (
              <div key={index} className="flex flex-col items-center">
                <input
                  ref={el => { if (el) inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-stone-50"
                />
              </div>
            ))}
          </div>
          <div className="text-center text-[10px] text-stone-400 font-mono mt-1">db: two_factor_code</div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Identity'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-stone-500">
            Didn't receive the code?{' '}
            <button className="text-emerald-600 font-medium hover:underline">Resend</button>
          </p>
        </div>
      </div>
    </div>
  );
};
