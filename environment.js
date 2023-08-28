import { Platform } from 'react-native';

const ENV = {
  development: {
    content_type: 'application/json',
    end_point: 'https://230a-103-174-81-102.ngrok-free.app',
  },
  production: {
    content_type: 'application/json',
    end_point: 'https://230a-103-174-81-102.ngrok-free.app',
  },
  roddefaultuction: {
  }
};

const getEnvVars = (env = Platform) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.development;
  } else {
    return ENV.production;
  }
};

export default getEnvVars;