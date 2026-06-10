"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)] w-full relative bg-surface text-on-surface font-body-md overflow-x-hidden selection:bg-primary selection:text-on-primary">
      {/* Top/Left Side: Cinematic Background */}
      <div className="w-full lg:w-7/12 relative h-[35vh] md:h-[45vh] lg:h-[calc(100vh-72px)] lg:sticky lg:top-[72px] bg-surface-variant overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <Image
          alt="Cinematic Kenyan landscape with elephants at sunset"
          className="w-full h-full object-cover object-center absolute inset-0 z-0"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-YBwiXhbKoeneIMhl7RJL5O3fOiPMV8TjuhORsNeV68KGb0szozQp-B1Eu27_QclMpiPC990uzHlypu_siLPLczxsIqtreXarunNZng3lfguEOHj1bN50VC0m8hZMb0PlpkvRgx0OoOSSWchechQDe421bJcAa2Gumn4BwQqJUiSt0n5AXnjN1DW3cW8Aad0Ni3sTL-rW0WENJXZUayHNP4Cncbe3hY0fd3gdD_cGVcZ2hoVkQwNCwLVVxPyi6MmnfaGJV20"
          fill
          priority
        />
        {/* Overlay Content */}
        <div className="hidden md:absolute bottom-0 left-0 p-6 md:p-12 z-20 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-24 lg:pt-32">
          <div className="max-w-[672px] text-on-primary">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-2 text-on-primary drop-shadow-md">Journey Beyond the Expected.</h1>
            <p className="font-body-lg text-sm md:text-body-lg text-on-primary/90 max-w-[512px] drop-shadow-sm">Experience the raw beauty of Kenya with expertly curated safaris that redefine adventure and luxury.</p>
          </div>
        </div>
      </div>

      {/* Bottom/Right Side: Auth Panel */}
      <div className="w-full lg:w-5/12 flex flex-col p-6 md:px-12 md:py-20 relative z-30 flex-grow bg-surface shadow-[0_-10px_30px_rgba(0,0,0,0.1)] lg:shadow-none z-40 rounded-t-3xl lg:rounded-none -mt-6 lg:mt-0">
        <div className="w-full max-w-[448px] mx-auto my-auto relative z-10 bg-transparent rounded-none p-0 border-none">
          {/* Brand Header */}
          <div className="text-center mb-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-md">
              <span className="material-symbols-outlined text-primary text-4xl">explore</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">HuntersVilleTours</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Join the Legacy of Exploration</p>
          </div>

          {/* Toggle Switch */}
          <div className="flex p-xs bg-surface-container-high rounded-lg mb-lg relative">
            <div
              className="absolute top-xs bottom-xs w-[calc(50%-4px)] bg-surface rounded shadow-sm transition-transform duration-300 ease-in-out"
              style={{ transform: activeTab === 'login' ? 'translateX(0)' : 'translateX(100%)', left: '4px' }}
            ></div>
            <button
              className={`flex-1 py-sm text-center relative z-10 font-label-md text-label-md transition-colors ${activeTab === 'login' ? 'text-on-surface' : 'text-on-surface-variant'}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-sm text-center relative z-10 font-label-md text-label-md transition-colors ${activeTab === 'signup' ? 'text-on-surface' : 'text-on-surface-variant'}`}
              onClick={() => setActiveTab('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Forms Container */}
          <div className="relative">
            {/* Login Form */}
            <form
              className={`flex flex-col gap-md transition-all duration-400 ease-in-out ${activeTab === 'login' ? 'opacity-100 relative translate-y-0 z-10' : 'opacity-0 absolute inset-x-0 pointer-events-none translate-y-2 z-0'}`}
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Google Sign In */}
              <button className="w-full flex items-center justify-center gap-sm py-sm px-md bg-surface border border-outline-variant rounded-lg hover:bg-surface-container-low hover:shadow-sm transition-all group" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                <span className="font-label-md text-label-md text-on-surface">Sign in with Google</span>
              </button>

              <div className="relative flex items-center py-sm">
                <div className="flex-grow border-t border-outline-variant/50"></div>
                <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">or continue with email</span>
                <div className="flex-grow border-t border-outline-variant/50"></div>
              </div>

              {/* Email Input */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="login-email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input className="w-full pl-10 pr-sm py-sm bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-shadow text-on-surface font-body-md placeholder-outline/50" id="login-email" placeholder="explorer@example.com" type="email" />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-xs">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="login-password">Password</label>
                  <a className="font-label-sm text-label-sm text-secondary hover:text-secondary-container transition-colors" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input className="w-full pl-10 pr-sm py-sm bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-shadow text-on-surface font-body-md placeholder-outline/50" id="login-password" placeholder="••••••••" type="password" />
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full mt-sm py-sm px-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 shadow-[0_2px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(1,45,29,0.15)] hover:-translate-y-[1px] transition-all" type="submit">
                Sign In to Journey
              </button>
            </form>

            {/* Sign Up Form */}
            <form
              className={`flex flex-col gap-md transition-all duration-400 ease-in-out ${activeTab === 'signup' ? 'opacity-100 relative translate-y-0 z-10' : 'opacity-0 absolute inset-x-0 pointer-events-none translate-y-2 z-0'}`}
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Google Sign In */}
              <button className="w-full flex items-center justify-center gap-sm py-sm px-md bg-surface border border-outline-variant rounded-lg hover:bg-surface-container-low hover:shadow-sm transition-all group" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                <span className="font-label-md text-label-md text-on-surface">Sign up with Google</span>
              </button>

              <div className="relative flex items-center py-sm">
                <div className="flex-grow border-t border-outline-variant/50"></div>
                <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">or register with email</span>
                <div className="flex-grow border-t border-outline-variant/50"></div>
              </div>

              {/* Name Input */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="signup-name">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">person</span>
                  <input className="w-full pl-10 pr-sm py-sm bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-shadow text-on-surface font-body-md placeholder-outline/50" id="signup-name" placeholder="Livingstone" type="text" />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="signup-email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input className="w-full pl-10 pr-sm py-sm bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-shadow text-on-surface font-body-md placeholder-outline/50" id="signup-email" placeholder="explorer@example.com" type="email" />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="signup-password">Create Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input className="w-full pl-10 pr-sm py-sm bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-shadow text-on-surface font-body-md placeholder-outline/50" id="signup-password" placeholder="••••••••" type="password" />
                </div>
                <p className="font-label-sm text-label-sm text-outline-variant mt-1">Must be at least 8 characters long.</p>
              </div>

              {/* Submit Button */}
              <button className="w-full mt-sm py-sm px-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 shadow-[0_2px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(1,45,29,0.15)] hover:-translate-y-[1px] transition-all" type="submit">
                Begin the Journey
              </button>

              <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-2">
                By joining, you agree to our <a className="text-secondary hover:underline" href="#">Terms</a> and <a className="text-secondary hover:underline" href="#">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
