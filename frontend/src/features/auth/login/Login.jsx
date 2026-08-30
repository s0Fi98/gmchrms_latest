import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, ShieldCheck } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        console.log({ userId, password });
    };

    return (
        <section className="min-h-screen w-full flex bg-slate-50 font-sans antialiased overflow-hidden">
            
            {/* LEFT PANEL: High-End Enterprise Branding Graphic (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
                {/* Abstract geometric background graphic layer */}
                <img 
                    src="" 
                    alt="HRMS Network Graphic" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity transform scale-105"
                />
                
                {/* Ambient glow effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>

                {/* Left Panel Content Copy */}
                <div className="relative z-10 max-w-md w-full flex flex-col justify-between h-full text-white">
                    <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                            <ShieldCheck size={20} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className='font-bold text-lg tracking-wider bg-clip-text text-transparent bg-linear-to-r from-white to-slate-300'>Guwahati Municipal Corporation</span>
                            <span className='text-slate-400'> - Human Resource Management System</span>
                        </div>
                    </div>

                    <div className="my-auto space-y-4">
                        <span className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                            Corporation Portal
                        </span>
                        <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
                            Manage your workplace, <br/>
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-emerald-400">
                                empower your people.
                            </span>
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Access the complete municipal human resource suite for payroll management, tracking attendance, leaves, and core operations.
                        </p>
                    </div>

                    <div className="text-xs text-slate-500 font-medium">
                        Secure 256-bit SSL Encrypted Environment.
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: The Dedicated Login Form Canvas */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 relative bg-white">
                
                {/* PLACEHOLDER FOR YOUR LOGO (Top Right Window Margin) */}
                <div className="absolute top-8 right-8 h-12 w-32 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/50 group hover:border-indigo-400 transition-colors">
                    <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase group-hover:text-indigo-600">
                        [ Insert Logo ]
                    </span>
                </div>

                {/* Form Base Wrapper */}
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Account Sign-In
                        </h3>
                        <p className="text-xs font-medium text-slate-400 mt-1.5">
                            Please enter your credentials to continue.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* USER ID FIELD */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                                User ID / Employee Code
                            </label>
                            <div className="relative group">
                                <User 
                                    size={16} 
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600" 
                                />
                                <input
                                    type="text"
                                    required
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="e.g., GMC-2026-88"
                                    className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-medium transition-all focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>
                        </div>

                        {/* PASSWORD FIELD */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                                    Password
                                </label>
                                <a href="#forgot" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                    Forgot Password?
                                </a >
                            </div>
                            <div className="relative group">
                                <Lock 
                                    size={16} 
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600" 
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-11 pl-10 pr-11 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 transition-all focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* REMEMBER DEVICE CONFIGURATION */}
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 accent-indigo-600 cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                                Keep me logged in on this device
                            </label>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            className="w-full h-11 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
                
            </div>
        </section>
    );
}