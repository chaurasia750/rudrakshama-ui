import { RemoteConfig } from '@shared/types';

export const remoteConfig: RemoteConfig[] = [
  {
    key: 'admin',
    entry: 'https://rudrakshama.com/admin/remoteEntry.mjs',
    exposedModule: './Module',
    route: '/admin',
    displayName: 'Admin Portal',
    preload: true,
    loadTimeout: 10000,
    metadata: {
      version: '1.0.0',
      environment: 'production',
      cache: true
    }
  },
  {
    key: 'member',
    entry: 'https://rudrakshama.com/member/remoteEntry.mjs',
    exposedModule: './Module',
    route: '/member',
    displayName: 'Member Portal',
    preload: true,
    loadTimeout: 10000,
    metadata: {
      version: '1.0.0',
      environment: 'production',
      cache: true
    }
  },
  {
    key: 'management',
    entry: 'https://rudrakshama.com/management/remoteEntry.mjs',
    exposedModule: './Module',
    route: '/management',
    displayName: 'Management Dashboard',
    preload: false,
    loadTimeout: 10000,
    metadata: {
      version: '1.0.0',
      environment: 'production',
      cache: true
    }
  }
];
