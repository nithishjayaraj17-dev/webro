'use client';

import { useEffect, useState } from 'react';
import { getStoredUser, logout } from '@/lib/auth';
import { THEMES } from '@/lib/themes-data';
import { LoginScreen } from '@/components/login-screen';
import { ThemeCard } from '@/components/theme-card-new';
import { BookingFormNew } from '@/components/booking-form-new';
import { PWAInstallButton } from '@/components/pwa-install-button';
import { Button } from '@/components/ui/button';
import { Sparkles, LogOut, Grid3X3, FileText } from 'lucide-react';

type Screen = 'login' | 'dashboard' | 'themes' | 'booking';

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setCurrentScreen('dashboard');
    }
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentScreen('login');
    setSelectedThemeId('');
  };

  const handleLoginSuccess = () => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setCurrentScreen('dashboard');
  };

  const selectedTheme = selectedThemeId ? THEMES.find(t => t.id === selectedThemeId) : null;

  // Screen: Login
  if (currentScreen === 'login') {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Screen: Dashboard
  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="px-4 sm:px-6 py-4 max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-70"></div>
                <div className="relative w-full h-full bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <span className="text-xl font-bold text-foreground">Webro</span>
            </div>
            <div className="flex items-center gap-3">
              <PWAInstallButton />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-foreground hover:bg-card"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Welcome, {user?.isGuest ? 'Guest' : user?.email?.split('@')[0]}
              </h1>
              <p className="text-muted-foreground">
                Explore our premium collection of website themes and book a consultation today.
              </p>
            </div>

            {/* PWA Install Banner */}
            <div className="rounded-lg border border-primary/30 bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Install Webro App</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant access to Webro on your phone. Install it and browse themes offline.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <PWAInstallButton />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentScreen('themes')}
                className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Grid3X3 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-1">Browse Themes</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore our 20 exclusive website themes
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCurrentScreen('booking')}
                className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-1">Book Consultation</h3>
                    <p className="text-sm text-muted-foreground">
                      Submit a booking request with your selected theme
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border text-center">
                <p className="text-2xl font-bold text-primary">20</p>
                <p className="text-xs text-muted-foreground">Themes</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border text-center">
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border text-center">
                <p className="text-2xl font-bold text-primary">24h</p>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Screen: Theme Selector
  if (currentScreen === 'themes') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="px-4 sm:px-6 py-4 max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="p-2 hover:bg-card rounded-lg transition-colors"
              >
                <span className="text-xl">←</span>
              </button>
              <h1 className="text-xl font-bold text-foreground">Select a Theme</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-foreground hover:bg-card"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Grid */}
        <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Theme</h2>
            <p className="text-muted-foreground">
              {selectedThemeId && `Selected: ${selectedTheme?.name}`}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {THEMES.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={theme.id === selectedThemeId}
                onClick={() => setSelectedThemeId(theme.id)}
              />
            ))}
          </div>

          {/* Action Buttons */}
          {selectedThemeId && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => setCurrentScreen('booking')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Proceed to Booking
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedThemeId('')}
                className="border-border text-foreground hover:bg-card"
              >
                Clear Selection
              </Button>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Screen: Booking Form
  if (currentScreen === 'booking') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="px-4 sm:px-6 py-4 max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentScreen('themes')}
                className="p-2 hover:bg-card rounded-lg transition-colors"
              >
                <span className="text-xl">←</span>
              </button>
              <h1 className="text-xl font-bold text-foreground">Complete Booking</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-foreground hover:bg-card"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Form */}
        <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Book Your Theme</h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
            <BookingFormNew
              selectedTheme={selectedTheme?.name || ''}
              onSuccess={() => {
                setSelectedThemeId('');
                setCurrentScreen('dashboard');
              }}
            />
          </div>
        </main>
      </div>
    );
  }

  return null;
}
