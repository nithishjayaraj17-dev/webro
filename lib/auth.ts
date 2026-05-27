export interface AuthUser {
  email: string;
  isGuest: boolean;
}

const STORAGE_KEY = 'webro-auth-user';

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function loginUser(email: string): AuthUser {
  const user: AuthUser = { email, isGuest: false };
  setStoredUser(user);
  return user;
}

export function loginAsGuest(): AuthUser {
  const user: AuthUser = { email: 'guest@webro.local', isGuest: true };
  setStoredUser(user);
  return user;
}

export function logout(): void {
  clearStoredUser();
}
