
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.35dc1086f7b14d67ba10701cdf6c7db8',
  appName: 'arabesque-flow-planner',
  webDir: 'dist',
  server: {
    url: 'https://35dc1086-f7b1-4d67-ba10-701cdf6c7db8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    useLegacyBridge: false
  }
};

export default config;
