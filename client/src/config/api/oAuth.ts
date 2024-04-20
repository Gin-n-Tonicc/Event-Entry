import { baseApiUrl, baseOAuthUrl } from './base';

const base = `${baseApiUrl}/auth`;

export const OAuthPaths = Object.seal({
  completeOAuth: `${base}/complete-oauth`,
  google: `${baseOAuthUrl}/google`,
});
