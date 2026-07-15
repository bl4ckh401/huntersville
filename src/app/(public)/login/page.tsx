'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('admin@huntersville.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name: tab === 'signup' ? name : undefined,
          mode: tab,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessageType('success');
        setMessage(`Welcome, ${data.user.name}!`);
        setTimeout(() => router.push(data.user.role === 'admin' ? '/admin' : '/explore'), 800);
      } else {
        const data = await response.json();
        setMessageType('error');
        setMessage(data.error || 'Authentication failed');
      }
    } catch {
      setMessageType('error');
      setMessage('Connection error. Try again.');
    }

    setIsLoading(false);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-surface">
      {/* Ambient decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/4 -right-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary-container/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen w-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-outline-variant/40 bg-surface-container-lowest shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
            {/* Brand panel (desktop) */}
            <div className="relative hidden overflow-hidden bg-primary lg:flex lg:flex-col lg:justify-between p-10 xl:p-12">
              <div
                className="absolute inset-0 opacity-25 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80')" }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary-container" aria-hidden="true" />

              <div className="relative z-10 flex items-center gap-3 text-on-primary">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-on-primary/15 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[24px]">explore</span>
                </span>
                <span className="font-display-lg text-2xl font-bold tracking-tight">HuntersVilleTours</span>
              </div>

              <div className="relative z-10">
                <h1 className="font-display-lg text-3xl xl:text-4xl font-semibold leading-tight text-on-primary">
                  Your travel command center.
                </h1>
                <p className="mt-4 max-w-full text-sm leading-6 text-on-primary/80">
                  Manage curated experiences, bookings, and travelers from one responsive workspace — built to feel effortless on every screen.
                </p>

                <ul className="mt-8 space-y-3 text-sm text-on-primary/90">
                  {[
                    { icon: 'map', label: 'Curate journeys across East Africa' },
                    { icon: 'dashboard', label: 'Track bookings and revenue in real time' },
                    { icon: 'group', label: 'Grow a community of explorers' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-primary/15">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 text-xs text-on-primary/60">
                © {new Date().getFullYear()} HuntersVilleTours. Crafting unforgettable journeys.
              </div>
            </div>

            {/* Form panel */}
            <div className="w-full p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-3 lg:hidden">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[22px]">explore</span>
                </span>
                <span className="font-display-lg text-xl font-bold tracking-tight text-primary">HuntersVilleTours</span>
              </div>

              <h2 className="font-headline-md text-2xl sm:text-3xl font-semibold text-primary">
                {tab === 'signin' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                {tab === 'signin'
                  ? 'Sign in to manage the dashboard or continue planning your next adventure.'
                  : 'Join HuntersVilleTours to start booking curated experiences.'}
              </p>

              {/* Segmented toggle */}
              <div className="mt-6 flex rounded-full border border-outline-variant/60 bg-surface-container p-1">
                <button
                  type="button"
                  onClick={() => setTab('signin')}
                  className={`flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${tab === 'signin' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  className={`flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${tab === 'signup' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {tab === 'signup' ? (
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-on-surface-variant">Full name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
                      <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded-xl border border-outline-variant bg-surface py-3 pl-11 pr-4 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                ) : null}

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-on-surface-variant">Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                    <input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      className="w-full rounded-xl border border-outline-variant bg-surface py-3 pl-11 pr-4 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-on-surface-variant">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                    <input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="w-full rounded-xl border border-outline-variant bg-surface py-3 pl-11 pr-12 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-on-surface-variant transition-colors hover:text-primary"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                {message ? (
                  <div
                    role="alert"
                    className={`flex items-center gap-2 rounded-xl p-3 text-sm ${messageType === 'success' ? 'border border-primary/30 bg-primary/10 text-primary' : 'border border-error/30 bg-error/10 text-error'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{messageType === 'success' ? 'check_circle' : 'error'}</span>
                    <span>{message}</span>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-[0_4px_14px_rgba(1,45,29,0.25)] transition-all hover:bg-primary-container hover:text-on-primary-container active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      {tab === 'signin' ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>{tab === 'signin' ? 'Sign In' : 'Create Account'}</>
                  )}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-on-surface-variant">
                Back to{' '}
                <Link href="/" className="font-semibold text-primary transition-colors hover:underline">home</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
