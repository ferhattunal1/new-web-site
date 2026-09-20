export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  name: 'Sistem Yöneticisi',
  role: 'Süper Admin',
};

const STORAGE_KEY = 'litef_admin_session';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const session = localStorage.getItem(STORAGE_KEY);
  if (!session) return false;
  try {
    const data = JSON.parse(session);
    return data && data.loggedIn === true;
  } catch {
    return false;
  }
}

export function loginAdmin(username: string, password: string): { success: boolean; message?: string } {
  if (
    (username.trim() === ADMIN_CREDENTIALS.username || 
     username.trim() === 'admin@litef.com' || 
     username.trim() === 'admin@novastore.com') &&
    password === ADMIN_CREDENTIALS.password
  ) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          loggedIn: true,
          timestamp: new Date().toISOString(),
          user: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role,
        })
      );
    }
    return { success: true };
  }
  return { success: false, message: 'Kullanıcı adı veya şifre hatalı!' };
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
