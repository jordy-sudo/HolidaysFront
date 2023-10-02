export function getEnvVariables() {
    return {
      ssoUrl: process.env.REACT_APP_SSO_URL,
      apiUrl: process.env.REACT_APP_HOLIDAYS_URL,
      isDebugMode: process.env.REACT_APP_DEBUG === 'true',
    };
  }