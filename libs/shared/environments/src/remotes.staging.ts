import { RemoteConfig } from '@shared/types';

export const remoteConfig: RemoteConfig[] = [
  {
    key: 'admin',
    entry: 'https://app.rudrakshama.org/remoteEntry.mjs',
    exposedModule: './Module',
    route: '/admin',
    displayName: 'Admin Portal',
    preload: false,
    loadTimeout: 8000,
    metadata: {
      version: '1.0.0',
      environment: 'staging'
    }
  },
  {
    key: 'member',
    entry: 'https://member.rudrakshama.org/remoteEntry.mjs',
    exposedModule: './Module',
    route: '/member',
    displayName: 'Member Portal',
    preload: false,
    loadTimeout: 8000,
    metadata: {
      version: '1.0.0',
      environment: 'staging'
    }
  },
  {
    key: 'management',
    entry: 'https://management.rudrakshama.org/remoteEntry.mjs',
    exposedModule: './Module',
    route: '/management',
    displayName: 'Management Dashboard',
    preload: false,
    loadTimeout: 8000,
    metadata: {
      version: '1.0.0',
      environment: 'staging'
    }
  }
];