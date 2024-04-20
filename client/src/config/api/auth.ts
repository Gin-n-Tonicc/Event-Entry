import { baseApiUrl } from './base';

const base = `${baseApiUrl}/auth`;

export const authPaths = Object.seal({
  register: `${base}/register`,
  login: `${base}/authenticate`,
  logout: `${base}/logout`,
  refreshTokenPath: '/refresh-token',
  refreshToken() {
    return `${base}${this.refreshTokenPath}`;
  },
  me: `${base}/me`,
  forgotPassword: (email: string) =>
    `${base}/forgot-password?email=${encodeURIComponent(email)}`,
  resetPassword: (token: string, newPassword: string) =>
    `${base}/password-reset?token=${encodeURIComponent(
      token
    )}&newPassword=${encodeURIComponent(newPassword)}`,
});
